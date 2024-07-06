import React, { useEffect, useState } from "react";
import Local from './LocalComponent';
import './styles/customer.css';
import { Box, Divider, Fab, FormControl, FormHelperText, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, fetchCustomersDetails, fetchStates, selectCustomer } from "./actions/customerActions";

export default function Customer() {
    const dispatch=useDispatch();
    const customers=useSelector((state)=> state.customers.customerList);
    const selectedCustomer=useSelector((state)=> state.customers.selectCustomer);
    const customerDetails=useSelector((state)=> state.customers.customerDetails);
    const state_data=useSelector((state)=> state.states_name.statesList);
    useEffect(()=>{
        dispatch(fetchStates());
        dispatch(fetchCustomers());
    },[dispatch]);
    const handleCustomerClick=(customer)=>{
        dispatch(selectCustomer(customer));
        dispatch(fetchCustomersDetails(customer.code));
    };
    const [state,setState]=React.useState('');
    const stateChanged=(ev)=>{
        setState(ev.target.value);
    }
    useEffect(()=>{
        if(customerDetails) {
            setTextFieldAdd(customerDetails);
        }
    },[customerDetails]);
    const [textFiledAdd,setTextFieldAdd]=useState({
        code : '',
        name : '',
        address : '',
        reg_title_1 : '',
        reg_title_2 : '',        
        reg_title_3 : '',
        contact_1 : '',
        contact_2 : '',
        contact_3 : '',
        state : '',
    });
    const addModuleStarts=()=>{
        setTextFieldAdd({
            code : '',
            name : '',
            address : '',
            reg_title_1 : '',
            reg_title_2 : '',        
            reg_title_3 : '',
            contact_1 : '',
            contact_2 : '',
            contact_3 : '',
            state : '',
        });
    };
    const handleChange=(ev)=>{
        const {name,value}=ev.target;
        setTextFieldAdd((prevValue)=>({
            ...prevValue,
            [name] : value,
        }));
    };
    return (
        <React.Fragment>
            <Local />
            <div className="customer-container">
                <Box className="main-heading">
                    <b className="customer-text">Customer's</b>
                    <Box sx={{display : 'flex',justifyContent : 'space-between',width : '12%'}}>
                        <Fab size="small" onClick={addModuleStarts}><FontAwesomeIcon icon={faUser} /></Fab>
                        <Fab size="small"><FontAwesomeIcon icon={faEdit} /></Fab>
                        <Fab size="small"><FontAwesomeIcon icon={faRemove} /></Fab>
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
                    <Box className="right-section" component={Paper}>
                        <Box className="left-text">
                            <p className="text-content">Details Panel</p>
                        </Box>  
                        {customerDetails && customerDetails.length > 0 ? (
                            customerDetails.map((customerData) => (
                                <Box key={customerData.code} sx={{display : 'flex', flexDirection : 'row', flexWrap : 'wrap', gap : 2, justifyContent : 'center', alignItems : 'center', marginTop : '50px'}}>
                                    <TextField                                     
                                        value={customerData.code}
                                        sx={{width : '32%'}} 
                                        variant="filled" 
                                        color="success" 
                                        label="Code" 
                                        helperText="Enter a Customer Code" 
                                        InputProps={{
                                            readOnly : 'true',
                                        }}    
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        value={customerData.name || ''}
                                        sx={{width : '32%'}} 
                                        variant="filled" 
                                        color="success" 
                                        label="Name" 
                                        helperText="Enter a Customer Name"
                                        InputProps={{
                                            readOnly : 'true',
                                        }}
                                        
                                    />
                                    <TextField 
                                        value={customerData.address || ''}
                                        sx={{width : '32%'}} 
                                        variant="filled" 
                                        color="success" 
                                        label="Address" 
                                        helperText="Enter a Customer Address"InputProps={{
                                            readOnly : 'true',
                                        }} 
                                        
                                    />
                                    <TextField 
                                        value={customerData.reg_title_1 || ''}
                                        sx={{width : '32%'}} 
                                        variant="filled" 
                                        color="success" 
                                        label="Reg-title-1" 
                                        helperText="Registration Number 1" 
                                        InputProps={{
                                            readOnly : 'true',
                                        }}
                                        
                                    />
                                    <TextField 
                                        value={customerData.reg_title_2 || ''}
                                        sx={{width : '32%'}} 
                                        variant="filled" 
                                        color="success" 
                                        label="Reg-title-2" 
                                        helperText="Registration Number 2" 
                                        InputProps={{
                                            readOnly : 'true',
                                        }}
                                        
                                    />
                                    <TextField 
                                        value={customerData.reg_title_3 || ''}
                                        sx={{width : '32%'}} 
                                        variant="filled" 
                                        color="success" 
                                        label="Reg-title-3" 
                                        helperText="Registration Number 3" 
                                        InputProps={{
                                            readOnly : 'true',
                                        }}
                                        
                                    />
                                    <TextField 
                                        value={customerData.contact_1 || ''}
                                        sx={{width : '32%'}} 
                                        variant="filled" 
                                        color="success" 
                                        label="Contact 1" 
                                        helperText="Contact 1" 
                                        InputProps={{
                                            readOnly : 'true',
                                        }}
                                        
                                    />
                                    <TextField 
                                        value={customerData.contact_2 || ''}
                                        sx={{width : '32%'}} 
                                        variant="filled" 
                                        color="success" 
                                        label="Contact 2" 
                                        helperText="Contact 2" 
                                        InputProps={{
                                            readOnly : 'true',
                                        }}
                                        
                                    />
                                    <TextField 
                                        value={customerData.contact_3 || ''}
                                        sx={{width : '32%'}} 
                                        variant="filled" 
                                        color="success" 
                                        label="Contact 3" 
                                        helperText="Contact 3" 
                                        InputProps={{
                                            readOnly : 'true',
                                        }}
                                    />
                                    <FormControl sx={{ m: 1, minWidth: 190 }}>
                                        <InputLabel>State</InputLabel>
                                        <Select 
                                            variant="filled" 
                                            color="secondary"
                                            value={state}
                                            onChange={stateChanged}
                                            InputProps={{
                                                readOnly : 'true',
                                            }}
                                        >
                                            {state_data.map((state)=>(
                                                <MenuItem key={state.code} value={state.name}>{state.name}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>Please Select State</FormHelperText>
                                    </FormControl>
                                </Box>
                            ))
                        ):(
                            <Typography variant="h6" align="center">Select a customer to see details</Typography>
                        )}

                    </Box>
                </Box>
            </div>
        </React.Fragment>
    );
}