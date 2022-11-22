import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CurrencyList } from '../currencyList';
import axios from 'axios';
import { Button, Stack } from '@mui/material';


export default function Dropdown() {

    const currenciesArray = CurrencyList;

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

  const [result, setResult] = React.useState('');
  
 async function fetchData(b, t, i) {
     if(b == "" || t == "" || t== null || b == null) {
         setResult("Error: Cannot have null currencies");
     } else if (i < 0){
         setResult("Error: Cannot have a negative value");
      } else if(i == 0 || null || undefined) {
        setResult("Error: Cannot have a zero value");
      } else {
          try {
              let base1 = JSON.stringify(base)
              let newBase = base1.substring(base1.indexOf("ISO") + 6, base1.indexOf("ISO") + 9)
              let target1 = JSON.stringify(target)
              let newTarget = target1.substring(target1.indexOf("ISO") + 6, target1.indexOf("ISO") + 9)
              localStorage.setItem("base", newBase);
              localStorage.setItem("target", newTarget);
              localStorage.setItem("input", input);
            await axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${newBase}&from=${newTarget}&amount=${input}&apikey=8oacGvTwsBjRmTHplSvNlVZKfjstcq7z`)
                .then(response => response.data).then(data => {
                  let result = JSON.stringify(data);
                  let newResult = result.substring(result.indexOf("\"result\":") + 9, result.length - 1);
                  setResult(newResult);
                })
          } catch (error) {
                console.log(error);
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
            value={base}
            onChange={handleChange}
            variant="outlined"
            label="Base"
            name={'base'}
            InputLabelProps={{style: { color: '#f5756b' },}}
            sx={{"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#f5756b" },},}}
            select
            required
            helperText="Please choose a currency"
            FormHelperTextProps={{style: { color: 'white' },}}
          >
            {currenciesArray.map(x => <MenuItem value={x} data-cy={`select-option-${x.ISO}`}>{x.symbol+ " " + x.ISO}</MenuItem>)}
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
            className={'value-textbox'}
            label="Value"
            name={"value"}
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
          name={'target'}
          InputLabelProps={{style: { color: '#f5756b' },}}
          sx={{"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#f5756b" },},}}
          select
          required
          FormHelperTextProps={{style: { color: 'white' },}}
          helperText="Please choose a currency"
          >
            {currenciesArray.map(x => <MenuItem value={x} data-cy={`select-option-${x.ISO}`}>{x.symbol+ " " + x.ISO}</MenuItem>)}
          </TextField>
        </Box>
      </div>
    <div className='result'>
      <Box
        component="form"
        sx={{'& .MuiTextField-root': { m: 1, width: '25ch'}, '& .MuiTextField-root.Mui-disabled': {color: 'white'}}}
        noValidate
        autoComplete="off"
      >
        <TextField
            variant="outlined"
            value={result}
            label="Result"
            disabled
            id={"result-textbox"}
            name={'result-textbox'}
            InputLabelProps={{style: { color: '#f5756b' },}}
            inputProps={{ style: { color: "white", textAlign:'center'} }}
            sx={{"& .MuiInputBase-root.Mui-disabled": {
                "& > fieldset": {
                    borderColor: "#f5756b",
                }},
                color: "white"
            }}
            helperText="Your exchange result will appear here"
            FormHelperTextProps={{style: { color: 'white' },}}
        >{result}</TextField>
      </Box>
    </div>
    </Stack></center>
    <Stack>
      <div className='submit'>
        <Button 
        variant="outlined"
        color='warning'
        onClick={() => fetchData(base, target, input)}
        name={'submit-button'}
        >
          Submit
        </Button>
      </div>
      </Stack>
  </div>
  );
}