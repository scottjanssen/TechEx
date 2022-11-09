import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const Dropdown = {
    baseDropdown: function baseDropdown() {
        const handleChange = (event) => {
            var value = event.target.value;
        };
    return (
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Base Currency</InputLabel>
            <Select
            variant="outlined"
            onChange={handleChange}
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            </Select>
        </FormControl>
    );
    }

    , baseValue: function baseValue() {
        const handleChange = (event) => {
            var value = event.target.value;
        };
    return (
    <Box
      component="form"
      sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          label="Value"
          defaultValue="1"
          onChange={handleChange} 
          InputLabelProps={{style: { color: '#f5756b' },}}
          inputProps={{ style: { color: "white" } }}
          sx={{"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#f5756b" },},}}
          variant="outlined"
        />
       </div>
    </Box>
    );
    }

    , targetDropdown: function targetDropdown() {
        const handleChange = (event) => {
            var value = event.target.value;
        };
    return (
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-required-label">Target Currency</InputLabel>
            <Select
            onChange={handleChange}
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            </Select>
        </FormControl>
    );
    }

    , targetValue: function targetValue() {
        const handleChange = (event) => {
            var value = event.target.value;
        };
    return (
        <Box
        component="form"
        sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
        noValidate
        autoComplete="off"
      >
        <div>
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
        />
        </div>
      </Box>
    );
    }
}
export default Dropdown;