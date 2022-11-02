import { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'

const HistoricalChart = ({ base, target, allData }) => {
  const ref = useRef(null)

  const [range, setRange] = useState({
    // TODO: REMOVE DEFAULT VALUES
    start: '2022-10-01',
    end: '2022-10-30'
  })
  const [data, setData] = useState('')

  useEffect(() => {
    // TODO: TRIM DATASET TO JUST RANGE
    setData(() => {
      return allData.map((d) => {
        var [YYYY, MM, DD] = d[0].split('-')

        return {
          date: new Date(YYYY, MM - 1, DD),
          rate: +d[1]
        }
      })
    })
  }, [range, allData])

  useEffect(() => {
    // MARGIN CONVENTION
    const totalWidth = 600,
      totalHeight = 400,
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

    var dots = chart.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.rate))
        .attr('r', 3);

    

    // DISPLAY AXES
    var xAxis = d3.axisBottom(x)
    plot.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)

    var yAxis = d3.axisLeft(y)
    plot.append('g')
      .call(yAxis)

  }, [base, target, data])

  return (
    <svg id='historical-chart' ref={ ref }></svg>
  )
}

export default HistoricalChart