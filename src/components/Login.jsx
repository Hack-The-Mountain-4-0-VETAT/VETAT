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



const defaultTheme = createTheme();


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
                        Sign in
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Box onClick={()=>navigate('/login')} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box WidthFull sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Button
                        onClick={signin}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, position: "absolute", bottom: 20 }}
                    >
                        Sign In with Google
                    </Button>
                </Box>

            </Container>

        </ThemeProvider>
    );
}
