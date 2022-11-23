import { useState, useEffect } from "react";
import * as d3 from 'd3'
import HistoricalChart from "./components/HistoricalChart"
import { Box } from "@mui/material";
import Dropdown from "./components/Dropdown";
import sample_data from './sample_data/USDtoEUR.csv'
import { padding, textAlign } from "@mui/system";
import axios from "axios";

const MainPage = () => {
  const [values, setValues] = useState({
    base: localStorage.getItem("base"),
    target: localStorage.getItem("target"),
    histData: [],
    predData: []
  })

  const [dimensions, setDimensions] = useState(getDimensions());

  const getHistData = (base, target) => {axios.get(`http://localhost:5001/api/historical/${values.base}/${values.target}`)
      .then((res1) => {
        axios.get(`http://localhost:5001/api/predict/${values.base}/${values.target}`)
          .then((res2) => {
            setValues({
              base: base,
              target: target,
              histData: res1.data,
              predData: res2.data
          })
          })
      })
  }

  useEffect(() => {
    function handleWindowResize() {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleWindowResize);
  
    return () => {
      window.addEventListener('resize', handleWindowResize);
    }
  }, []);

  return (
    <>
      <div className='dropdown'>
        <Dropdown getHistData={getHistData}/>
      </div>
      <div className='container'>
        <p style={ { textAlign: 'right' } }>
            {localStorage.getItem("base")} to {localStorage.getItem("target")}
        </p>
      </div>
      <div className='container'>
        <HistoricalChart base={ values.base } target={ values.target } histData={ values.histData } predData={ values.predData } dimensions={ dimensions } />
      </div>
      <br></br>
      <br></br>
      <div className="sumex">
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