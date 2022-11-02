import { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'
import d3tip from 'd3-tip'

import { RangeOption, PredictButton } from './Buttons'

const HistoricalChart = ({ base, target, histData, predData, dimensions }) => {
  const ref = useRef(null)

  const [range, setRange] = useState('3M')
  const [data, setData] = useState('')

  const [predict, setPredict] = useState(false)

  useEffect(() => {
    let start = new Date()

    if (range[1] === 'M') {
      start = new Date(start.getFullYear(), start.getMonth() - parseInt(range[0]), start.getDate())
    } else if (range[1] === 'Y') {
      start = new Date(start.getFullYear() - parseInt(range[0]), start.getMonth(), start.getDate())
    } else {
      start = new Date(1970, 1, 1)
    }

    setData(() => {
      return histData.concat(predict ? predData : [])
        .map((d) => {
          var [YYYY, MM, DD] = d.date.split('-')

          return {
            date: new Date(YYYY, MM - 1, DD),
            rate: +d.rate
          }})
        .filter(d => d.date >= start)
    })
  }, [range, histData, predict, predData])

  useEffect(() => {
    if (!Array.isArray(data)) {
      return
    }

    // var today = new Date()
    // today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    var today = new Date(2022, 9, 30)

    // MARGIN CONVENTION
    const totalWidth = dimensions.width,
      totalHeight = dimensions.height,
      margin = {
        left: 50,
        top: 20,
        right: 20,
        bottom: 50
      },
      width = totalWidth - margin.left - margin.right,
      height = totalHeight - margin.top - margin.bottom

    // SELECT SVG USING REF
    var svg = d3.select(ref.current)
    svg.attr('width', totalWidth)
      .attr('height', totalHeight)

    // SET DOMAINS AND RANGES
    var [xMin, xMax] = d3.extent(data, d => d.date)
    var x = d3.scaleTime()
      .domain([xMin, xMax])
      .range([0, width])

    var [yMin, yMax] = d3.extent(data, d => d.rate),
      padding = Math.abs(yMin - yMax) / 10
    var y = d3.scaleLinear()
      .domain([yMin - padding, yMax + padding])
      .range([height, 0])

    // REMOVE ALL CURRENT ELEMENTS IN SVG
    svg.selectAll('*').remove()

    // CREATE GROUP FOR PLOT
    var plot = svg.append('g')
      .attr('transform', `translate(${ margin.left }, ${ margin.top })`)

    // MORE INFORMATION TOOLTIP
    var tip = d3tip()
      .attr("class", "tip")
      .offset([-20, 0])
      .html(function(e, d) {
        let content = d.date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) + "<br />";
        content += "<strong>" + d.rate + " " + target + "</strong>";
        return content
    })

    plot.call(tip)

    var focusLines = plot.append('g')

    // DISPLAY AXES
    var iter = Math.ceil(data.length / width * 70)
    var xAxis = d3.axisBottom(x)
      .tickValues(data.filter((d, i) => i % iter === 0).map(d => d.date))
      .tickSizeOuter(0);
    if (range[1] === 'M') {
      xAxis.tickFormat(d3.timeFormat('%d %b'))
    } else if (range[1] === 'Y') {
      xAxis.tickFormat(d3.timeFormat('%b \'%y'))
    } else {
      xAxis.tickFormat(d3.timeFormat('%b \'%y'))
    }
    plot.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)

    var yAxis = d3.axisLeft(y)
      .ticks(Math.min(Math.ceil(height / 30), 7))
      .tickSizeOuter(0);
    plot.append('g')
      .call(yAxis)

    // DISPLAY LINE CHART
    var chart = plot.append('g')

    var path = chart.append('path')
      .datum(data.filter(d => d.date <= today))
      .attr('d', d3.line()
        .x(d => x(d.date))
        .y(d => y(d.rate)))

    var pathPred = chart.append('path')
      .datum(data.filter(d => d.date >= today))
      .attr('d', d3.line()
        .x(d => x(d.date))
        .y(d => y(d.rate)))
      .style('stroke-dasharray', '2, 2')

    var iter = (width / data.length > 3.5) ? 1 : Math.ceil(data.length / width * 4)
    var radius = 3
    if (data.length / width * 10 <= 1) {
      radius = 5
    } else if (data.length / width * 10 <= 2) {
      radius = 4
    }
    var dots = chart.selectAll('circle')
        .data(data.filter((d, i) => i % iter === 0))
        .enter()
        .append('circle')
          .attr('cx', d => x(d.date))
          .attr('cy', d => y(d.rate))
          .attr('r', radius)
          .style('filter', d => d.date > today ? 'brightness(150%)' : '')
            .on('mouseover', function(e, d) {
              // INCREASE CIRCLE SIZE
              d3.select(this)
                .transition()
                .duration(200)
                .attr('r', radius * 2)

              // ADD LINES TO FOCUS ON POINT
              focusLines.append('line')
                .attr('class', 'focus-line')
                .attr('x1', x(d.date))
                .attr('y1', y(d.rate))
                .attr('x2', x(d.date))
                .attr('y2', y(d.rate))
                .transition()
                .duration(300)
                .attr('y2', height)
              
              focusLines.append('line')
                .attr('class', 'focus-line')
                .attr('x1', x(d.date))
                .attr('y1', y(d.rate))
                .attr('x2', x(d.date))
                .attr('y2', y(d.rate))
                .transition()
                .duration(300)
                .attr('x2', 0)

              // SHOW TOOLTIP
              tip.attr('class', 'tip animate')
                .show(e, d, this)
            })
            .on('mouseout', function(e, d) {
              d3.select(this)
                .transition()
                .duration(200)
                .attr('r', radius )

              focusLines.selectAll('*')
                .remove()

              tip.attr('class', 'tip')
                .hide(e, d)
            })

  }, [base, target, data, dimensions, range, predict, predData])

  const handleRangeOptionClick = (e) => {
    setRange(e.target.textContent)
  }

  return (
    <>
      <svg id='historical-chart' ref={ ref }></svg>
      <div className='row stretch-row' style={ { marginLeft: '50px', marginRight: '20px', flexWrap: 'wrap' } }>
        <div className='row' style={ { flexWrap: 'wrap' } }>
          <RangeOption range={ range } option='MX' handleOptionClick={ handleRangeOptionClick } />
          <RangeOption range={ range } option='5Y' handleOptionClick={ handleRangeOptionClick } />
          <RangeOption range={ range } option='1Y' handleOptionClick={ handleRangeOptionClick } />
          <RangeOption range={ range } option='6M' handleOptionClick={ handleRangeOptionClick } />
          <RangeOption range={ range } option='3M' handleOptionClick={ handleRangeOptionClick } />
          <RangeOption range={ range } option='2M' handleOptionClick={ handleRangeOptionClick } />
          <RangeOption range={ range } option='1M' handleOptionClick={ handleRangeOptionClick } />
        </div>
        <div>
          <PredictButton current={ predict } handleOptionClick={ () => { setPredict(prev => !prev) } } />
        </div>
      </div>
    </>
  )
}

export default HistoricalChart
