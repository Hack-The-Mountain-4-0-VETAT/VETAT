import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from './HomeCss';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Box, Slide } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/Firebaseconfig';
import { getDoc, doc, collection, updateDoc, getDocs, deleteDoc, addDoc, onSnapshot } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  const [play, setPlay] = useState(true);
  const [token,settoken]=useState("");
  const [name,setname]=useState("");
  const [priceHistory, setPriceHistory] = useState([7]);
  const [timeData, setTimeData] = useState([new Date().toLocaleTimeString()]);
  const priceRef = useRef(7);
  const [advances, setAdvances] = useState(0);
  const [declines, setDeclines] = useState(0);
  const [unchanged, setUnchanged] = useState(0);
  const previousPriceRef = useRef(7);

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
    if (play) {
      const interval = setInterval(() => {
        let k = simulateStockPrice();
        if (k !== priceRef.current) {
          // Update price change statistics
          if (k > previousPriceRef.current) {
            setAdvances(prev => prev + 1);
          } else if (k < previousPriceRef.current) {
            setDeclines(prev => prev + 1);
          } else {
            setUnchanged(prev => prev + 1);
          }
          previousPriceRef.current = k;
          
          priceRef.current = k;
          setPrice(k);
          const now = new Date();
          const timeStr = now.toLocaleTimeString();
          setTimeData(prev => [...prev, timeStr].slice(-50));
          setPriceHistory(prev => [...prev, k].slice(-50));
        }
        else {
          const newPrice = Number((k + 0.2).toFixed(2));
          // Update price change statistics
          if (newPrice > previousPriceRef.current) {
            setAdvances(prev => prev + 1);
          } else if (newPrice < previousPriceRef.current) {
            setDeclines(prev => prev + 1);
          } else {
            setUnchanged(prev => prev + 1);
          }
          previousPriceRef.current = newPrice;
          
          priceRef.current = newPrice;
          setPrice(newPrice);
          const now = new Date();
          const timeStr = now.toLocaleTimeString();
          setTimeData(prev => [...prev, timeStr].slice(-50));
          setPriceHistory(prev => [...prev, newPrice].slice(-50));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [play]);

  const order = async () => {
    if (quantity === 0) {
      alert("Please set Quantity");
      return;
    }

    const orderPrice = newPrice === 0 || newPrice === "" ? Number(price.toFixed(2)) : Number(newPrice);
    
    const order = {
      "user": token,
      "type": "Sell",
      "Quantity": Number(quantity),
      "Price": orderPrice,
    }
    
    await addDoc(collection(db,"Orders"), order);
    console.log("order placed");
    setPrice(0);
    setQuan(0);
    setNewPrice(0);
    handleClose1();
  }
  
  const handleBought = async (e) => {
    console.log(allOrder[e.target.value].id);
    const newQuantity = Number(allOrder[e.target.value].Quantity);
    setBalance(balance + newQuantity);

    const filteredOrder = allOrder.filter((i) => {
      return(allOrder[e.target.value].id !== i.id);
    });
    setAllOrder(filteredOrder);
    await updateDoc(doc(collection(db,"User"), token), {"Credit": balance + newQuantity});
    console.log("old user", allOrder[e.target.value].user);
    const oldbalref = await getDoc(doc(collection(db,"User"), allOrder[e.target.value].user));
    const bal = {...oldbalref.data()};
    console.log(bal.Credit);
    await updateDoc(doc(collection(db,"User"), allOrder[e.target.value].user), {"Credit": bal.Credit - newQuantity});
    await deleteDoc(doc(collection(db,"Orders"), allOrder[e.target.value].id));
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
    let price = priceRef.current || 7;
    const minChange = -0.05;
    const maxChange = 0.05;
    const priceChange = (Math.random() * (maxChange - minChange) + minChange).toFixed(2);
    price += parseFloat(priceChange);
    if (price < 1) {
      price = 1;
    }
    return Number(price.toFixed(2));
  }

  function buyoptions(cost,quan,_id) {
    return (
      <Box 
        width={"90%"} 
        key={_id} 
        sx={{ 
          backgroundColor: "#2b2b2b",
          padding: "20px",
          marginY: "15px",
          borderRadius: "15px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          }
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: "15px"
          }}
        >
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "#00b894",
                fontWeight: "600",
                marginBottom: "5px"
              }}
            >
              Quantity
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: "white",
                fontWeight: "700"
              }}
            >
              {quan}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              width: "1px", 
              height: "50px", 
              backgroundColor: "#404040",
              margin: "0 20px"
            }}
          />
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "#ff7675",
                fontWeight: "600",
                marginBottom: "5px"
              }}
            >
              Price
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: "white",
                fontWeight: "700"
              }}
            >
              ₹{cost}
            </Typography>
          </Box>
        </Box>
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: 'center',
            marginTop: "10px"
          }}
        >
          <Button 
            value={_id} 
            onClick={handleBought} 
            variant="contained" 
            sx={{ 
              paddingX: "40px",
              paddingY: "10px",
              fontSize: "18px",
              borderRadius: "10px",
              fontWeight: "600",
              background: "linear-gradient(45deg, #00b894 30%, #00cec9 90%)",
              boxShadow: "0 3px 5px 2px rgba(0, 184, 148, .3)",
              transition: "all 0.3s",
              "&:hover": {
                background: "linear-gradient(45deg, #00cec9 30%, #00b894 90%)",
                boxShadow: "0 5px 8px 3px rgba(0, 184, 148, .4)",
                transform: "translateY(-1px)",
              }
            }}
          >
            BUY NOW
          </Button>
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
        PaperProps={{
          sx: {
            backgroundColor: '#2b2b2b',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            minWidth: '400px'
          }
        }}
      >
        <DialogTitle 
          id="alert-dialog-title"
          sx={{
            backgroundColor: '#1a1a1a',
            color: '#fff',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            padding: '20px',
            borderBottom: '1px solid #404040'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Sell Electricity
            </Typography>
            <IconButton
              onClick={handleClose1}
              sx={{ 
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ 
            backgroundColor: '#2b2b2b', 
            padding: '12px 20px', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            <Typography sx={{ color: '#b2bec3' }}>Current Rate:</Typography>
            <Typography sx={{ 
              color: '#00b894',
              fontWeight: 600,
              fontSize: '1.2rem'
            }}>
              ₹{price.toFixed(2)}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={quantity}
                  onChange={(e) => { setQuan(e.target.value); }}
                  label="Quantity"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: '#404040',
                      },
                      '&:hover fieldset': {
                        borderColor: '#00b894',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00b894',
                      },
                      '& input': {
                        color: '#fff',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#b2bec3',
                      '&.Mui-focused': {
                        color: '#00b894',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={newPrice}
                  onChange={(e) => { setNewPrice(e.target.value); }}
                  label="Price (0 = Market Value)"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                      '& fieldset': {
                        borderColor: '#404040',
                      },
                      '&:hover fieldset': {
                        borderColor: '#00b894',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00b894',
                      },
                      '& input': {
                        color: '#fff',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#b2bec3',
                      '&.Mui-focused': {
                        color: '#00b894',
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          padding: '15px 20px',
          backgroundColor: '#1a1a1a',
          borderTop: '1px solid #404040',
          borderBottomLeftRadius: '15px',
          borderBottomRightRadius: '15px'
        }}>
          <Button 
            onClick={handleClose1}
            sx={{
              color: '#b2bec3',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlesubmit}
            variant="contained"
            sx={{
              backgroundColor: '#00b894',
              '&:hover': {
                backgroundColor: '#00a187'
              }
            }}
          >
            Sell Now
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const chartData = timeData.map((time, index) => ({
    time,
    price: priceHistory[index]
  }));

  return (
    <Box className={classes.mainContainer} sx={{ paddingTop: "50px" }}>
      <Box className={classes.heading} sx={{ marginBottom: "30px" }}>Hi, {name.split(" ")[0]}</Box>
      <Box className={classes.box}>
        <Box sx={{ display: 'flex', justifyContent: "space-around", width: "100%" }}>
          <Box sx={{ 
            backgroundColor: "#2B2B2B", 
            paddingX: "40px", 
            paddingY: "10px", 
            borderRadius: "20px",
            minWidth: "150px",
            textAlign: "center"
          }}>
            Current Price
          </Box>
          <Box sx={{ 
            backgroundColor: "#2B2B2B", 
            paddingX: "40px", 
            paddingY: "10px", 
            borderRadius: "20px",
            minWidth: "150px",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}>
            {price.toFixed(2)}
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
      <Box className={classes.box} style={{ justifyContent: "space-evenly", marginBottom: "20px" }}>
        <Box style={{ fontSize: "25px", fontWeight: "600" }}>Current Grid Status</Box>
        <Button 
          variant="outlined" 
          onClick={() => setPlay(!play)}
          startIcon={play ? <PauseIcon /> : <PlayArrowIcon />}
        >
          {play ? 'Pause' : 'Play'}
        </Button>
      </Box>
      <Box className={classes.box} sx={{ marginBottom: "20px" }}>
        <Box sx={{ 
          width: '100%', 
          height: 400, 
          backgroundColor: '#2b2b2b', 
          borderRadius: '10px', 
          p: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#666" />
              <XAxis 
                dataKey="time" 
                stroke="#fff"
                tick={{ fill: '#fff' }}
                hide={true}
              />
              <YAxis 
                stroke="#fff"
                tick={{ fill: '#fff' }}
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2b2b2b', 
                  border: 'none', 
                  color: '#fff',
                  borderRadius: '5px'
                }}
                labelStyle={{ color: '#fff' }}
                formatter={(value, name) => [`${value.toFixed(2)}`, name]}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#965BF6" 
                strokeWidth={2}
                dot={{ fill: '#965BF6', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box className={classes.box} style={{ justifyContent: "space-between", marginTop: "20px" }}>
        <ul style={{ color: "white", listStyle: "none", padding: 0 }}>
          <li>Advances - {advances}</li>
          <li>Declines - {declines}</li>
          <li>Unchanged - {unchanged}</li>
        </ul>
        <Box sx={{ color: "white" }}>Last Updated : {new Date().toLocaleTimeString()}</Box>
      </Box>

      {/* AI Suggestions Section */}
      <Box className={classes.box} sx={{ 
        marginTop: "30px",
        backgroundColor: "#2b2b2b",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <Typography variant="h5" sx={{ 
          color: "#00b894",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          AI Trading Suggestions
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              backgroundColor: "#1a1a1a",
              padding: "15px",
              borderRadius: "10px",
              height: "100%"
            }}>
              <Typography variant="h6" sx={{ color: "#00b894", marginBottom: "10px" }}>
                Short-term Prediction
              </Typography>
              <Typography sx={{ color: "#b2bec3" }}>
                Price is expected to increase by 2.5% in the next hour based on current market trends and historical patterns.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              backgroundColor: "#1a1a1a",
              padding: "15px",
              borderRadius: "10px",
              height: "100%"
            }}>
              <Typography variant="h6" sx={{ color: "#00b894", marginBottom: "10px" }}>
                Trading Strategy
              </Typography>
              <Typography sx={{ color: "#b2bec3" }}>
                Consider selling at current price levels. Market indicators suggest a potential price correction in the next 30 minutes.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              backgroundColor: "#1a1a1a",
              padding: "15px",
              borderRadius: "10px",
              height: "100%"
            }}>
              <Typography variant="h6" sx={{ color: "#00b894", marginBottom: "10px" }}>
                Risk Assessment
              </Typography>
              <Typography sx={{ color: "#b2bec3" }}>
                Low risk trading environment. Volatility is within normal range. Consider setting stop-loss at 5% below current price.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}