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
import GoogleIcon from '@mui/icons-material/Google';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b894',
    },
    secondary: {
      main: '#00cec9',
    },
    background: {
      default: '#141313',
      paper: '#2b2b2b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '10px',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
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
        },
      },
    },
  },
});

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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container 
                component="main" 
                maxWidth="xs"
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingTop: '80px',
                    paddingBottom: '80px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#2b2b2b',
                        padding: '40px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Avatar 
                        sx={{ 
                            m: 1, 
                            bgcolor: '#00b894',
                            width: 56,
                            height: 56
                        }}
                    >
                        <LockOutlinedIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography 
                        component="h1" 
                        variant="h4" 
                        sx={{ 
                            color: '#fff',
                            fontWeight: 600,
                            mb: 3
                        }}
                    >
                        Create Account
                    </Typography>
                    <Box 
                        component="form" 
                        onSubmit={handleSubmit} 
                        noValidate 
                        sx={{ 
                            mt: 1,
                            width: '100%'
                        }}
                    >
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
                            sx={{ 
                                mt: 3, 
                                mb: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                background: 'linear-gradient(45deg, #00b894 30%, #00cec9 90%)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #00cec9 30%, #00b894 90%)',
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Typography 
                                    onClick={()=>navigate('/')} 
                                    sx={{ 
                                        color: '#00b894',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    Already have an account? Sign In
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Box 
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3
                    }}
                >
                    <Button
                        onClick={signup}
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        sx={{ 
                            py: 1.5,
                            px: 4,
                            fontSize: '1.1rem',
                            backgroundColor: '#fff',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            }
                        }}
                    >
                        Sign Up with Google
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
