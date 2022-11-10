import { Box, TextField } from "@mui/material";
function baseValue() {
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
        onChange= {event => event.target.value}
        InputLabelProps={{style: { color: '#f5756b' },}}
        inputProps={{ style: { color: "white" } }}
        sx={{"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#f5756b" },},}}
        variant="outlined"
        helperText="Please input your amount to exchange"
        FormHelperTextProps={{style: { color: 'white' },}}
        />
    </div>
    </Box>
    );
}


function targetValue() {
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
            helperText="Your exchange result will appear here"
            FormHelperTextProps={{style: { color: 'white' },}}
        />
        </div>
    </Box>
    );
}
const funcs = {baseValue, targetValue}
export default funcs;