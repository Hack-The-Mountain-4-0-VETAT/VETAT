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
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useNavigate } from 'react-router';

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

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#2B2B2B', color: 'white' }}>
            <Container>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, color: '#965BF6', mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', "&:hover": { color: '#965BF6' }, color: '#965BF6', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        VETAT
                    </Typography>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, color: '#965BF6', mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', "&:hover": { color: '#965BF6' }, md: 'none', color: '#965BF6' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        VETAT
                    </Typography>
                    <Box sx={{ flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end', mr: 3, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={e => { setAnchorElNav(null); navigate(page.link) }}
                                sx={{ my: 2, color: 'black', display: 'block', '&:hover': { color: 'red', fontWeight: 600 } }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                    <Button sx={{ borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant="text">
                        <Tooltip title="Notifications">
                            <Badge badgeContent={4} color="error">
                                <NotificationsNoneOutlinedIcon />
                            </Badge>
                        </Tooltip>
                    </Button>
                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px', display: { sm: 'block', xs: 'none' } }}
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
                                <MenuItem key={setting.title} onClick={e => { setAnchorElUser(null); navigate(setting.link) }}>
                                    <Typography textAlign="center">{setting.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <Menu
                            sx={{ mt: '45px', display: { sm: 'none', xs: 'block' } }}
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
                            <MenuItem onClick={e => { setAnchorElUser(null); navigate('/') }}>
                                <Typography textAlign="center">{'Logout'}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;