import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from "react-redux"
import { addToken } from '../redux/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { db, auth } from '../firebase/Firebaseconfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {addDoc, collection, getDocs} from "firebase/firestore"
import "./signup.css";

const defaultTheme = createTheme();
const provider = new GoogleAuthProvider();

export default function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            dispatch(addToken({ token: token }));
            navigate('/main')
        }
    }, [])


    const signup=async()=>{
        signInWithPopup(auth, provider).then((result) => {
            const Data={
                Name:result.user.displayName,
                Credit:0,
                Uid:result.user.uid,
                Email:result.user.email,
                Photo:result.user.photoURL,
            }
            getDocs(collection(db,"User")).then((dataRef)=>{
                const Members = dataRef.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                var flag=false;
                for (let i = 0; i < Members.length; i++) {
                    if (Members[i].Email === result.user.email) {
                        flag=true;
                    }
                }if(flag===false){
                    addDoc(collection(db,"User"),Data).then((data)=>{
                        console.log(data.id);
                        Cookies.set('token', data.id, { expires: 7 });
                        navigate(`/main`);
                        return;
                    }).catch(error=>{
                        console.log(error);
                    });
                }else{
                    alert("User Already Exist")
                }
            })
            
        }).catch(error => {
            console.log(error);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Box onClick={()=>navigate('/')} variant="body2">
                                    {"Already have an account? Sign In"}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box WidthFull sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Button
                        onClick={signup}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, position: "absolute", bottom: 20 }}
                    >
                        Sign Up with Google
                    </Button>
                </Box>

            </Container>

        </ThemeProvider>
    );
}
