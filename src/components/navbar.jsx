import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Cookies from 'js-cookie';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useNavigate } from 'react-router';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/Firebaseconfig';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(43, 43, 43, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '1rem',
  padding: '8px 16px',
  margin: '0 4px',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#965BF6',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(150, 91, 246, 0.1)',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#2B2B2B',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
}));

const pages = [
    {
        title: 'Dashboard',
        link: '/main'
    },
    {
        title: 'Orders',
        link: '/orders'
    },
];
const settings = [
    {
        title: 'Profile',
        link: '/profile'
    },
    {
        title: 'Logout',
        link: '/'
    },
];

function Navbar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [photo, setPhoto]=React.useState("");

    const getdata=async(tok)=>{
        try {
          const dataRef = await getDoc(doc(collection(db, 'User'), tok));
      
          if (dataRef.exists()) {
            const userData = {
              ...dataRef.data(),
              id: dataRef.id,
            };
            setPhoto(userData.Photo)
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error getting document:', error);
        }  
    }
    React.useEffect(() => {
        const newtoken = Cookies.get('token');
        if (newtoken) {
          getdata(newtoken);
        }else{
            setPhoto("");
        }
    }, [Cookies.get('token')])

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    return (
        <StyledAppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ 
                        display: { xs: 'none', md: 'flex' }, 
                        // color: '#965BF6', 
                        mr: 1,
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)'
                        }
                    }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                            color: '#b388ff',
                            transition: 'color 0.2s ease-in-out',
                            '&:hover': { 
                                color: '#b585ff' 
                            }
                        }}
                    >
                        VETAT
                    </Typography>

                    <AdbIcon sx={{ 
                        display: { xs: 'flex', md: 'none' }, 
                        color: '#965BF6', 
                        mr: 1,
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)'
                        }
                    }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                            color: '#965BF6',
                            transition: 'color 0.2s ease-in-out',
                            '&:hover': { 
                                color: '#b388ff' 
                            }
                        }}
                    >
                        VETAT
                    </Typography>
                    <Box sx={{ 
                        flexGrow: 1, 
                        alignItems: 'center', 
                        justifyContent: 'flex-end', 
                        mr: 3, 
                        display: { xs: 'none', md: 'flex' } 
                    }}>
                        {pages.map((page) => (
                            <StyledButton
                                key={page.title}
                                onClick={e => { setAnchorElNav(null); navigate(page.link) }}
                            >
                                {page.title}
                            </StyledButton>
                        ))}
                    </Box>
                    <Button 
                        sx={{ 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: '#965BF6',
                            }
                        }} 
                        variant="text"
                    >
                        <Tooltip title="Notifications">
                            <NotificationsNoneOutlinedIcon />
                        </Tooltip>
                    </Button>
                    <Box sx={{ flexGrow: 0, ml: 2 }}>
                        <Tooltip title="Open settings">
                            <IconButton 
                                onClick={handleOpenUserMenu} 
                                sx={{ 
                                    p: 0,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                    }
                                }}
                            >
                                {photo !== "" && (
                                    <Avatar 
                                        alt="User Avatar" 
                                        src={photo}
                                        sx={{
                                            border: '2px solid #965BF6',
                                            transition: 'transform 0.2s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.05)'
                                            }
                                        }}
                                    />
                                )}
                            </IconButton>
                        </Tooltip>
                        <StyledMenu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={e => { setAnchorElUser(null); }}
                        >
                            {settings.map((setting) => (
                                <StyledMenuItem 
                                    key={setting.title} 
                                    onClick={e => { 
                                        setAnchorElUser(null);
                                        if (setting.title === 'Logout') {
                                            Cookies.remove('token');
                                        }
                                        navigate(setting.link) 
                                    }}
                                >
                                    <Typography textAlign="center">{setting.title}</Typography>
                                </StyledMenuItem>
                            ))}
                        </StyledMenu>
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}

export default Navbar;