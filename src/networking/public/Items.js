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
    const [page,setPage]=React.useState(0);
    const [rowsPerPage,setRowsPerPage]=React.useState(5);
    function TablePaginationActions(props) {
        const theme=useTheme();
        const {count,page,rowsPerPage,onPageChange}=props;
    }
    function createData(sno,name,hsn_code,edit,del) {
        return {sno,name,hsn_code,edit,del};
    }
    const rows=[
        createData(1,'Fruit',4343,'Edit','Delete'),
        createData(2,'Orange',43,'Edit','Delete'),
        createData(3,'Mango',687,'Edit','Delete'),
        createData(4,'Gavava',232,'Edit','Delete'),
        createData(5,'Banana',9121,'Edit','Delete'),
        createData(6,'Pipple',123,'Edit','Delete'),
        createData(7,'Jerry',45,'Edit','Delete'),
        createData(8,'Water',9012,'Edit','Delete'),
    ].sort((a,b)=>(a.sno < b.sno ? -1 : 1));
    const emptyRows=page > 0 ? Math.max(0,(1+page)*rowsPerPage-rows.length) : 0;
    const handlePageChange=(ev,newPage)=>{
        setPage(newPage);
    }
    const handleChangeRowPerPage=(ev)=>{
        setRowsPerPage(parseInt(ev.target.value,10));
        setPage(0);
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
    const SelectPage=(
        <FormControl>
            <NativeSelect page={page} count={rows.length} rowsPerPage={rowsPerPage} onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
            </NativeSelect>
        </FormControl>
    );
    const TableData=(
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight : 'bold',fontSize : '11pt'}}>S.No</TableCell>
                        <TableCell sx={{fontWeight : 'bold',fontSize : '11pt'}}>Name</TableCell>
                        <TableCell sx={{fontWeight : 'bold',fontSize : '11pt'}}>HSN_CODE</TableCell>
                        <TableCell sx={{fontWeight : 'bold',fontSize : '11pt'}}>Edit</TableCell>
                        <TableCell sx={{fontWeight : 'bold',fontSize : '11pt'}}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage) : rows).map((row)=>(
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">{row.sno}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.hsn_code}</TableCell>
                            <TableCell>{row.edit}</TableCell>
                            <TableCell>{row.del}</TableCell>
                        </TableRow>
                    ))} 
                    {emptyRows > 0 && (
                        <TableRow style={{height : 53 * emptyRows}}>
                            <TableCell colSpan={6}></TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination rowsPerPageOptions={[5,10,15,20,{label : 'All',value : -1}]}
                        colSpan={4}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleChangeRowPerPage}
                        ActionsComponent={TablePaginationActions} />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
    return (
        <Box className="mainBack">
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
                    <br></br>
                    <Box className="title-main-box">
                        <Typography sx={{fontWeight : 'bold',fontSize : '20pt',fontFamily : 'Roboto'}}>Data Tables</Typography>
                        <Typography sx={{fontFamily : 'Roboto'}}>Dashboard / <a href="#">Data Tables</a></Typography>
                    </Box>                  
                    
                    <Box className="centered-box">
                        <Box className="search-box-inside-main">
                            <TextField placeholder="Search..." size="small" sx={{width : '300px'}}/>
                            <Typography sx={{marginRight : '40px',fontFamily : 'Roboto',fontSize : '11pt'}} variant="h6">{SelectPage} Entites Per Page</Typography>
                        </Box>
                        <Divider sx={{width : '100%'}} />
                        {TableData}
                    </Box>
                    <br></br>
                    <Box className="detailed-box">
                        <Box className="left-section">
                            <Typography sx={{fontFamily : 'Roboto',fontSize : '14pt',letterSpacing : '4px'}} className="items-data">Items Details</Typography>
                            <Box className="items-data-details">
                                <Typography>HSN_CODE</Typography>
                                <Typography>ITEM_CODE</Typography>
                                <Typography>C G S T</Typography>
                                <Typography>S G S T</Typography>
                                <Typography>I G S T</Typography>
                            </Box>
                        </Box>
                        <Box className="right-section">
                            <Typography sx={{fontFamily : 'Roboto',fontSize : '14pt',letterSpacing : '4px'}} className="unitOfMeasurements">UnitOfMeasurements</Typography>
                            <Box className="unitofmeasurements-details">
                                <b>Kg,</b> <b>Ltr,</b> <b>gram,</b> <b>Packet,</b> <b>ml,</b> <b>Box</b>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}