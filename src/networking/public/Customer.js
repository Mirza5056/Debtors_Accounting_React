import React from "react";
import Local from './LocalComponent';
import './styles/customer.css';
import { Box, Fab, List, Paper, Select, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove, faUser } from "@fortawesome/free-solid-svg-icons";
export default function Customer() {
    return (
        <React.Fragment>
            <Local />
            <div className="customer-container">
                <Box className="main-heading">
                    <b className="customer-text">Customer Details</b>
                    <Box sx={{display : 'flex',justifyContent : 'space-between',width : '12%'}}>
                        <Fab size="small"><FontAwesomeIcon icon={faUser} /></Fab>
                        <Fab size="small"><FontAwesomeIcon icon={faEdit} /></Fab>
                        <Fab size="small"><FontAwesomeIcon icon={faRemove} /></Fab>
                    </Box>
                </Box>
                <Box className="main-container">
                    <Box className="left-section" component={Paper}>
                        <b>Student List</b>
                        <List></List>
                    </Box>
                    <Box className="right-section" component={Paper}>
                        <b>Student Details</b>
                        <Box>
                            <TextField size="small" variant="filled" label="Student Id" color="success" />
                            <TextField size="small" variant="outlined" label="Name" helperText="Enter Customer Name" />
                            <TextField size="small" multiline variant="outlined" label="Address" rows={3} helperText="Enter Customer Address"  />
                            <TextField size="small" variant="outlined" label="Student Id" />
                            <TextField size="small" variant="outlined" label="Student Id" />
                            <TextField size="small" variant="outlined" label="Student Id" />
                            <TextField size="small" variant="outlined" label="Student Id" />
                            <TextField size="small" variant="outlined" label="Student Id" />
                            <TextField size="small" select variant="outlined" label="State Name" defaultValue="Mumbai" helperText="Please Select State" />
                        </Box>
                    </Box>
                </Box>
            </div>
        </React.Fragment>
    );
}