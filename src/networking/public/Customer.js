import React, { useEffect, useState } from "react";
import Local from './LocalComponent';
import './styles/customer.css';
import { Box, Divider, Fab, FormControl, FormHelperText, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faGlassWater, faL, faRemove, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, fetchCustomersDetails, fetchStates, selectCustomer } from "./actions/customerActions";
import { Button } from "bootstrap";

export default function Customer() {
    const dispatch=useDispatch();
    const customers=useSelector((state)=> state.customers.customerList);
    const selectedCustomer=useSelector((state)=> state.customers.selectCustomer);
    const customerDetails=useSelector((state)=> state.customers.customerDetails);
    const state_data=useSelector((state)=> state.states_name.statesList);
    const [state,setState]=React.useState('');
    const [code,setCode]=React.useState('');
    const [name,setName]=React.useState('');
    const [address,setAddress]=React.useState('');
    const [reg_title_1,setRegTitle1]=React.useState('');
    const [reg_title_2,setRegTitle2]=React.useState('');
    const [reg_title_3,setRegTitle3]=React.useState('');
    const [contact_1,setContact1]=React.useState('');
    const [contact_2,setContact2]=React.useState('');
    const [contact_3,setContact3]=React.useState('');
    const [inputDisabled,setInputDisabled]=useState(true);
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [showAddButton,setShowAddButton]=useState(true);
    const [showCancelButton,setShowCancelButton]=useState(true);
    useEffect(()=>{
        dispatch(fetchStates());
        dispatch(fetchCustomers());
    },[dispatch]);
    const handleCustomerClick=(customer)=>{
        dispatch(selectCustomer(customer));
        dispatch(fetchCustomersDetails(customer.code));
        if(customerDetails.length != null) {
            customerDetails.map((customer)=>{
                setCode(customer.code);
                setName(customer.name);
                setAddress(customer.address);
                setRegTitle1(customer.reg_title_1);
                setRegTitle2(customer.reg_title_2);
                setRegTitle3(customer.reg_title_3);
                setContact1(customer.contact_1);
                setContact2(customer.contact_2);
                setContact3(customer.contact_3);
                setState(customer.state_code);
            });
        }
    };
    const customerAddButtonClicked=()=>{
        alert('clicked');
        setInputDisabled(false);
        setButtonDisabled(true);
        setShowAddButton(false);
        setShowCancelButton(false);
    };
    const cancelAddButtonClicked=()=>{
        setShowCancelButton(true);
        setShowAddButton(true);
        setButtonDisabled(false);
    };
    const customerSuccessfullAddButtonClicked=()=>{
        setShowCancelButton(true);
        setShowAddButton(true);
        setButtonDisabled(false);
        customerAddFormSubmit();
    };
    const customerAddFormSubmit=()=>{
        alert('successfully added');
    };
    const customerUpdateButtonClicked=()=>{
        alert('clicked');
    };
    return (
        <React.Fragment>
            <Local />
            <div className="customer-container">
                <Box className="main-heading">
                    <b className="customer-text">Customer's</b>
                    <Box sx={{display : 'flex',justifyContent : 'space-between',width : '12%'}}>
                        {showAddButton ? (
                            <Fab size="small" disabled={buttonDisabled} onClick={customerAddButtonClicked}><FontAwesomeIcon icon={faUser} /></Fab>
                        ): (
                            <Fab size="small" onClick={customerSuccessfullAddButtonClicked}><FontAwesomeIcon icon={faCheck} /></Fab>
                        )}
                        {showCancelButton ? (
                            <Fab size="small" disabled={buttonDisabled} onClick={customerUpdateButtonClicked}><FontAwesomeIcon icon={faEdit} /></Fab>
                        ):(
                            <Fab size="small" onClick={cancelAddButtonClicked}><FontAwesomeIcon icon={faRemove} /></Fab>
                        )}
                        <Fab size="small" disabled={buttonDisabled}><FontAwesomeIcon icon={faRemove} /></Fab>
                    </Box>
                </Box>
                <Box className="main-container">
                    <Box className="left-section" component={Paper}>
                        <Box className="left-text">
                            <p className="text-content">Customers</p>
                        </Box>
                        <List>
                            {customers.map((customer)=>(
                                <ListItem key={customer.code} button onClick={()=> handleCustomerClick(customer)} >
                                    <ListItemText sx={{fontSize : '40px'}}>{customer.name}</ListItemText>
                                    <Divider />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box className="right-section" component={Paper} onSubmit={customerAddFormSubmit}>
                        <Box className="left-text">
                            <p className="text-content">Details Panel</p>
                        </Box>  
                        <Box sx={{display : 'flex', flexDirection : 'row', flexWrap : 'wrap', gap : 2, justifyContent : 'center', alignItems : 'center', marginTop : '50px'}}>
                            <TextField
                                sx={{width : '32%'}} 
                                variant="filled" 
                                color="success" 
                                label="Code" 
                                helperText="Enter a Customer Code"
                                value={code}
                                onChange={(ev)=> setCode(ev.target.value)}
                                disabled={inputDisabled}
                            />
                            <TextField
                                sx={{width : '32%'}} 
                                variant="filled" 
                                color="success" 
                                label="Name" 
                                helperText="Enter a Customer Name"
                                value={name}
                                onChange={(ev)=> setName(ev.target.value)}
                                disabled={inputDisabled}
                            />
                            <TextField 
                                sx={{width : '32%'}} 
                                variant="filled" 
                                color="success" 
                                label="Address" 
                                helperText="Enter a Customer Address"
                                value={address}
                                onChange={(ev)=> setAddress(ev.target.value)}
                                disabled={inputDisabled}
                            />
                            <TextField 
                                sx={{width : '32%'}} 
                                variant="filled" 
                                color="success" 
                                label="Reg-title-1" 
                                helperText="Registration Number 1"
                                value={reg_title_1}
                                onChange={(ev)=> setRegTitle1(ev.target.value)} 
                                disabled={inputDisabled}
                            />
                            <TextField 
                                sx={{width : '32%'}} 
                                variant="filled" 
                                color="success" 
                                label="Reg-title-2" 
                                helperText="Registration Number 2"
                                value={reg_title_2}
                                onChange={(ev)=> setRegTitle2(ev.target.value)} 
                                disabled={inputDisabled}
                            />
                            <TextField 
                                sx={{width : '32%'}} 
                                variant="filled" 
                                color="success" 
                                label="Reg-title-3" 
                                helperText="Registration Number 3" 
                                value={reg_title_3}
                                onChange={(ev)=> setRegTitle3(ev.target.value)}
                                disabled={inputDisabled}
                            />
                            <TextField 
                                sx={{width : '32%'}} 
                                variant="filled" 
                                color="success" 
                                label="Contact 1" 
                                helperText="Contact 1" 
                                value={contact_1}
                                onChange={(ev)=> setContact1(ev.target.value)}
                                disabled={inputDisabled}
                            />
                            <TextField 
                                sx={{width : '32%'}} 
                                variant="filled" 
                                color="success" 
                                label="Contact 2" 
                                helperText="Contact 2"
                                value={contact_2}
                                onChange={(ev)=> setContact2(ev.target.value)} 
                                disabled={inputDisabled}
                            />
                            <TextField 
                                sx={{width : '32%'}} 
                                variant="filled" 
                                color="success" 
                                label="Contact 3" 
                                helperText="Contact 3"
                                value={contact_3}
                                onChange={(ev)=> setContact3(ev.target.value)} 
                                disabled={inputDisabled}
                            />
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel>State</InputLabel>
                                <Select 
                                    variant="filled" 
                                    color="secondary"
                                    value={state}
                                    onChange={(ev)=> setState(ev.target.value)}
                                    disabled={inputDisabled}
                                >
                                    {state_data.map((state)=>(
                                        <MenuItem key={state.code} value={state.name}>{state.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Please Select State</FormHelperText>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
            </div>
        </React.Fragment>
    );
}