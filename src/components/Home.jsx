import { useState } from 'react'
import { useSelector } from "react-redux";
import { useStyles } from './HomeCss';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Box } from "@mui/material";
import Switch, { switchClasses } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect } from 'react';
import { PriceChangeOutlined } from '@mui/icons-material';


export default function Home() {
  var classes = useStyles();
  const token = useSelector(state => state.Token.Token);
  const [open, setOpen] = useState(false);
  const [price,setPrice]=useState(0);
  // const [checked, setChecked] = useState(true);
  const [quantity,setQuan]=useState(0);
  const [newPrice,setNewPrice]=useState(0);
  const [play,setPlay]=useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      let k=simulateStockPrice();
      if(k!==price){
        setPrice(k);
      }
      else{
        setPrice(k=k+0.2);
      }
    }, 1000);
  }, [price])

  const order = async () => {
    const response = await fetch("https://backend-chi-eosin.vercel.app/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user": token,
        "type": "Sell",
        "quantity": quantity,
        "price": newPrice
      }),
    });
    console.log(response)
  }

  const handleClose = () => {
    setOpen(false);
    // setChecked(true)
  };

  const handlesubmit = async() => {
    setOpen(false);
    // setChecked(true);
    if(quantity===0){
      alert("Please set Quantity");
    }else{
      if(newPrice==0)setNewPrice(price);
      await order();
    }

  };

  function simulateStockPrice() {
    let price = 7;
    const minChange = -0.1;
    const maxChange = 0.1;
    const priceChange = (Math.random() * (maxChange - minChange) + minChange).toFixed(2);
    price += parseFloat(priceChange);
    if (price < 1) {
      price = 1;
    }
  
    return price;
  }


  function showForm() {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"
        >
          <Box style={{ fontSize: "18px" }}>Current Electricity rate: {price}</Box>
        </DialogTitle>
        <DialogContent>
          <Grid container xs={12}>
            {/* <Grid item xs={12}>
              <Switch
                checked={checked}
                onChange={handleCheck}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: 'white' },
                  "& .MuiSwitch-switchBase": { color: 'white' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'green' },
                  '& .MuiSwitch-switchBase + .MuiSwitch-track': { backgroundColor: 'red' }
                }}
              />
              {value}
            </Grid> */}
            <Grid item xs={6}>
              <TextField value={quantity} onChange={(e)=>{setQuan(e.target.value);}} sx={{ color: "white" }} id="filled-password-input" label="Quantity" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField value={newPrice} onChange={(e)=>{setNewPrice(e.target.value);}} id="filled-password-input" label="Price (0 = Market Value)" variant="standard" />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlesubmit}>Submit</Button>
          <Button onClick={handleClose} autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.heading} >Hi, User</Box>
      <Box className={classes.box}>
        <Box sx={{ display: 'flex', justifyContent: "space-around", width: "100%" }}>
          <Box sx={{ backgroundColor: "#2B2B2B", paddingX: "40px", paddingY: "10px", borderRadius: "20px" }}>
            Current Price
          </Box>
          <Box sx={{ backgroundColor: "#2B2B2B", paddingX: "40px", paddingY: "10px", borderRadius: "20px" }}>
            {price}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", marginTop: "0px", backgroundColor: "white", height: "1px", marginBottom: "10px" }}></Box>
      <Box >
        <Box className={classes.box}>
          <Box className={classes.box1}>
            <Button variant="contained" sx={{ paddingX: "40px", fontSize: "20px", fontWeight: "bolder" }} color="success">BUY</Button>
            {showForm()}
            <Button variant="contained" sx={{ paddingX: "40px", fontSize: "20px", fontWeight: "bolder" }} color="error" onClick={handleClickOpen}>SELL</Button>
          </Box>
        </Box>
        {/* overall */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around",marginTop:"10px"}}>
        <h4 style={{color:"white"}}>Credits</h4>
          <Box sx={{ display: "flex", alignItems: "center",gap:"10px", justifyContent: "space-around" }}>
            <h4 style={{ color: "green" }}> +200 </h4>
            <h4 style={{color:"white"}}>Units</h4>
          </Box>
        </Box>
      </Box>
      <Box className={classes.box} style={{ justifyContent: "space-evenly" }}>
        <Box style={{ fontSize: "25px", fontWeight: "600" }}>Current Status</Box>
        {play && <Button variant="outlined" onClick={(e)=>{play==false?setPlay(true):setPlay(false)}} startIcon={<PlayArrowIcon/>} >Play</Button>}
        {!play && <Button variant="outlined" onClick={(e)=>{play==false?setPlay(true):setPlay(false)}} startIcon={<PauseIcon/>} >Pause</Button>}
      </Box>
      <Box className={classes.box}>
        {/* graph */}
        <img width={"100%"} src="/assets/stock.jpg" alt="graph" />
      </Box>

      <Box className={classes.box} style={{ justifyContent: "space-between" }}>
        <ul>
          <li>Advances - 14</li>
          <li>Declines - 36</li>
          <li>Unchanged - 1</li>
        </ul>
        <Box>Current Electricity rate</Box>
        <Box>Last Updated : 3:01 PM</Box>
      </Box>
    </Box>
  )
}