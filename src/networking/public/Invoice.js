import React, { useEffect, useState } from "react";
import Local from './LocalComponent';
import './styles/invoice.css';
import { Box, Divider, Fab, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank, faBoxOpen, faCartShopping, faFilePdf, faList, faPrint, faShareFromSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tab, Table } from "react-bootstrap";
import { CheckBox } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchTraders } from "./actions/TraderAction";
export default function Invoice() {
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
    const traderData=useSelector((state)=> state.traders.traderList);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchTraders());
    },[dispatch]);
    const fillTraderForm=()=>{
        traderData.map((trader)=>{
            setName(trader.name);
            setAddress(trader.address);
            setState(trader.state_code);
            setGstNumber(trader.gst_num);
            setPinNumber(trader.reg_title_1);
            setTinNumber(trader.reg_value_1);
            setBankName(trader.bank_custom_name);
            setAccountNumber(trader.account_number);
            setIfscCode(trader.ifsc_code);
            setBranchName(trader.branch_name);
            //alert(JSON.stringify(trader));
        });
    };
    useEffect(()=>{
        fillTraderForm();
    },[traderData]);
    const traderDetailsSection=(
        <>
        <b className="traders">Traders Details</b>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>Name</Typography>
            <b>{name}</b>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>Address</Typography>
            <b>{address}</b>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>State</Typography>
            <b>{state}</b>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>GST NO.</Typography>
            <b>{gstNumber}</b>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>PIN NO.</Typography>
            <b>{pinNumber}</b>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>CIN NO.</Typography>
            <b>{tinNumber}</b>
        </Box>
        </>
    );
    const InvoiceDetailsPanel=(
        <>
        <b className="invoice-text"><FontAwesomeIcon icon={faList}/>&nbsp;Invoice Details</b>
        <TextField sx={{width : '400px',marginLeft : '20px'}} variant="standard" color="success" label="Enter Customer Name" size="small" helperText="Select name from dropdown" focused />
        </>
    );
    const [invoiceDate,setInvoiceDate]=useState(null);
    const InvoiceNumberDate=(
        <>
        <TextField sx={{width : '400px'}} label="Invoice Number" helperText="Please type invoice" size="small" />
        <DatePicker
        selected={invoiceDate}
        onChange={(date)=>setInvoiceDate(date)}
        customInput={
            <TextField 
            sx={{width : '400px',marginTop : '16px'}}
            label='Invoice Date'
            size="small"
            helperText="Please Select Date"
            />
        } />
        </>
    );
    const ItemsTable=(
        <>
        <Box className="item-table-top-section">
           <b className="invoice-text"><FontAwesomeIcon icon={faCartShopping} />&nbsp;Items</b>
           <Box sx={{display : 'flex',justifyContent : 'space-between',width : '8%'}}>
            <Fab size="small" color="primary"><FontAwesomeIcon icon={faBoxOpen} /></Fab>
            <Fab size="small" color="error"><FontAwesomeIcon icon={faTrash} /></Fab>
           </Box>
        </Box>
        </>
    );
    const BankDetailsSection=(
        <>
        <b className="bank-text"><FontAwesomeIcon icon={faBank} />&nbsp;Bank Details</b>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>Name</Typography>
            <b>{bankName}</b>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>Account Number</Typography>
            <b>{accountNumber}</b>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>IFSC Code</Typography>
            <b>{ifscCode}</b>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>Branch Name</Typography>
            <b>{branchName}</b>
        </Box>
        </>
    );
    return (
        <React.Fragment>
            <Local />
            <Box className="invoice-container">
                <Box className="inside-invoice-container" component={Paper}>
                    <Box className="invoice-top-section">
                        <b className="invoice-text">Credit Invoice</b>
                        <Box className="invoice-fonts">
                            <Fab size="small" color="secondary"><FontAwesomeIcon icon={faPrint} /></Fab>
                            <Fab size="small" color="primary"><FontAwesomeIcon icon={faFilePdf} /></Fab>
                            <Fab size="small" color="error"><FontAwesomeIcon icon={faShareFromSquare} /></Fab>
                        </Box>
                    </Box>
                    <Box className="trader-detail">
                        {traderDetailsSection}
                    </Box>
                    <Divider variant="middle" />
                    <Box className="invoice-details">
                        {InvoiceDetailsPanel}
                    </Box>
                    <Box className="rightSideInvoice">
                        {InvoiceNumberDate}
                    </Box>
                    <Divider variant="middle" />
                    <Box className="items-table">
                        {ItemsTable}
                    </Box>
                    <Divider variant="middle" />
                    <Box className="bank-details-section">
                        {BankDetailsSection}
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}