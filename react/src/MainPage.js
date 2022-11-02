import { useState, useEffect } from "react";
import * as d3 from 'd3'

import HistoricalChart from "./components/HistoricalChart"

import sample_data from './sample_data/USDtoEUR.csv'

const MainPage = () => {
  const [values, setValues] = useState({
    base: 'USD',
    target: 'EUR',
    histData: [],
    predData: [
      { date: '2022-10-31', rate: '1.013075' },
      { date: '2022-11-01', rate: '1.005075' },
      { date: '2022-11-02', rate: '0.992605' },
      { date: '2022-11-03', rate: '1.00245' },
      { date: '2022-11-03', rate: '1.006385' },
      { date: '2022-11-05', rate: '1.00355' },
      { date: '2022-11-06', rate: '1.00355' }
    ]
  })

  const [dimensions, setDimensions] = useState(getDimensions())

  // TODO: ONLY TEMPORARY, REMOVE LATER
  useEffect(() => {
    d3.dsv(',', sample_data)
      .then((d) => {
        setValues( (prevValues) => ({
          ...prevValues,
          histData: d,
        }))
      })
  }, [])

  useEffect(() => {
    function handleWindowResize() {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleWindowResize);
  
    return () => {
      window.addEventListener('resize', handleWindowResize);
    }
  }, [])
  

  return (
    <>
      <div className='container'>
        <p style={ { textAlign: 'right' } }>
          Welcome to <strong>TechEX</strong>, your go-to currency exchange website.
        </p>
      </div>
      <div className='container'>
        <HistoricalChart base={ values.base } target={ values.target } histData={ values.histData } predData={ values.predData } dimensions={ dimensions } />
      </div>
    </>
  )
}

export default MainPage

const getDimensions = () => {
  const { innerWidth } = window;

  let width;

  if (innerWidth <= 768) {
    width = innerWidth * (1 - 0.02 * 2)
  } else if (innerWidth <= 1024) {
    width = innerWidth * (1 - 0.08 * 2)
  } else {
    width = innerWidth * (1 - 0.12 * 2)
  }


  return {
    width: width,
    height: width / 2
  }
}