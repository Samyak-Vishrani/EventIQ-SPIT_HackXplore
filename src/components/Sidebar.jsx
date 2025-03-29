import * as React from 'react';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize active button based on current route
    const getInitialActiveButton = () => {
        const path = location.pathname;
        switch (path) {
            case '/dashboard':
                return 'Event details';
            case '/assigntask':
                return 'Assign Task';
            case '/checklist':
                return 'Checklist';
            case '/departments':
                return 'Departments';
            case '/sponsorship':
                return 'Sponsorship';
            case '/highlights':
                return 'Highlights';
            default:
                return 'Event details';
        }
    };

    // State to track the active/selected button
    const [activeButton, setActiveButton] = useState(getInitialActiveButton());

    // Memoized function to handle button click
    const handleButtonClick = useCallback((text) => {
        setActiveButton(text);
        switch (text) {
            case "Assign Task":
                navigate("/assigntask");
                break;
            case "Event details":
                navigate("/dashboard");
                break;
            case "Checklist":
                navigate("/checklist");
                break;
            case "Departments":
                navigate("/departments");
                break;
            case "Sponsorship":
                navigate("/sponsorship");
                break;
            case "Highlights":
                navigate("/highlights");
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
                boxSizing:'border-box'
            }}
            role="presentation"
        >
            {/* Logo Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    marginBottom: 2,
                }}
            >
                <Typography variant="h5" component="div" style={{fontFamily:'Quicksand', fontWeight:'300', fontSize:'30px'}}>
                    EventIQ
                </Typography>
            </Box>

            <List sx={{ marginBottom: 2 }}>
                {['Event details', 'Assign Task', 'Checklist'].map((text) => (
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
            <Divider />
            <List>
                {['Departments', 'Sponsorship', 'Highlights'].map((text) => (
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

export default Sidebar;