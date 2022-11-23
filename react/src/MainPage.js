import { useState, useEffect } from "react";
import * as d3 from 'd3'
import HistoricalChart from "./components/HistoricalChart"
import { Box } from "@mui/material";
import SumExTable from "./components/SumEx";
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

  const getHistData = async () => {
      try {
          const response1 = await axios.get(`http://localhost:5001/api/historical/${values.base}/${values.target}`);
          const response2 = await axios.get(`http://localhost:5001/api/predict/${values.base}/${values.target}`);
          console.log('histdata', response1.data)
          console.log('preddata', response2.data)
          setValues({
              base: localStorage.getItem("base"),
              target: localStorage.getItem("target"),
              histData: response1.data,
              predData: response2.data
          });
      } catch {

      }
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
      {/* <Box width={800} height={300}>
        <SumExTable/>
      </Box> */}
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