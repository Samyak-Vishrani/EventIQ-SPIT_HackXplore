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
import Cookies from "js-cookie";

const SidebarCocom = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [department, setDepartment] = React.useState("");

    // Cookies.set("department-cocom", "creatives", {expires: 7})

    React.useEffect(() => {
        setDepartment(Cookies.get("department-cocom"))
    }, [])

    const getInitialActiveButton = () => {
        const path = location.pathname;
        switch (path) {
            case '/dashboard':
            case '/dashboardcocom':
                return 'Event details';
            case '/yourdepartment':
                return 'Your Department';
            case '/announcements':
                return 'Announcements';
            case '/postergen':
                return 'Auto Posters';
            case '/sponsorships':
                return 'Sponsorships';
            default:
                return 'Event details';
        }
    };

    const [activeButton, setActiveButton] = useState(getInitialActiveButton());

    const handleButtonClick = useCallback((text) => {
        setActiveButton(text);
        switch (text) {
            case "Event details":
                navigate("/dashboardcocom");
                break;
            case "Your Department":
                navigate("/yourdepartment");
                break;
            case "Announcements":
                navigate("/announcements");
                break;
            case "Auto Posters":
                navigate("/postergen");
                break;
            case "Sponsorships":
                navigate("/sponsorships");
                break;
            default:
                break;
        }
    }, [navigate]);

    // Determine menu items based on department
    const getMenuItems = () => {
        const baseItems = ["Event details", "Your Department", "Announcements"];
        
        if (department === "creatives") {
            return [...baseItems, "Auto Posters"];
        } else if (department === "marketing") {
            return [...baseItems, "Sponsorships"];
        }
        
        return baseItems;
    };

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
                {getMenuItems().map((text) => (
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