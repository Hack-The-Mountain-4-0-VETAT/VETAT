import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useStyles } from './HomeCss';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/Firebaseconfig';
import { doc, collection, deleteDoc, onSnapshot } from "firebase/firestore";
import { Box, Button } from "@mui/material";


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
        <Box sx={{display:"flex", alignItems:"center",paddingTop:10, paddingBottom:10 }} className={classes.mainContainer}>
            {
                allOrder.map((e, i) => {
                    if (e.user === token) {
                        return (
                                <Box width={"80%"} key={i} sx={{ backgroundColor: "#2b2b2b", padding: "15px", marginY: "15px", borderRadius: "5px", }}>
                                    <Box height={"60%"} sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Box>
                                            <Box variant="contained" sx={{ paddingX: "50px", fontSize: "20px", borderRadius: "10px", fontWeight: "bolder", color: "white" }} color="success">Quantity</Box>
                                            <p style={{ textAlign: 'center', color: "white" }}>{parseInt(e.Quantity, 10)}</p>
                                        </Box>
                                        <Box>
                                            <Box variant="contained" sx={{ paddingX: "50px", fontSize: "20px", borderRadius: "10px", fontWeight: "bolder", color: "white" }} color="error" >Price</Box>
                                            <p style={{ textAlign: 'center', color: "white" }}>{parseInt(e.Price, 10)}</p>
                                        </Box>
                                    </Box>
                                    <Box height={"40%"} sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Button value={i} onClick={remove} variant="contained" sx={{ paddingX: "40px", fontSize: "20px", borderRadius: "10px", fontWeight: "bolder", backgroundColor: "#ff0000" }} >cancel</Button>
                                        {/* <Button variant="contained" sx={{ paddingX: "40px", fontSize: "20px", borderRadius: "10px", fontWeight: "bolder" }} color="error" >SELL</Button> */}
                                    </Box>
                                </Box>
                            
                        )
                    }
                })
            }
        </Box>

    )
}