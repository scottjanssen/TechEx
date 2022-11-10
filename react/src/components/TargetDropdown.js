import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CurrencyList } from '../currencyList';
import Box from '@mui/material/Box'

const currenciesArray = CurrencyList;

export default function TargetDropdown() {
  const [curr, setCurr] = React.useState('');

  const handleChange = (event) => {
    setCurr(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
      fullWidth
      value={curr}
      onChange={handleChange}
      variant="outlined"
      label="Target"
      InputLabelProps={{style: { color: '#f5756b' },}}
        sx={{"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#f5756b" },},}}
      select
      required
      FormHelperTextProps={{style: { color: 'white' },}}
      helperText="Please choose your currency"
    >
      {currenciesArray.map(x => <MenuItem value={x}>{x.symbol+ " " + x.ISO}</MenuItem>)}
     </TextField>
    </Box>
  );
}