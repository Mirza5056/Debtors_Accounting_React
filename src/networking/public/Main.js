import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import ItemsIcons from '@mui/icons-material/Inventory';
import CustomersIcon from '@mui/icons-material/People';
import InvoiceIcon from '@mui/icons-material/Receipt';
import TradersIcon from '@mui/icons-material/Store';
import './styles/main.css';
import Items from "./Items";
import { Link } from "react-router-dom";
const drawerWidthDefault = 50;
const drawerWidthExpande = 170;
const Main = ({ children }) => {
    /* All Drawer Related Module */
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = () => { setOpenDrawer(!openDrawer); }
    /* All Drawer Related Module */
    /* Dark Light Mode Settings */
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };
    /* Handle window resize event */
    const handleResize = () => {
        if (window.innerWidth < 786) {
            setOpenDrawer(false);
        }
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    const menuItems = [
        { text: 'Items', icon: <ItemsIcons sx={{ fontSize: '1.6rem' }} />, link: '/items' },
        { text: 'Customers', icon: <CustomersIcon sx={{ fontSize: '1.6rem' }} />, link: '/customer' },
        { text: 'Invoice', icon: <InvoiceIcon sx={{ fontSize: '1.6rem' }} />, link: '/invoice' },
        { text: 'Traders', icon: <TradersIcon sx={{ fontSize: '1.6rem' }} />, link: '/traders' },
    ];
    return (
        <Box sx={{ display: 'flex' }} className="container">
            <CssBaseline />
            {/* AppBar */}
            <AppBar className="app-bar" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'var(--app-bar-bg-color)', color: 'var(--app-bar-text-color)' }}>
                <Toolbar>
                    <IconButton color="inherit" onClick={toggleDrawer} sx={{ color: 'var(--background-text-color)' }}>
                        <MenuIcon />
                    </IconButton>
                    <b className="app-bar-style">
                        Debtor's Accounting
                    </b>
                    <IconButton color="inherit" onClick={toggleDarkMode} sx={{ position: 'absolute', top: '0.2rem', right: '1rem' }}>
                        {/* Add an icon to toggle light/dark mode */}
                        {isDarkMode ? '🌙' : '☀️'}
                    </IconButton>
                    {/*
                    <Toggle isChecked={isDark} handleChange={() => setDark(!isDark)}/>
                     */}
                </Toolbar>
            </AppBar>
            {/* AppBar */}
            {/* Drawer */}
            <Drawer variant="permanent" anchor="left" open={openDrawer}
                className={openDrawer ? 'drawer-expland' : 'drawer-collasped'}
                sx={{
                    width: openDrawer ? drawerWidthExpande : drawerWidthDefault,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: openDrawer ? drawerWidthExpande : drawerWidthDefault,
                        transition: 'width 0.3s',
                    },
                }}>
                <Toolbar />
                <List>
                    {menuItems.map((item, index) => (
                        <Link to={item.link} key={item.text} className="drawer-link">
                            <ListItem button key={item.text} disablePadding>
                                <div className="drawer-item">
                                    {item.icon}&nbsp;&nbsp;&nbsp;
                                    {openDrawer && <ListItemText primary={item.text} className="drawer-text" />}

                                </div>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
            {/* Drawer */}
            {/* Main Content Goes Here */}
            <Box className="bottom-section" sx={{
                marginLeft: openDrawer ? '190px' : '80px',
                marginRight: openDrawer ? '20px' : '2rem',
                transition: 'margin-left 0.4s',
                transition: 'margin-right 0.4s'
            }}>
                {children}
            </Box>
            {/* Ends Here */}
            {/* Footer Starts */}
            <Footer />
            {/* Footer Ends */}
        </Box>
    );
}
export default Main;