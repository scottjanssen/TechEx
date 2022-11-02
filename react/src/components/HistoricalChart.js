import { useRef, useState, useEffect } from 'react'
import * as d3 from 'd3'

const HistoricalChart = ({ base, target, allData }) => {
  const ref = useRef(null)

  const [range, setRange] = useState({
    // TODO: REMOVE DEFAULT VALUES
    start: '2022-10-01',
    end: '2022-10-30'
  })
  const [data, setData] = useState(allData)

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
    const totalHeight = 400,
      totalWidth = 600,
      margin = {
        left: 30,
        top: 20,
        bottom: 50,
        right: 20
      },
      height = totalHeight - margin.top - margin.bottom,
      width = totalWidth - margin.left - margin.right

    var svg = d3.select(ref.current)
    svg.attr('width', width)
      .attr('height', height)

    var [xMin, xMax] = d3.extent(data, d => d.date)
    var x = d3.scaleTime()
      .domain([xMin, xMax])
      .range([0, width])

    var [yMin, yMax] = d3.extent(data, d => d.rate),
      padding = Math.abs(yMin - yMax) / 10
    var y = d3.scaleLinear()
      .domain([yMin - padding, yMax + padding])
      .range([height, 0])

    svg.selectAll('*').remove()

    var chart = svg.append('g')
      .attr('transform', `translate(${ margin.left }, ${ margin.top })`)

    chart.append('path')
      .datum(data)
      .attr('d', d3.line()
        .x(d => x(d.date))
        .y(d => y(d.rate)))
  }, [base, target, data])

  return (
    <svg id='historical-chart' ref={ ref }></svg>
  )
}

export default HistoricalChart