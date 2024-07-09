import React, { useEffect } from "react";
import AppBarDrawer from './LocalComponent';
import './styles/traders.css';
import { Box, Button, Divider, Fab, FormControl, FormGroup, Grid, Input, InputLabel, List, ListItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, textFieldClasses } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns, faCircleXmark, faGear, faPhoneVolume, faRegistered, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SendIcon from '@mui/icons-material/Send';
import { fetchTraders } from "./actions/TraderAction";
import { useDispatch, useSelector } from "react-redux";
export default function Trader() {
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchTraders());
    });
    const traderData=useSelector((state)=> state.traders.traderList);
    const TradersDetailsSection=(
        <div>
            {traderData.map((trader)=>(
                <Box component="form">
                <b className="trader-settings"><FontAwesomeIcon icon={faGear} />&nbsp;Traders Settings</b>
                <Divider textAlign="left" variant="middle"><b className="general-info"><FontAwesomeIcon icon={faUserPlus} />&nbsp;General Information</b></Divider>
                <Box className="general-information">
                    <TextField size="small" value={trader.code} className="text-width" label="Trader Id" variant="outlined" /><br></br>
                    <br></br>
                    <TextField size="small" value={trader.name} className="text-width" label="Enter Your Name" variant="outlined" /><br></br>
                    <br></br>
                    <TextField size="small" value={trader.address} className="text-width" label="Your Address" variant="outlined" /><br></br>
                </Box>
                <Divider textAlign="right" variant="middle"><b className="general-info"><FontAwesomeIcon icon={faBuildingColumns} />&nbsp;Bank Detials</b></Divider>
                <Box className="bank-info">
                    <TextField size="small" value={trader.bank_custom_name} className="text-width" label="Bank Name" variant="outlined" /><br></br>
                    <br></br>
                    <TextField size="small" value={trader.account_number} className="text-width" label="Account Number" variant="outlined" /><br></br>
                    <br></br>
                    <TextField size="small" value={trader.ifsc_code} className="text-width" label="IFSC Code" variant="outlined" /><br></br>
                    <br></br>
                    <TextField size="small" value={trader.branch_name} className="text-width" label="Branch Name" variant="outlined" /><br></br>
                </Box>
                <Divider variant="middle" textAlign="left"><b className="general-info"><FontAwesomeIcon icon={faRegistered} />&nbsp;Registration Number</b></Divider>
                <Box className="general-information">
                    <TextField size="small" value={trader.gst_num} className="text-width" label="GST Number" variant="outlined" /><br></br>
                    <br></br>
                    <TextField size="small" value={trader.reg_title_1} className="text-width" label="TIN Number" variant="outlined" /><br></br>
                    <br></br>
                    <TextField size="small" value={trader.reg_value_1} className="text-width" label="PIN Number" variant="outlined" /><br></br>
                </Box>
                <Divider variant="middle" textAlign="right"><b className="general-info"><FontAwesomeIcon icon={faPhoneVolume} />&nbsp;Phone</b></Divider>
                <Box className="bank-info">
                    <TextField size="small" value={trader.contact_1} className="text-width" label="Contact 1" variant="outlined" /><br></br>
                    <br></br>
                    <TextField size="small" value={trader.contact_2} className="text-width" label="Contact 2" variant="outlined" /><br></br>
                    <br></br>
                    <TextField size="small" value={trader.contact_3} className="text-width" label="Contact 3" variant="outlined" /><br></br>
                </Box>
                <Stack direction="row" spacing={2} sx={{justifyContent : 'center'}}>
                    <Button variant="contained" endIcon={<SendIcon />}>Update</Button>
                </Stack>
                <br></br>
                </Box>
            ))}
        </div>
    );
    return (
        <React.Fragment>
            <AppBarDrawer />
            <Box className="trader-section-container">
            <br></br>
                <Box className="top-section">
                    <h4 className="main-logo">Traders Details</h4>
                    <div className="fonts-icons">
                        <Fab size="small" color="primary">
                            <FontAwesomeIcon icon={faUserPlus} />
                        </Fab>&nbsp;&nbsp;
                        <Fab size="small" color="error">
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </Fab>
                    </div>
                </Box>
                <Box className="details-section" component={Paper}>
                    {TradersDetailsSection} 
                </Box>
            </Box>
        </React.Fragment>
    );
}