import { AppBar, Avatar, Box, Button, Divider, Drawer, FormControl, IconButton, InputAdornment, ListItemButton, Menu, MenuItem, NativeSelect, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography,TableFooter, TablePagination,List,ListItem } from "@mui/material";
import React, { useState } from "react";
import '@fontsource/roboto'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import './styles/index.css';
import rgpvLogo from './images/RGPVLOGO.jfif';
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
const settings=['Profile','Dashboard','Setting','Logout'];
export default function Items() {
    const [anchorElUser,setAnchorElUser]=React.useState(null);
    const [openDrawer,setOpenDrawer]=useState(false);
    const openDrawerState=()=>{
        setOpenDrawer(!openDrawer);
    }
    const handleOpenUserMenu=(ev)=>{
        setAnchorElUser(ev.currentTarget) 
    }
    const closeOpenMenuUser=()=>{
        setAnchorElUser(null);
    }
    const DraweList=(
        <div className="drawer">
            <Toolbar>
                <IconButton>
                    <Avatar alt="Remy Sharp" src={rgpvLogo} />
                </IconButton>
                <Typography sx={{color : 'whitesmoke'}}>Accounting</Typography>
            </Toolbar>
            <List>
                {[
                    {text : 'Customers',link : '/customer'},
                    {text : 'Traders',link : '/traders'},
                    {text : 'Invoice',link : '/invoice'},
                    {text : 'Items',link : '/items'}
                ].map((item,index)=>(
                    <ListItem key={index}  component={Link} to={item.link}>
                        <ListItemButton sx={{
                            color: 'white',
                            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
                            textAlign: 'center',
                            '&:hover': {
                              backgroundColor: 'red',
                            },
                            }}>
                            <Typography>{item.text}</Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Button sx={{marginTop : 'auto',color : 'whitesmoke',borderRadius : '20px','&:hover' : {
                backgroundColor : 'red'
            }, }}>Logout</Button>
        </div>
    );
    return (
        <Box>
            <Box className="mainComponent">
                <Drawer variant="persistent" open={openDrawer}>
                    {DraweList}
                </Drawer>
                <Box component="main">
                    <AppBar position="fixed" sx={{backgroundColor : 'white',height : '80px'}}>
                        <Toolbar className="mainToolBar">        
                            <Box className="searchIconMainBox">               
                                <IconButton onClick={openDrawerState} color="black" sx={{
                                    marginRight : 2,
                                    transition : 'margin 0.3s, tranform 0.3s',
                                    marginLeft : openDrawer ? '190px' : 0,
                                    transform : openDrawer ? 'rotateX(180deg)' : 'rotateY(0deg)',
                                    fontSize : 28
                                }}>
                                    <MenuIcon fontSize="inherit" />
                                </IconButton>
                                <TextField variant="outlined" placeholder="Type to search..." size="large" InputProps={{startAdornment : ( <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment> ),    }} sx={{width : '250px'}} />
                            </Box>
                            <Box className="avatar_section">
                                <Switch color="default" />
                                <IconButton color="black">
                                    <NotificationIcon />
                                </IconButton>&nbsp;
                                <IconButton color="black">
                                    <MailIcon />
                                </IconButton>&nbsp;&nbsp;
                                <Typography className="kamranAkthar" sx={{fontSize : 14}}>Kamran Akthar<br></br><Typography className="uxDesigner" sx={{fontSize : 12}}>UX Designer</Typography></Typography>&nbsp;&nbsp;
                                <IconButton className="avatarIcon" fontSize="inherit">
                                    <Avatar alt="user Ava" src={rgpvLogo} />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>                                  
                </Box>
            </Box>
        </Box>
    );
}