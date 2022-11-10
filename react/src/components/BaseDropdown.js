import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CurrencyList } from '../currencyList';


const currenciesArray = CurrencyList;
export default function BaseDropdown() {
  const [curr, setCurr] = React.useState('');

  const handleChange = (event) => {
    setCurr(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
       <div>
       <TextField
        fullWidth
        value={curr}
        onChange={handleChange}
        variant="outlined"
        label="Base"
        InputLabelProps={{style: { color: '#f5756b' },}}
        sx={{"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#f5756b" },},}}
        select
        required
        helperText="Please choose your currency"
        FormHelperTextProps={{style: { color: 'white' },}}
      >
        {currenciesArray.map(x => <MenuItem value={x}>{x.symbol+ " " + x.ISO}</MenuItem>)}
      </TextField>
      </div>
    </Box>
  );
}