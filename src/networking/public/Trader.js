import React from "react";
import AppBarDrawer from './LocalComponent';
import './styles/traders.css';
import { Box, Divider, Fab, FormControl, FormGroup, Grid, Input, InputLabel, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, textFieldClasses } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns, faCircleXmark, faGear, faPhoneVolume, faRegistered, faUserPlus } from "@fortawesome/free-solid-svg-icons";
export default function Trader() {
    const TradersDetailsSection=(
        <Box component="form">
            <b className="trader-settings"><FontAwesomeIcon icon={faGear} />&nbsp;Traders Settings</b>
            <Divider textAlign="left" variant="middle"><b className="general-info"><FontAwesomeIcon icon={faUserPlus} />&nbsp;General Information</b></Divider>

            <Divider textAlign="right" variant="middle"><b className="general-info"><FontAwesomeIcon icon={faBuildingColumns} />&nbsp;Bank Detials</b></Divider>
            
            <Divider variant="middle" textAlign="left"><b className="general-info"><FontAwesomeIcon icon={faRegistered} />&nbsp;Registration Number</b></Divider>
            
            <Divider variant="middle" textAlign="right"><b className="general-info"><FontAwesomeIcon icon={faPhoneVolume} />&nbsp;Phone</b></Divider>
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
                        <Fab size="small" color="secondary">
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