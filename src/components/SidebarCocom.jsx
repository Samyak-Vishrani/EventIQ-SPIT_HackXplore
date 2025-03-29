import * as React from 'react';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarCocom = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getInitialActiveButton = () => {
        const path = location.pathname;
        switch (path) {
            case '/dashboard':
                return 'Event details';
            case '/yourdepartment':
                return 'Your Department';
            case '/announcements':
                return 'Announcements';
            default:
                return 'Event details';
        }
    };

    const [activeButton, setActiveButton] = useState(getInitialActiveButton());

    const handleButtonClick = useCallback((text) => {
        setActiveButton(text);
        switch (text) {
            case "Event details":
                navigate("/dashboard");
                break;
            case "Your Department":
                navigate("/yourdepartment");
                break;
            case "Announcements":
                navigate("/announcements");
                break;
            default:
                break;
        }
    }, [navigate]);

    const list = () => (
        <Box
            sx={{
                width: '250px',
                height: '100%',
                overflowY: 'auto',
                background: 'black',
                color: 'white',
                boxSizing: 'border-box'
            }}
            role="presentation"
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    marginBottom: 2,
                }}
            >
                <Typography variant="h5" component="div" style={{ fontFamily: 'Quicksand', fontWeight: '300', fontSize: '30px' }}>
                    EventIQ
                </Typography>
            </Box>

            <List sx={{ marginBottom: 2 }}>
                {["Event details", "Your Department", "Announcements"].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => handleButtonClick(text)}
                            sx={{
                                backgroundColor: activeButton === text 
                                    ? 'var(--dark-red)' 
                                    : 'transparent',
                                color: activeButton === text ? 'white' : 'inherit',
                                '&:hover': {
                                    backgroundColor: 'gray',
                                    color: 'white',
                                    transition: 'all 0.5s ease'
                                }
                            }}
                        >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open
            sx={{
                width: 250,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                },
            }}
        >
            {list()}
        </Drawer>
    );
}

export default SidebarCocom;
