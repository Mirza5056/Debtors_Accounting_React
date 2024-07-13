import React, { useEffect, useState } from "react";
import AppBarDrawer from './LocalComponent';
import './styles/traders.css';
import { Backdrop, Box, Button, Card, Divider, Fab, Fade, FormControl, FormGroup, Grid, Input, InputLabel, List, ListItem, MenuItem, Modal, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, textFieldClasses } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns, faCircleXmark, faGear, faPhoneVolume, faRegistered, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SendIcon from '@mui/icons-material/Send';
import { addTraderData, fetchTraders, setTraderData } from "./actions/TraderAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchStates } from "./actions/customerActions";
import { addItem, addItemData } from "./actions/ItemActions";
export default function Trader() {
    const traderData=useSelector((state)=> state.traders.traderList);
    const states=useSelector((state)=> state.states_name.statesList);
    const [code,setCode]=React.useState('');
    const [name,setName]=React.useState('');
    const [address,setAddress]=React.useState('');
    const [bankName,setBankName]=React.useState('');
    const [accountNumber,setAccountNumber]=React.useState('');
    const [ifscCode,setIfscCode]=React.useState('');
    const [branchName,setBranchName]=React.useState('');
    const [gstNumber,setGstNumber]=React.useState('');
    const [tinNumber,setTinNumber]=React.useState('');
    const [pinNumber,setPinNumber]=React.useState('');
    const [contact1,setContact1]=React.useState('');
    const [contact2,setContact2]=React.useState('');
    const [contact3,setContact3]=React.useState('');
    const [state,setState]=useState('');
    const [statesData,setStatesData]=useState([]);
    const fillTraderForm=()=>{
        traderData.map((trader)=>{
            setCode(trader.code)
            setName(trader.name);
            setAddress(trader.address);
            setGstNumber(trader.gst_num);
            setTinNumber(trader.reg_title_1);
            setPinNumber(trader.reg_value_1);
            setBankName(trader.bank_custom_name);
            setAccountNumber(trader.account_number);
            setIfscCode(trader.ifsc_code);
            setBranchName(trader.branch_name);
            setContact1(trader.contact_1);
            setContact2(trader.contact_2);
            setContact3(trader.contact_3);
            setStatesData(trader.state_code);
        });
    };
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchTraders());
        dispatch(fetchStates());
    },[dispatch]);
    useEffect(()=>{
        if(traderData.length) {
            fillTraderForm();
        }
    },[traderData]);
    const [inputDisabled,setInputDisabled]=React.useState(true);
    const [buttonDisabled,setButtonDisabled]=React.useState(true);
    const traderAddModule=()=>{
        alert('clciked');
        setInputDisabled(false);
        setButtonDisabled(false);
    };
    const traderFormSubmit=(ev)=>{
        ev.preventDefault();
        const state_code=traderData.map((state)=>({
            code : state.code
        }));
        const traders={code,name,address,bankName,accountNumber,ifscCode,branchName,gstNumber,pinNumber,tinNumber,contact1,contact2,contact3,state_code};
        alert(JSON.stringify(traders));
        //const trader_json=JSON.stringify(traders);
        dispatch(addTraderData(traders));
        alert('upadated');
    };
    const TradersDetailsSection=(
        <div>
            <Box component="form" onSubmit={traderFormSubmit}>
                <b className="trader-settings"><FontAwesomeIcon icon={faGear} />&nbsp;Traders Settings</b>
                <Divider textAlign="left" variant="middle"><b className="general-info"><FontAwesomeIcon icon={faUserPlus} />&nbsp;General Information</b></Divider>
                <Box className="general-information">
                    <TextField size="small" 
                        className="text-width" 
                        label="Trader Id" 
                        variant="outlined"
                        value={code}
                        onChange={(ev)=> setCode(ev.target.value)}
                        disabled={inputDisabled}
                    />
                    <br />
                    <br />
                    <TextField size="small" 
                        className="text-width" 
                        label="Enter Your Name" 
                        variant="outlined"
                        value={name}
                        onChange={(ev)=> setName(ev.target.value)}
                        disabled={inputDisabled}
                    />
                    <br />
                    <br />
                    <TextField 
                        size="small" 
                        className="text-width" 
                        label="Your Address" 
                        variant="outlined"
                        value={address}
                        onChange={(ev)=> setAddress(ev.target.value)}
                        disabled={inputDisabled}
                    /><br></br>
                </Box>
                <Divider textAlign="right" variant="middle"><b className="general-info"><FontAwesomeIcon icon={faBuildingColumns} />&nbsp;Bank Detials</b></Divider>
                <Box className="bank-info">
                    <TextField 
                        size="small" 
                        className="text-width" 
                        label="Bank Name" 
                        variant="outlined"
                        value={bankName}
                        onChange={(ev)=> setBankName(ev.target.value)} 
                        disabled={inputDisabled}
                    />
                    <br />
                    <br />
                    <TextField 
                        size="small" 
                        className="text-width" 
                        label="Account Number" 
                        variant="outlined"
                        value={accountNumber}
                        onChange={(ev)=> setAccountNumber(ev.target.value)} 
                        disabled={inputDisabled}
                    />
                    <br />
                    <br />
                    <TextField size="small" 
                        className="text-width" 
                        label="IFSC Code" 
                        variant="outlined"
                        value={ifscCode}
                        onChange={(ev)=> setIfscCode(ev.target.value)}
                        disabled={inputDisabled}
                    />
                    <br />
                    <br />
                    <TextField 
                        size="small" 
                        className="text-width" 
                        label="Branch Name" 
                        variant="outlined"
                        value={branchName}
                        onChange={(ev)=> setBranchName(ev.target.value)} 
                        disabled={inputDisabled}
                    />
                    <br />
                    <br />
                </Box>
                <Divider variant="middle" textAlign="left"><b className="general-info"><FontAwesomeIcon icon={faRegistered} />&nbsp;Registration Number</b></Divider>
                <Box className="general-information">
                    <TextField size="small" 
                        className="text-width" 
                        label="GST Number" 
                        variant="outlined"
                        value={gstNumber}
                        onChange={(ev)=> setGstNumber(ev.target.value)} 
                        disabled={inputDisabled}
                    /><br></br>
                    <br></br>
                    <TextField 
                        size="small" 
                        className="text-width" 
                        label="TIN Number" 
                        variant="outlined"
                        value={tinNumber}
                        onChange={(ev)=> setTinNumber(ev.target.value)} 
                        disabled={inputDisabled}
                    /><br></br>
                    <br></br>
                    <TextField size="small" 
                        className="text-width" 
                        label="PIN Number" 
                        variant="outlined"
                        value={pinNumber}
                        onChange={(ev)=> setPinNumber(ev.target.value)}
                        disabled={inputDisabled}
                    /><br></br>
                </Box>
                <Divider variant="middle" textAlign="right"><b className="general-info"><FontAwesomeIcon icon={faPhoneVolume} />&nbsp;Phone</b></Divider>
                <Box className="bank-info">
                    <TextField 
                        size="small" 
                        className="text-width" 
                        label="Contact 1" 
                        variant="outlined"
                        value={contact1}
                        onChange={(ev)=> setContact1(ev.target.value)} 
                        disabled={inputDisabled}
                    /><br></br>
                    <br></br>
                    <TextField 
                        size="small" 
                        className="text-width" 
                        label="Contact 2" 
                        variant="outlined"
                        value={contact2}
                        onChange={(ev)=> setContact2(ev.target.value)} 
                        disabled={inputDisabled}
                    /><br></br>
                    <br></br>
                    <TextField 
                        size="small" 
                        className="text-width" 
                        label="Contact 3" 
                        variant="outlined"
                        value={contact3}
                        onChange={(ev)=> setContact3(ev.target.value)}
                        disabled={inputDisabled} 
                    /><br></br>
                    <br />
                    <FormControl className="text-width">
                        <InputLabel>State</InputLabel>
                        <Select
                        value={state}
                        onChange={(ev)=> setState(ev.target.value)}
                        disabled={inputDisabled}
                        >{
                            states.map((state)=>(
                                <MenuItem key={state.code} value={state.code}>{state.name}</MenuItem>
                            ))
                        }
                        </Select>
                    </FormControl>
                </Box>
                <Stack direction="row" spacing={2} sx={{justifyContent : 'center'}}>
                    <Button variant="contained" type="submit" endIcon={<SendIcon />} disabled={buttonDisabled}>Update</Button>
                </Stack>
                <br></br>
            </Box>
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
                            <FontAwesomeIcon icon={faUserPlus} onClick={traderAddModule} />
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