import React from "react";
import AppBarDrawer from './LocalComponent';
import './styles/traders.css';
import { Box, Button, Divider, Fab, FormControl, FormGroup, Grid, Input, InputLabel, List, ListItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, textFieldClasses } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns, faCircleXmark, faGear, faPhoneVolume, faRegistered, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SendIcon from '@mui/icons-material/Send';
export default function Trader() {
    const TradersDetailsSection=(
        <Box component="form">
            <b className="trader-settings"><FontAwesomeIcon icon={faGear} />&nbsp;Traders Settings</b>
            <Divider textAlign="left" variant="middle"><b className="general-info"><FontAwesomeIcon icon={faUserPlus} />&nbsp;General Information</b></Divider>
            <Box className="general-information">
                <TextField size="small" className="text-width" label="Trader Id" variant="outlined" /><br></br>
                <br></br>
                <TextField size="small" className="text-width" label="Enter Your Name" variant="outlined" /><br></br>
                <br></br>
                <TextField size="small" className="text-width" label="Your Address" variant="outlined" /><br></br>
            </Box>
            <Divider textAlign="right" variant="middle"><b className="general-info"><FontAwesomeIcon icon={faBuildingColumns} />&nbsp;Bank Detials</b></Divider>
            <Box className="bank-info">
                <TextField size="small" className="text-width" label="Bank Name" variant="outlined" /><br></br>
                <br></br>
                <TextField size="small" className="text-width" label="Account Number" variant="outlined" /><br></br>
                <br></br>
                <TextField size="small" className="text-width" label="IFSC Code" variant="outlined" /><br></br>
                <br></br>
                <TextField size="small" className="text-width" label="Branch Name" variant="outlined" /><br></br>
            </Box>
            <Divider variant="middle" textAlign="left"><b className="general-info"><FontAwesomeIcon icon={faRegistered} />&nbsp;Registration Number</b></Divider>
            <Box className="general-information">
                <TextField size="small" className="text-width" label="GST Number" variant="outlined" /><br></br>
                <br></br>
                <TextField size="small" className="text-width" label="TIN Number" variant="outlined" /><br></br>
                <br></br>
                <TextField size="small" className="text-width" label="PIN Number" variant="outlined" /><br></br>
            </Box>
            <Divider variant="middle" textAlign="right"><b className="general-info"><FontAwesomeIcon icon={faPhoneVolume} />&nbsp;Phone</b></Divider>
            <Box className="bank-info">
                <TextField size="small" className="text-width" label="Contact 1" variant="outlined" /><br></br>
                <br></br>
                <TextField size="small" className="text-width" label="Contact 2" variant="outlined" /><br></br>
                <br></br>
                <TextField size="small" className="text-width" label="Contact 3" variant="outlined" /><br></br>
            </Box>
            <Stack direction="row" spacing={2} sx={{justifyContent : 'center'}}>
                <Button variant="contained" endIcon={<SendIcon />}>Update</Button>
            </Stack>
            <br></br>
        </Box>
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