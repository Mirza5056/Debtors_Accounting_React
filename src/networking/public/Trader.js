
import React, { useEffect, useState } from "react";
import './styles/traders.css';
import { Box, Button, Card, Divider, Fab, Fade, FormControl, FormGroup, FormHelperText, Grid, Input, InputLabel, List, ListItem, MenuItem, Modal, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, textFieldClasses } from "@mui/material";
import { addTraderData, fetchTraders, setTraderData } from "./actions/TraderAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchStates } from "./actions/customerActions";
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Main from "./Main";
import { CircularProgress, Snackbar, Alert } from '@mui/material';
export default function Trader() {
    const traderData = useSelector((state) => state.traders.traderList);
    const states = useSelector((state) => state.states_name.statesList);
    const [code, setCode] = React.useState('');
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [bankName, setBankName] = React.useState('');
    const [accountNumber, setAccountNumber] = React.useState('');
    const [ifscCode, setIfscCode] = React.useState('');
    const [branchName, setBranchName] = React.useState('');
    const [gstNumber, setGstNumber] = React.useState('');
    const [tinNumber, setTinNumber] = React.useState('');
    const [pinNumber, setPinNumber] = React.useState('');
    const [contact1, setContact1] = React.useState('');
    const [contact2, setContact2] = React.useState('');
    const [contact3, setContact3] = React.useState('');
    const [state, setState] = useState('');
    const [statesData, setStatesData] = useState([]);
    const fillTraderForm = () => {
        traderData.map((trader) => {
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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTraders());
        dispatch(fetchStates());
    }, [dispatch]);
    useEffect(() => {
        if (traderData.length) {
            fillTraderForm();
        }
    }, [traderData]);
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackServertiy, setSnackServertiy] = useState("success");
    const traderFormSubmit = async (ev) => {
        ev.preventDefault();
        setShowSnackbar(false);
        setLoading(true);
        const state_code = traderData.map((state) => ({
            code: state.code
        }));
        const traders = {
            code: code,
            name: name,
            address: address,
            bank_custom_name: bankName,
            account_number: accountNumber,
            ifsc_code: ifscCode,
            branch_name: branchName,
            gst_num: gstNumber,
            reg_title_1: tinNumber,
            reg_value_1: pinNumber,
            contact_1: contact1,
            contact_2: contact2,
            contact_3: contact3,
            state_code: state
        };
        try {
            const response = await dispatch(addTraderData(traders));
            if (!response.success) {
                throw new Error(response.message);
            }
            setSnackServertiy("success");
            //setSnackServertiy("Trader updated successfully!");
        } catch (err) {
            setSnackServertiy("error");
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
            setShowSnackbar(true);
        };
        //alert(JSON.stringify(traders));
        ////const trader_json=JSON.stringify(traders);
        //alert(code+" "+name+" "+address+" "+bankName+" "+ifscCode+" "+accountNumber+" "+branchName+" "+gstNumber+" "+pinNumber+" "+tinNumber+" "+contact1+" "+contact2+" "+contact3+" "+state_code);
    };
    return (
        <React.Fragment>
            <Main>
                <Snackbar
                    sx={{ zIndex: 9999 }}
                    open={showSnackbar}
                    autoHideDuration={10000}
                    onClose={() => setShowSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Alert onClose={() => setShowSnackbar(false)} severity={snackServertiy}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
                {loading && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 9999
                        }}
                    >
                        <CircularProgress />
                    </div>
                )}
                <Box className="trader-container" component="form" onSubmit={traderFormSubmit}>
                    {/* Trader's Details Header */}
                    <Typography variant="h6" className="section-header" sx={{ color: 'var(--text-color)' }}>
                        Trader's Details
                    </Typography>
                    <Box className="trader-details-box">

                        {/* General Info Section */}
                        <Box className="section">
                            <Typography variant="subtitle1" className="section-title">
                                <InfoIcon /> General Info
                            </Typography>
                            <TextField label="Trader ID" variant="outlined" fullWidth margin="dense" value={code}
                                onChange={(ev) => setCode(ev.target.value)} 
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }}
                            />
                            <TextField label="Name" variant="outlined" fullWidth margin="dense" value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                            <TextField label="Address" variant="outlined" fullWidth margin="dense" value={address}
                                onChange={(ev) => setAddress(ev.target.value)} 
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                        </Box>

                        <Divider orientation="vertical" flexItem />

                        {/* Bank Details Section */}
                        <Box className="section">
                            <Typography variant="subtitle1" className="section-title">
                                <AccountCircleIcon /> Bank Details
                            </Typography>
                            <TextField label="Bank Name" variant="outlined" fullWidth margin="dense" value={bankName}
                                onChange={(ev) => setBankName(ev.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                            <TextField label="Account Number" variant="outlined" fullWidth margin="dense" value={accountNumber}
                                onChange={(ev) => setAccountNumber(ev.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                            <TextField label="IFSC Code" variant="outlined" fullWidth margin="dense" value={ifscCode}
                                onChange={(ev) => setIfscCode(ev.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                            <TextField label="Branch" variant="outlined" fullWidth margin="dense" value={branchName}
                                onChange={(ev) => setBranchName(ev.target.value)}sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                        </Box>

                        <Divider orientation="vertical" flexItem />

                        {/* Registration Section */}
                        <Box className="section">
                            <Typography variant="subtitle1" className="section-title">
                                <BusinessIcon /> Registration
                            </Typography>
                            <TextField label="GST" variant="outlined" fullWidth margin="dense" value={gstNumber}
                                onChange={(ev) => setGstNumber(ev.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                            <TextField label="TIN" variant="outlined" fullWidth margin="dense" value={tinNumber}
                                onChange={(ev) => setTinNumber(ev.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                            <TextField label="PIN" variant="outlined" fullWidth margin="dense" value={pinNumber}
                                onChange={(ev) => setPinNumber(ev.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                        </Box>

                        <Divider orientation="vertical" flexItem />

                        {/* Contact Section */}
                        <Box className="section">
                            <Typography variant="subtitle1" className="section-title">
                                <ContactPhoneIcon /> Contact
                            </Typography>
                            <TextField label="Contact 1" variant="outlined" fullWidth margin="dense" value={contact1}
                                onChange={(ev) => setContact1(ev.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                            <TextField label="Contact 2" variant="outlined" fullWidth margin="dense" value={contact2}
                                onChange={(ev) => setContact2(ev.target.value)} 
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }}/>
                            <TextField label="Contact 3" variant="outlined" fullWidth margin="dense" value={contact3}
                                onChange={(ev) => setContact3(ev.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'var(--background-color)',
                                        color : 'var(--text-color)' // Set your desired background color here
                                    }
                                }} />
                            <FormControl fullWidth margin="dense">
                                <InputLabel>State</InputLabel>
                                <Select value={state}
                                    onChange={(ev) => setState(ev.target.value)}>
                                    {states.map((state) => (
                                        <MenuItem sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'var(--background-color)',
                                                color : 'var(--text-color)' // Set your desired background color here
                                            }
                                        }} key={state.code} value={state.code}>{state.name}</MenuItem>
                                    ))}
                                    {/* Add more state codes as needed */}
                                </Select>
                                <FormHelperText>Select State From List.</FormHelperText>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" mt={3}>
                        <Button variant="contained" color="primary" type="submit">
                            Update
                        </Button>
                    </Box>
                </Box>
            </Main>
        </React.Fragment>
    );
}