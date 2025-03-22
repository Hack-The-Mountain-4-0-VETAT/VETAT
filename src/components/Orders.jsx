import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useStyles } from './HomeCss';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/Firebaseconfig';
import { doc, collection, deleteDoc, onSnapshot } from "firebase/firestore";
import { Box, Button, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const StyledOrderCard = styled(Box)(({ theme }) => ({
  width: "90%",
  backgroundColor: "#2b2b2b",
  padding: "20px",
  marginY: "25px",
  borderRadius: "15px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  }
}));

const StatBox = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
  padding: '10px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  }
}));

export default function Orders() {
    var classes = useStyles();
    const navigate = useNavigate()
    const [token, settoken] = useState("");
    const [allOrder, setAllOrder] = useState([0]);

    const orders = async () => {
        const dataref = collection(db, "Orders");
        onSnapshot(dataref,(docSnapshot)=>{
            const userData =docSnapshot.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }));
            console.log(userData);
            setAllOrder(userData);
            }
        )
    }

    useEffect(() => {
        const newtoken = Cookies.get('token');
        if (newtoken) {
            settoken(newtoken);
            orders()
        } else {
            navigate('/')
        }
    }, [])

    const remove = async (e) => {
        const filteredOrder = allOrder.filter((i) => {
            return (allOrder[e.target.value].id !== i.id);
        })
        setAllOrder(filteredOrder);
        await deleteDoc(doc(collection(db, "Orders"), allOrder[e.target.value].id));
    }

    return (
        <Box sx={{
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 8,
            paddingBottom: 4,
            minHeight: "100vh",
            backgroundColor: "#141313",
            position: "relative",
            top: 0
        }} className={classes.mainContainer}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: "800px",
                position: "relative",
                top: 0,
                gap: 2
            }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        color: "white",
                        marginBottom: 4,
                        fontWeight: 600
                    }}
                >
                    Your Orders
                </Typography>
                {
                    allOrder.map((e, i) => {
                        if (e.user === token) {
                            return (
                                <StyledOrderCard key={i}>
                                    <Box sx={{ 
                                        display: "flex", 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        marginBottom: "20px"
                                    }}>
                                        <StatBox>
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    color: "#00b894",
                                                    fontWeight: "600",
                                                    marginBottom: "8px"
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
                                                {parseInt(e.Quantity, 10)}
                                            </Typography>
                                        </StatBox>
                                        <Box 
                                            sx={{ 
                                                width: "1px", 
                                                height: "50px", 
                                                backgroundColor: "#404040",
                                                margin: "0 30px"
                                            }}
                                        />
                                        <StatBox>
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    color: "#ff7675",
                                                    fontWeight: "600",
                                                    marginBottom: "8px"
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
                                                ₹{e.Price}
                                            </Typography>
                                        </StatBox>
                                    </Box>
                                    <Box 
                                        sx={{ 
                                            display: "flex", 
                                            justifyContent: 'center',
                                            marginTop: "15px"
                                        }}
                                    >
                                        <Button 
                                            value={i} 
                                            onClick={remove} 
                                            variant="contained"
                                            startIcon={<DeleteIcon />}
                                            sx={{ 
                                                paddingX: "40px",
                                                paddingY: "12px",
                                                fontSize: "16px",
                                                borderRadius: "10px",
                                                fontWeight: "600",
                                                backgroundColor: "#ff7675",
                                                '&:hover': {
                                                    backgroundColor: "#ff6b6b",
                                                }
                                            }}
                                        >
                                            Cancel Order
                                        </Button>
                                    </Box>
                                </StyledOrderCard>
                            )
                        }
                    })
                }
            </Box>
        </Box>
    )
}