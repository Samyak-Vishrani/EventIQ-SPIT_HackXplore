import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import notif from '../assets/notif.svg';
import announce from '../assets/announce.svg';
import profile from '../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';

const pages = ['Notification', 'Announcements'];

const ResponsiveAppBar = () => {

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCreateEvent = () => {
        navigate("/eventform");
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{ background: 'black', height: '75px' }} >
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ gap: '10px', display: 'flex', alignItems: 'center', width: 'fit-content', marginLeft: 'auto', display: { xs: 'none', md: 'flex' } }}>

                        <button style={{ height: 'fit-content', padding: '1vh 1vw', background:'var(--dark-red)', color:'white', border:'none', outline:'none', cursor:'pointer' }} onClick={handleCreateEvent} >Create new Event</button>

                        {/* <select style={{ height: 'fit-content', padding: '1vh 1vw', background:'var(--dark-red)', color:'white', border:'none', outline:'none' }}>
                            <option>Switch Event</option>
                        </select> */}

                        <button
                            onClick={handleCloseNavMenu}
                            style={{ my: 2, color: 'white', display: 'block', background:'black', border:'none', outline:'none'  }}
                        >
                            <img src={announce} />
                        </button>
                        <button
                            onClick={handleCloseNavMenu}
                            style={{ width:'fit-content', my: 2, color: 'white', display: 'block', background:'black', border:'none', outline:'none', marginRight:'10px' }}
                        >
                            <img src={notif} />
                        </button>

                    </Box>
                    {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="view profile">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft:'10px' }}>
                                <img src={profile} />
                            </IconButton>
                        </Tooltip>
                        
                    </Box> */}
                    <ProfileButton />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
