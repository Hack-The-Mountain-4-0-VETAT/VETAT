import React, { useState } from 'react'
import { useStyles } from './HomeCss';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Box, Slide } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/Firebaseconfig';
import {getDoc,doc,collection,updateDoc, getDocs, deleteDoc, addDoc, onSnapshot} from "firebase/firestore";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Home() {
  var classes = useStyles();
  const navigate = useNavigate()
  const [open1, setOpen1] = useState(false);
  const [price, setPrice] = useState(0);
  const [allOrder,setAllOrder]=useState([0]);
  const [quantity, setQuan] = useState(0);
  const [balance,setBalance]=useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [play, setPlay] = useState(false);
  const [token,settoken]=useState("");
  const [name,setname]=useState("");


  const getdata=async(tok)=>{
    try {
      const dataRef = doc(collection(db, 'User'), tok);
        onSnapshot(dataRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = {
              ...docSnapshot.data(),
              id: docSnapshot.id,
            };
    
            setBalance(parseInt(userData.Credit, 10));
            setname(userData.Name);
          }
        }) 
    } catch (error) {
      console.error('Error getting document:', error);
    }  
  }

  useEffect(() => {
    const newtoken = Cookies.get('token');
    if (newtoken) {
      settoken(newtoken);
      getdata(newtoken);
    }else{
      navigate('/');
    }
}, [balance])


  const buyall = async () => {
    const dataref=await getDocs(collection(db,"Orders"))
    const data=dataref.docs.map((doc)=>({
      ...doc.data(),
      id:doc.id
    }))
    console.log(data);
    setAllOrder(data);
  }

  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async() => {
    await buyall()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      let k = simulateStockPrice();
      if (k !== price) {
        setPrice(k);
      }
      else {
        setPrice(k = k + 0.2);
      }
    }, 1000);
  }, [price])

 
  const order = async () => {
    const order={
      "user": token,
      "type": "Sell",
      "Quantity": quantity,
      "Price": newPrice === 0 ? price : newPrice,
    }
    await addDoc(collection(db,"Orders"),order);
    console.log("order placed")
    setPrice(0);
    setQuan(0);
  }
  
  const handleBought = async (e) => {
    console.log(allOrder[e.target.value].id);
    const newQuantity=parseInt(allOrder[e.target.value].Quantity, 10);
    setBalance(balance + newQuantity)

    const filteredOrder=allOrder.filter((i)=>{
      return(allOrder[e.target.value].id!==i.id);
    })
    setAllOrder(filteredOrder);
    await updateDoc(doc(collection(db,"User"),token),{"Credit":balance + newQuantity})
    console.log("old user",allOrder[e.target.value].user);
    const oldbalref=await getDoc(doc(collection(db,"User"),allOrder[e.target.value].user));
    const bal={...oldbalref.data()}
    console.log(bal.Credit);
    await updateDoc(doc(collection(db,"User"),allOrder[e.target.value].user),{"Credit":bal.Credit-newQuantity})
    await deleteDoc(doc(collection(db,"Orders"),allOrder[e.target.value].id))
    handleClose();
  }
  const handleClose1 = () => {
    setOpen1(false);
    // setChecked(true)
  };

  const handlesubmit = async () => {
    setOpen1(false);
    // setChecked(true);
    if (quantity === 0) {
      alert("Please set Quantity");
    } else {
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

  function buyoptions(cost,quan,_id) {
    return (
      <Box width={"80%"} key={_id} sx={{ backgroundColor: "#2b2b2b",padding:"15px", marginY: "15px", borderRadius: "5px", }}>
        <Box height={"60%"} sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
          <Box>
            <Box variant="contained" sx={{ paddingX: "50px", fontSize: "20px", borderRadius: "10px", fontWeight: "bolder", color: "white" }} color="success">Quantity</Box>
            <p style={{ textAlign: 'center', color: "white" }}>{quan}</p>
          </Box>
          <Box>
            <Box variant="contained" sx={{ paddingX: "50px", fontSize: "20px", borderRadius: "10px", fontWeight: "bolder", color: "white" }} color="error" >Price</Box>
            <p style={{ textAlign: 'center', color: "white" }}>{cost}</p>
          </Box>
        </Box>
        <Box height={"40%"} sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
          <Button value={_id} onClick={handleBought} variant="contained" sx={{ paddingX: "40px", fontSize: "20px", borderRadius: "10px", fontWeight: "bolder" }} color="success">BUY</Button>
          {/* <Button variant="contained" sx={{ paddingX: "40px", fontSize: "20px", borderRadius: "10px", fontWeight: "bolder" }} color="error" >SELL</Button> */}
        </Box>
      </Box>
    )
  }

  function showBuy() {
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: "#2b2b2b" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Buy
            </Typography>
          </Toolbar>
        </AppBar>
        <Box width={"100%"} height={"100%"} sx={{overflow:"scroll", backgroundColor: "#141313", display: "flex", alignItems: 'center',flexDirection:"column" }}>
          {
            allOrder.map((i,e)=> {
              if(i.user!==token){
                return(buyoptions(i.Price,i.Quantity,e));
              }
            })
          }
        </Box>
      </Dialog>
    )
  }


  function showForm() {
    return (
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"
        >
          <Box style={{ fontSize: "18px" }}>Current Electricity rate: {price}</Box>
        </DialogTitle>
        <DialogContent>
          <Grid container xs={12}>
            <Grid item xs={6}>
              <TextField value={quantity} onChange={(e) => { setQuan(e.target.value); }} sx={{ color: "white" }} id="filled-password-input" label="Quantity" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField value={newPrice} onChange={(e) => { setNewPrice(e.target.value); }} id="filled-password-input" label="Price (0 = Market Value)" variant="standard" />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlesubmit}>Submit</Button>
          <Button onClick={handleClose1} autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.heading} >Hi, {name.split(" ")[0]}</Box>
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
            <Button variant="contained" onClick={handleClickOpen} sx={{ paddingX: "40px", fontSize: "20px", fontWeight: "bolder" }} color="success">BUY</Button>
            {showBuy()}
            {showForm()}
            <Button variant="contained" sx={{ paddingX: "40px", fontSize: "20px", fontWeight: "bolder" }} color="error" onClick={handleClickOpen1}>SELL</Button>
          </Box>
        </Box>
        {/* overall */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", marginTop: "10px" }}>
          <h4 style={{ color: "white" }}>Credits</h4>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-around" }}>
            <h4 style={{ color: balance>=0?"green":"red" }}> {balance} </h4>
            <h4 style={{ color: "white" }}>Units</h4>
          </Box>
        </Box>
      </Box>
      <Box className={classes.box} style={{ justifyContent: "space-evenly" }}>
        <Box style={{ fontSize: "25px", fontWeight: "600" }}>Current Status</Box>
        {play && <Button variant="outlined" onClick={(e) => { play == false ? setPlay(true) : setPlay(false) }} startIcon={<PlayArrowIcon />} >Play</Button>}
        {!play && <Button variant="outlined" onClick={(e) => { play == false ? setPlay(true) : setPlay(false) }} startIcon={<PauseIcon />} >Pause</Button>}
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