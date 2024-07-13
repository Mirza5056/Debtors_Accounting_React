import React, { useState } from "react";
import Local from './LocalComponent';
import './styles/invoice.css';
import { Box, Divider, Fab, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBank, faBoxOpen, faCartShopping, faFilePdf, faList, faPrint, faShareFromSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tab, Table } from "react-bootstrap";
import { CalendarPicker, DatePicker } from "@mui/lab";
import { CheckBox } from "@mui/icons-material";
export default function Invoice() {
    const traderDetailsSection=(
        <>
        <b className="traders">Traders Details</b>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>Name</Typography>
            <Typography>Mirza</Typography>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>Address</Typography>
            <Typography>Nagori Mohalla</Typography>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>State</Typography>
            <Typography>Madhya Pradesh</Typography>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>GST NO.</Typography>
            <Typography>SKDSHD323</Typography>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>PIN NO.</Typography>
            <Typography>1343JSDS</Typography>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%'}}>
            <Typography>CIN NO.</Typography>
            <Typography>DSDFBGD984</Typography>
        </Box>
        </>
    );
    const InvoiceDetailsPanel=(
        <>
        <b className="invoice-text"><FontAwesomeIcon icon={faList}/>&nbsp;Invoice Details</b>
        <TextField sx={{width : '400px'}} variant="standard" color="success" label="Enter Customer Name" size="small" helperText="Select name from dropdown" />
        </>
    );
    const [date,setDate]=useState(new Date());
    const InvoiceNumberDate=(
        <>
        <TextField sx={{width : '400px'}} label="Invoice Number" helperText="Please type invoice" size="small" />
        <DatePicker />
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
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <CheckBox color="primary" />
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>HSN Code</TableCell>
                        <TableCell>UOM</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Taxable Amount</TableCell>
                        <TableCell>SGST</TableCell>
                        <TableCell>CGST</TableCell>
                        <TableCell>IGST</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell><CheckBox color="primary" /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
    const BankDetailsSection=(
        <>
        <b className="bank-text"><FontAwesomeIcon icon={faBank} />&nbsp;Bank Details</b>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>Name</Typography>
            <Typography>Mirza</Typography>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>Account Number</Typography>
            <Typography>4344554</Typography>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>IFSC Code</Typography>
            <Typography>SJS89</Typography>
        </Box>
        <Box sx={{display : 'flex',justifyContent : 'space-between',width : '100%',marginTop : '0.9rem'}}>
            <Typography>Branch Name</Typography>
            <Typography>SKS</Typography>
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
                            <Fab size="small"><FontAwesomeIcon icon={faPrint} /></Fab>
                            <Fab size="small"><FontAwesomeIcon icon={faFilePdf} /></Fab>
                            <Fab size="small"><FontAwesomeIcon icon={faShareFromSquare} /></Fab>
                        </Box>
                    </Box>
                    <Box className="trader-detail">
                        {traderDetailsSection}
                    </Box>
                    <Divider/>
                    <Box className="invoice-details">
                        {InvoiceDetailsPanel}
                    </Box>
                    <Box className="rightSideInvoice">
                        {InvoiceNumberDate}
                    </Box>
                    <Box className="items-table">
                        {ItemsTable}
                    </Box>
                    <Box className="bank-details-section">
                        {BankDetailsSection}
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}