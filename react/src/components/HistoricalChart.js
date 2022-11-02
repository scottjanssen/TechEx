import { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'

import RangeOption from './RangeOption'

const HistoricalChart = ({ base, target, allData, dimensions }) => {
  const ref = useRef(null)

  const [range, setRange] = useState('3M')
  const [data, setData] = useState('')

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
      return allData.map((d) => {
        var [YYYY, MM, DD] = d.date.split('-')

        return {
          date: new Date(YYYY, MM - 1, DD),
          rate: +d.rate
        }
      }).filter(d => d.date >= start)
    })
  }, [range, allData])

  useEffect(() => {
    if (!Array.isArray(data)) {
      return
    }

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

    // DISPLAY LINE CHART
    var plot = svg.append('g')
      .attr('transform', `translate(${ margin.left }, ${ margin.top })`)

    var chart = plot.append('g')

    var path = chart.append('path')
      .datum(data)
      .attr('d', d3.line()
        .x(d => x(d.date))
        .y(d => y(d.rate)))

    if (width / data.length > 3.5) {
      var dots = chart.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
          .attr('cx', d => x(d.date))
          .attr('cy', d => y(d.rate))
          .attr('r', 3);
    } else {
      let iter = data.length / width * 4;
      console.log(iter)
      iter = Math.ceil(iter)

      var dots = chart.selectAll('circle')
        .data(data.filter((d, i) => i % iter === 0))
        .enter()
        .append('circle')
          .attr('cx', d => x(d.date))
          .attr('cy', d => y(d.rate))
          .attr('r', 3);
    }

    // DISPLAY AXES
    var xAxis = d3.axisBottom(x)
      .tickValues(data.filter((d, i) => {
        return i % Math.ceil(data.length / width * 70) === 0
        })
        .map(d => d.date))
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
    plot.append('g')
      .call(yAxis)

  }, [base, target, data, dimensions, range])

  const handleRangeOptionClick = (e) => {
    setRange(e.target.textContent)
  }

  return (
    <>
      <svg id='historical-chart' ref={ ref }></svg>
      <div className='row' style={ { marginLeft: '50px', flexWrap: 'wrap' } }>
        <RangeOption range={ range } option='MX' handleOptionClick={ handleRangeOptionClick } />
        <RangeOption range={ range } option='5Y' handleOptionClick={ handleRangeOptionClick } />
        <RangeOption range={ range } option='1Y' handleOptionClick={ handleRangeOptionClick } />
        <RangeOption range={ range } option='6M' handleOptionClick={ handleRangeOptionClick } />
        <RangeOption range={ range } option='3M' handleOptionClick={ handleRangeOptionClick } />
        <RangeOption range={ range } option='2M' handleOptionClick={ handleRangeOptionClick } />
        <RangeOption range={ range } option='1M' handleOptionClick={ handleRangeOptionClick } />
      </div>
    </>
  )
}

export default HistoricalChart
