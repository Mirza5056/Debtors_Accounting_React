import { AppBar, Avatar, Box, Button, ButtonGroup, Chip, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography, tableCellClasses } from "@mui/material";
import React, { useState } from "react";
import '@fontsource/roboto'
import MenuIcon from '@mui/icons-material/Menu';
import './styles/index.css';
import rgpvLogo from './images/RGPVLOGO.jfif';
import { Link, useLocation } from "react-router-dom";
const settings=['Profile','Dashboard','Setting','Logout'];
export default function LocalComponent() {
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
            <Divider color="inherit" />
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
    const MyDataTable=(
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>LALA</TableCell>
                        <TableCell>KILLER</TableCell>
                        <TableCell>MANU</TableCell>
                        <TableCell>SYS</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
    return (
        <React.Fragment>
            <Box sx={{display : 'flex'}}>
                <Drawer variant="persistent" open={openDrawer}>
                    {DraweList}
                </Drawer>
                <Box component="main">
                    <AppBar position="fixed" sx={{backgroundColor : 'black'}}>
                        <Toolbar>
                            <IconButton onClick={openDrawerState} color="inherit" sx={{
                                marginRight : 2,
                                transition : 'margin 0.3s, tranform 0.3s',
                                marginLeft : openDrawer ? '170px' : 0,
                                transform : openDrawer ? 'rotateX(180deg)' : 'rotateY(0deg)',
                            }}>
                                <MenuIcon />
                            </IconButton>
                            
                            <Typography variant="h5" noWrap fontFamily='monospace' sx={{
                                fontWeight : 700,
                                letterSpacing : '.2rem',
                                fontSize : '26px',
                                display : { sx : 'none',md : 'flex'},
                            }}>Debtor's Accounting</Typography>

                            <Box sx={{ml : 'auto'}}>
                                <Tooltip title="Open Settings">
                                    <IconButton onClick={handleOpenUserMenu}>
                                        <Avatar alt="Remy Sharp" src={rgpvLogo} />
                                    </IconButton>
                                </Tooltip>
                                <Menu 
                                anchorEl={anchorElUser} 
                                keepMounted 
                                open={Boolean(anchorElUser)}
                                onClose={closeOpenMenuUser} 
                                anchorOrigin={{
                                    vertical : 'top',
                                    horizontal : 'right',
                                }}>
                                    { settings.map((setting)=>(
                                        <MenuItem key={setting} onClick={closeOpenMenuUser}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                        </Toolbar>
                    </AppBar>  
                </Box>

                <Box sx={{marginLeft : openDrawer ? '5cm' : 0,
                    transition : 'margin 0.3s',display : 'flex'
                }}>
                    <TableContainer component={Paper}>
                    </TableContainer>
                    <Box component={Paper} sx={{
                        position : 'fixed',
                        bottom : 0,
                        width : '100%',
                        backgroundColor : 'black',
                        color : 'white',
                        paddingBlock : '.2cm'
                    }}>
                        <Typography sx={{fontFamily : 'inherit',float : 'right',
                            marginRight : '5.3cm',
                        }}>&copy; Gentella Reservation - 2030</Typography>
                    </Box>
                </Box>

            </Box>
        </React.Fragment>
    );
}