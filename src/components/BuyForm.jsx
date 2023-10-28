import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import { TextField, Grid, IconButton, FormControlLabel, InputLabel, MenuItem, Select,} from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";
import {withStyles} from '@material-ui/core';
import { blue, green, red } from '@material-ui/core/colors';
// import Switch, { switchClasses } from '@mui/joy/Switch';
import Switch, { switchClasses } from '@mui/material/Switch';

export default function BuyForm() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState('Buy');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck=(event)=>{
    setChecked(event.target.checked)
    setValue(checked==true?"Sell":"Buy")
  }

  function showForm() {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div style={{fontSize:"18px"}}>Current Electricity rate: 350.2</div>
        </DialogTitle>
        <DialogContent>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <Switch                
                checked={checked}
                onChange={handleCheck}
                sx={{"& .MuiSwitch-switchBase.Mui-checked":{color: 'white'}, 
                "& .MuiSwitch-switchBase":{color: 'white'},
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':{backgroundColor:'green'},
                '& .MuiSwitch-switchBase + .MuiSwitch-track':{backgroundColor:'red'}}}
                />
                {value}
            </Grid>
            <Grid item xs={6}>
              <TextField id="filled-password-input" label="Quantity" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField id="filled-password-input" label="Price (0 = Market Value)" variant="standard" />
            </Grid>
            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
          <Button onClick={handleClose} autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Buy</Button>
      {showForm()}
    </div>
  )
}
