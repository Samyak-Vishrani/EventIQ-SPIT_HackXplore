import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const Sidebar = () => {
    // State to track the active/selected button
    const [activeButton, setActiveButton] = useState('Event details');

    // Function to handle button click and update active state
    const handleButtonClick = (text) => {
        setActiveButton(text);
    };

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