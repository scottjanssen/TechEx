import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CurrencyList } from '../currencyList';
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import { color } from 'd3';
import { textAlign } from '@mui/system';

const currenciesArray = CurrencyList;
export default function Dropdown() {

  const [base, setBase] = React.useState('');
  const handleChange = (event) => {
    setBase(event.target.value);
  };

  const [target, setTarget] = React.useState('');
  const handleChange2 = (event) => {
    setTarget(event.target.value);
  };

  const [input, setInput] = React.useState('');
  const handleChange3 = (event) => {
    setInput(event.target.value);
  };

  let base1 = JSON.stringify(base)
  let newBase = base1.substring(base1.indexOf("ISO") + 6, base1.indexOf("ISO") + 9)
  let target1 = JSON.stringify(target)
  let newTarget = target1.substring(target1.indexOf("ISO") + 6, target1.indexOf("ISO") + 9)
  localStorage.setItem("base", newBase);
  localStorage.setItem("target", newTarget);
  localStorage.setItem("input", input);
  
 function fetchData() {
    if (base !== "" && target !== "" && input !== 0) {
      try {
        axios.get(`https://localhost:5001/convert?to=${newBase}&from=${newTarget}&amount=${input}&apikey=8oacGvTwsBjRmTHplSvNlVZKfjstcq7z`)
        .then(response => response.data).then(data => {
          let result = JSON.stringify(data);
          let newResult = result.substring(result.indexOf("\"result\":") + 9, result.length - 1);
          document.getElementById("result").innerHTML = newResult;
        })
      } catch (error) {
        
      }
    }
  }

  return (
    <div>
    <center><Stack direction="row" spacing={3}>
      <div className='base'>
        <Box sx={{ minWidth: 120 }}>
          <TextField
            SelectProps={{style: {color: 'white'}, }}
            defaultValue={currenciesArray[0].ISO}
            value={base}
            onChange={handleChange}
            variant="outlined"
            label="Base"
            InputLabelProps={{style: { color: '#f5756b' },}}
            sx={{"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#f5756b" },},}}
            select
            required
            helperText="Please choose a currency"
            FormHelperTextProps={{style: { color: 'white' },}}
          >
            {currenciesArray.map(x => <MenuItem value={x}>{x.symbol+ " " + x.ISO}</MenuItem>)}
          </TextField>
        </Box>
      </div>

      <div className='value'>
        <Box
        component="form"
        sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
        noValidate
        autoComplete="off"
        >
          <TextField
            required
            label="Value"
            value={input}
            onChange= {handleChange3}
            InputLabelProps={{style: { color: '#f5756b' },}}
            inputProps={{ style: { color: "white", textAlign:'center'} }}
            sx={{"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#f5756b" },},}}
            variant="outlined"
            helperText="Please input your amount to exchange"
            FormHelperTextProps={{style: { color: 'white' },}}
            />
        </Box>
      </div>
      </Stack></center>

      <center><Stack direction="row" spacing={1.5}>
      <div className='target'>
        <Box sx={{ minWidth: 120 }}>
          <TextField
          SelectProps={{style: {color: 'white'}, }}
          value={target}
          onChange={handleChange2}
          variant="outlined"
          label="Target"
          InputLabelProps={{style: { color: '#f5756b' },}}
            sx={{"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#f5756b" },},}}
          select
          required
          FormHelperTextProps={{style: { color: 'white' },}}
          helperText="Please choose a currency"
          >
            {currenciesArray.map(x => <MenuItem value={x}>{x.symbol+ " " + x.ISO}</MenuItem>)}
          </TextField>
        </Box>
      </div>
      <div>
        <small id='result' className='res'></small>
      </div>
    <div className='result'>
      <Box
        component="form"
        sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
        noValidate
        autoComplete="off"
      >
        <TextField
            variant="outlined"
            defaultValue=" "
            label="Result"
            disabled
            InputLabelProps={{style: { color: '#f5756b' },}}
            sx={{"& .MuiInputBase-root.Mui-disabled": {
                "& > fieldset": {
                    borderColor: "#f5756b",
                    }
                }
            }}
            helperText="Your exchange result will appear here"
            FormHelperTextProps={{style: { color: 'white' },}}
        />
      </Box>
    </div>
    </Stack></center>
    <Stack>
      <div className='submit'>
        <Button 
        variant="outlined"
        color='warning'
        onClick={fetchData}
        >
          Submit
        </Button>
      </div>
      </Stack>
  </div>
  );
}