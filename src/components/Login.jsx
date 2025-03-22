import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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
import { collection, getDocs } from 'firebase/firestore';
import GoogleIcon from '@mui/icons-material/Google';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b894',
    },
    secondary: {
      main: '#965BF6',
    },
    background: {
      default: '#1a1a1a',
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
          padding: '10px 20px',
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

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();

    React.useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            dispatch(addToken({ token: token }));
            navigate('/main')
        }
    }, [])

    const signin = () => {
        signInWithPopup(auth, provider).then((result) => {
            getDocs(collection(db, "User")).then((dataRef) => {
                const Members = dataRef.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                var flag = false;
                let i = 0;
                for (i; i < Members.length; i++) {
                    if (Members[i].Email === result.user.email) {
                        flag = true;
                        break;
                    }
                } if (flag === true) {
                    Cookies.set('token', Members[i].id, { expires: 7 });
                    navigate(`/main`);
                } else {
                    alert("Account Does Not Exist")
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
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)',
                    paddingTop: '80px'
                }}
            >
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            backgroundColor: '#2b2b2b',
                            borderRadius: '20px',
                            padding: '40px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                            <Avatar 
                                sx={{ 
                                    m: 1, 
                                    bgcolor: '#00b894',
                                    width: 56,
                                    height: 56,
                                    boxShadow: '0 4px 12px rgba(0,184,148,0.3)'
                                }}
                            >
                                <LockOutlinedIcon sx={{ fontSize: 30 }} />
                            </Avatar>
                            <Typography 
                                component="h1" 
                                variant="h4" 
                                sx={{ 
                                    fontWeight: 600,
                                    color: '#fff',
                                    mt: 2
                                }}
                            >
                                Welcome Back
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: '#b2bec3',
                                    mt: 1
                                }}
                            >
                                Sign in to continue trading
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} noValidate>
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
                                    background: 'linear-gradient(45deg, #00b894 30%, #00cec9 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(0, 184, 148, .3)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #00cec9 30%, #00b894 90%)',
                                        boxShadow: '0 5px 8px 3px rgba(0, 184, 148, .4)',
                                    }
                                }}
                            >
                                Sign In
                            </Button>

                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs>
                                    <Link 
                                        href="#" 
                                        variant="body2"
                                        sx={{ 
                                            color: '#00b894',
                                            textDecoration: 'none',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            }
                                        }}
                                    >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link 
                                        component="button"
                                        onClick={() => navigate('/login')}
                                        sx={{ 
                                            color: '#00b894',
                                            textDecoration: 'none',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            }
                                        }}
                                    >
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>

                            <Button
                                onClick={signin}
                                fullWidth
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                                sx={{ 
                                    py: 1.5,
                                    borderColor: '#404040',
                                    color: '#fff',
                                    '&:hover': {
                                        borderColor: '#00b894',
                                        backgroundColor: 'rgba(0, 184, 148, 0.1)',
                                    }
                                }}
                            >
                                Sign in with Google
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
