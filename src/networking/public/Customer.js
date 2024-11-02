import React, { useEffect, useState } from "react";
import './styles/customer.css';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Divider, Fab, FormControl, FormHelperText, IconButton, InputBase, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCustomerData, deleteCustomerData, editCustomerData, fetchCustomers, fetchCustomersDetails, fetchStates, selectCustomer } from "./actions/customerActions";
import Main from "./Main";
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

export default function Customer() {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customers.customerList);
    const selectedCustomer = useSelector((state) => state.customers.selectCustomer);
    const customerDetails = useSelector((state) => state.customers.customerDetails);
    const state_data = useSelector((state) => state.states_name.statesList);
    const [state, setState] = React.useState('');
    const [code, setCode] = React.useState('');
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [reg_title_1, setRegTitle1] = React.useState('');
    const [reg_value_1, setRegValue1] = React.useState('');
    const [reg_title_2, setRegTitle2] = React.useState('');
    const [reg_value_2, setRegValue2] = React.useState('');
    const [reg_title_3, setRegTitle3] = React.useState('');
    const [reg_value_3, setRegValue3] = React.useState('');
    const [contact_1, setContact1] = React.useState('');
    const [contact_2, setContact2] = React.useState('');
    const [contact_3, setContact3] = React.useState('');
    useEffect(() => {
        dispatch(fetchStates());
        dispatch(fetchCustomers());
    }, [dispatch]);
    const handleCustomerClick = (customer) => {
        dispatch(selectCustomer(customer));
        dispatch(fetchCustomersDetails(customer.code));
    };
    const cancelAddButtonClicked = () => {
        setAddModule(false);
    };
    const [addModule, setAddModule] = useState(false);
    const [editModule, setEditModule] = useState(false);
    const [deleteModule, setDeleteModule] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [currentEditCustomer, setCurrentEditCustomer] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackServertiy, setSnackServertiy] = useState("success");
    const addCustomerButtonClicked = () => { setAddModule(true); };
    const editCustomerButtonClicked = () => {
        setEditModule(true);
        customerDetails.map((customer) => {
            setCode(customer.code);
            setName(customer.name);
            setAddress(customer.address);
            setRegTitle1(customer.reg_title_1);
            setRegValue1(customer.reg_value_1);
            setRegTitle2(customer.reg_title_2);
            setRegValue2(customer.reg_value_2);
            setRegTitle3(customer.reg_title_3);
            setRegValue3(customer.reg_value_3);
            setContact1(customer.contact_1);
            setContact2(customer.contact_2);
            setContact3(customer.contact_3);
            setState(customer.state_code);
        })
    };
    const resetForm = () => {
        setCode("");
        setName("");
        setEditModule(false);
        setCurrentEditCustomer(null);
    };
    const cancelDeleteForm = () => { setDeleteModule(false); }
    const deleteCustomerButtonClicked = () => {
        setDeleteModule(true);
        customerDetails.map((customer) => {
            setCode(customer.code);
            setName(customer.name);
        })
    };
    const addModuleSubmit = async (ev) => {
        ev.preventDefault();
        const customers = {
            code: code,
            name: name,
            address: address,
            reg_title_1: reg_title_1,
            reg_value_1: reg_value_1,
            reg_title_2: reg_title_2,
            reg_value_2: reg_value_2,
            reg_title_3: reg_title_3,
            reg_value_3: reg_value_3,
            contact_1: contact_1,
            contact_2: contact_2,
            contact_3: contact_3,
            state_code: state
        };
        try {
            const response = await dispatch(addCustomerData(customers));
            if (!response.success) {
                throw new Error(response.message);
            }
            setSnackServertiy("success");
            setSnackServertiy("Trader updated successfully!");
        } catch (err) {
            setSnackServertiy("error");
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
            setShowSnackbar(true);
        };
        alert(JSON.stringify(customers));
    };
    const editModuleSubmit = async (ev) => {
        ev.preventDefault();
        const customers = {
            code: code,
            name: name,
            address: address,
            reg_title_1: reg_title_1,
            reg_value_1: reg_value_1,
            reg_title_2: reg_title_2,
            reg_value_2: reg_value_2,
            reg_title_3: reg_title_3,
            reg_value_3: reg_value_3,
            contact_1: contact_1,
            contact_2: contact_2,
            contact_3: contact_3,
            state_code: state
        };
        try {
            const response = await dispatch(editCustomerData(customers));
            if (!response.success) {
                throw new Error(response.message);
            }
            setSnackServertiy("success");
            setSnackServertiy("Trader updated successfully!");
            resetForm();
        } catch (err) {
            setSnackServertiy("error");
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
            setShowSnackbar(true);
        };
    };
    const deleteModuleSubmit = async (ev) => {
        ev.preventDefault();
        const customers = { code: code };
        //alert(JSON.stringify(customers));
        try {
            const response = await dispatch(deleteCustomerData(customers));
            if (!response.success) {
                throw new Error(response.message);
            }
            setSnackServertiy("success");
            setSnackServertiy("Customer deleted successfully!");
            //resetForm();
        } catch (err) {
            setSnackServertiy("error");
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
            setShowSnackbar(true);
        };
    };
    const [showCustomer, setShowCustomer] = useState(false);
    const [searchName, setSearchName] = useState("");
    const searchInputChange = (ev) => {
        setSearchName(ev.target.value);
        setShowCustomer(true);
    };
    //const filteredData = searchName !== '' ?
    //    customers.filter((customer) => customer.name === searchName) : customers;
    const filteredData = searchName !== ''
        ? [
            ...customers.filter((customer) => customer.name.toLowerCase().includes(searchName.toLowerCase())),
            ...customers.filter((customer) => !customer.name.toLowerCase().includes(searchName.toLowerCase()))
        ]
        : customers;
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
                <Box display="flex" flexDirection="column" alignItems="flex-start" p={4} className="main-container">
                    <Box className="search-bar" display="flex" alignItems="center" mb={1} sx={{
                        width: '100%',
                        maxWidth: '1200px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '0.1rem',
                    }}>
                        <IconButton><SearchIcon /></IconButton>
                        <InputBase type="text" placeholder="Search Using Customer Name..." value={searchName} onChange={searchInputChange}
                            sx={{
                                flex: 1,
                                padding: '0.2rem 0.5rem',
                                border: 'none',
                                outline: 'none',
                                color :'var(--text-color)'
                            }} />
                    </Box>
                    {/* Left side - Customer List */}
                    <Box display="flex" flexDirection="row" width="100%" gap={2}>
                        <Paper elevation={3} className="customer-list-container" sx={{backgroundColor : 'var(--background-color)'}}>
                            <Typography variant="h6" className="header-text">Customer Details</Typography>
                            <Box className="customer-list">
                                {filteredData.map((customer) => {
                                    const isMatch = customer.name.toLowerCase().includes(searchName.toLowerCase());
                                    return (
                                        <Typography
                                            key={customer.code}
                                            className="customer-name"
                                            onClick={() => handleCustomerClick(customer)}
                                            sx={{
                                                backgroundColor: isMatch ? '#fffff' : 'transparent', // Highlight matching names
                                                fontWeight: isMatch ? 'bold' : 'normal',
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                marginBottom: '0.5rem'
                                            }}
                                        >
                                            {customer.name}
                                        </Typography>
                                    );
                                })}
                            </Box>
                        </Paper>

                        {/* Right side - Selected Customer Details */}
                        <Paper elevation={3} className="customer-details-container" sx={{backgroundColor : 'var(--background-color)',color :'var(--text-color)'}}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" className="header-text">General Info</Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary">
                                        <Add onClick={addCustomerButtonClicked} />
                                    </IconButton>
                                    <IconButton color="primary">
                                        <Edit onClick={editCustomerButtonClicked} />
                                    </IconButton>
                                    <IconButton color="secondary">
                                        <Delete onClick={deleteCustomerButtonClicked} />
                                    </IconButton>
                                </Stack>
                            </Box>

                            <Divider sx={{ my: 2 }} />
                            <Box className="details-content">
                                {addModule ? (
                                    /* Add Module form */
                                    <Box className="section" component="form" onSubmit={addModuleSubmit}>
                                        <Typography variant="subtitle1" className="section-title">Add Module</Typography>
                                        <TextField label="Customer Code" variant="outlined" fullWidth value={code} onChange={(ev) => setCode(ev.target.value)} />
                                        <TextField label="Name" variant="outlined" fullWidth value={name} onChange={(ev) => setName(ev.target.value)} />
                                        <TextField label="Address" variant="outlined" fullWidth value={address} onChange={(ev) => setAddress(ev.target.value)} />
                                        <TextField label="Registration Title 1" variant="outlined" value={reg_title_1} onChange={(ev) => setRegTitle1(ev.target.value)} />
                                        <TextField label="Registration Value 1" variant="outlined" fullWidth value={reg_value_1} onChange={(ev) => setRegValue1(ev.target.value)} />
                                        <TextField label="Registration Title 2" variant="outlined" value={reg_title_2} onChange={(ev) => setRegTitle2(ev.target.value)} />
                                        <TextField label="Registration Value 2" variant="outlined" fullWidth value={reg_value_2} onChange={(ev) => setRegValue2(ev.target.value)} />
                                        <TextField label="Registration Title 3" variant="outlined" fullWidth value={reg_title_3} onChange={(ev) => setRegTitle3(ev.target.value)} />
                                        <TextField label="Registration Value 3" variant="outlined" fullWidth value={reg_value_3} onChange={(ev) => setRegValue3(ev.target.value)} />
                                        <TextField label="Contact 1" variant="outlined" fullWidth value={contact_1} onChange={(ev) => setContact1(ev.target.value)} />
                                        <TextField label="Contact 2" variant="outlined" fullWidth value={contact_2} onChange={(ev) => setContact2(ev.target.value)} />
                                        <TextField label="Contact 3" variant="outlined" fullWidth value={contact_3} onChange={(ev) => setContact3(ev.target.value)} />
                                        <FormControl fullWidth>
                                            <InputLabel>State</InputLabel>
                                            <Select value={state} onChange={(ev) => setState(ev.target.value)}>
                                                {state_data.map((state) => (
                                                    <MenuItem key={state.code} value={state.code}>{state.name}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>Select State From List.</FormHelperText>
                                        </FormControl>
                                        <Box display="flex" justifyContent="flex-end" mt={3}>
                                            <Button variant="contained" color="primary" type="submit">Update</Button>
                                            <Button variant="secondary" color="primary" onClick={cancelAddButtonClicked}>Cancel</Button>
                                        </Box>
                                    </Box>
                                ) : editModule ? (
                                    /* Edit Module. */
                                    <Box className="section" component="form" onSubmit={editModuleSubmit}>
                                        <Typography variant="subtitle1" className="section-title">Edit Module</Typography>
                                        <TextField label="Customer Code" variant="outlined" fullWidth value={code} onChange={(ev) => setCode(ev.target.value)} />
                                        <TextField label="Name" variant="outlined" fullWidth value={name} onChange={(ev) => setName(ev.target.value)} />
                                        <TextField label="Address" variant="outlined" fullWidth value={address} onChange={(ev) => setAddress(ev.target.value)} />
                                        <TextField label="Registration Title 1" variant="outlined" value={reg_title_1} onChange={(ev) => setRegTitle1(ev.target.value)} />
                                        <TextField label="Registration Value 1" variant="outlined" fullWidth value={reg_value_1} onChange={(ev) => setRegValue1(ev.target.value)} />
                                        <TextField label="Registration Title 2" variant="outlined" value={reg_title_2} onChange={(ev) => setRegTitle2(ev.target.value)} />
                                        <TextField label="Registration Value 2" variant="outlined" fullWidth value={reg_value_2} onChange={(ev) => setRegValue2(ev.target.value)} />
                                        <TextField label="Registration Title 3" variant="outlined" fullWidth value={reg_title_3} onChange={(ev) => setRegTitle3(ev.target.value)} />
                                        <TextField label="Registration Value 3" variant="outlined" fullWidth value={reg_value_3} onChange={(ev) => setRegValue3(ev.target.value)} />
                                        <TextField label="Contact 1" variant="outlined" fullWidth value={contact_1} onChange={(ev) => setContact1(ev.target.value)} />
                                        <TextField label="Contact 2" variant="outlined" fullWidth value={contact_2} onChange={(ev) => setContact2(ev.target.value)} />
                                        <TextField label="Contact 3" variant="outlined" fullWidth value={contact_3} onChange={(ev) => setContact3(ev.target.value)} />
                                        <FormControl fullWidth>
                                            <InputLabel>State</InputLabel>
                                            <Select value={state} onChange={(ev) => setState(ev.target.value)}>
                                                {state_data.map((state) => (
                                                    <MenuItem key={state.code} value={state.code}>{state.name}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>Select State From List.</FormHelperText>
                                        </FormControl>
                                        <Box display="flex" justifyContent="flex-end" mt={3}>
                                            <Button variant="contained" color="primary" type="submit">
                                                Update
                                            </Button>
                                            <Button variant="secondary" color="primary" onClick={resetForm}>
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Box>
                                    /* Edit Module Ends Here. */
                                    /* Customer Details */
                                ) : deleteModule ? (
                                    <Box className="section" component="form" onSubmit={deleteModuleSubmit}>
                                        <Typography>{code}&nbsp;&nbsp;{name}</Typography>
                                        <Box display="flex" justifyContent="flex-end" mt={3}>
                                            <Button variant="contained" color="primary" type="submit">
                                                Delete
                                            </Button>
                                            <Button variant="secondary" color="primary" onClick={cancelDeleteForm}>
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (customerDetails && customerDetails.length > 0 ? (
                                    customerDetails.map((item) => (
                                        <Box key={item.code}>
                                            <Typography variant="body1"><strong>Code:</strong> {item.code}</Typography>
                                            <Typography variant="body1"><strong>Address:</strong> {item.address}</Typography>
                                            <Typography variant="body1"><strong>Registration Title 1:</strong> {item.reg_title_1 || "No record."}</Typography>
                                            <Typography variant="body1"><strong>Registration Value 1:</strong> {item.reg_value_1 || "No record."}</Typography>
                                            <Typography variant="body1"><strong>Registration Title 2:</strong> {item.reg_title_2 || "No record."}</Typography>
                                            <Typography variant="body1"><strong>Registration Value 2:</strong> {item.reg_value_2 || "No record."}</Typography>
                                            <Typography variant="body1"><strong>Registration Title 3:</strong> {item.reg_title_3 || "No record."}</Typography>
                                            <Typography variant="body1"><strong>Registration Value 3:</strong> {item.reg_value_3 || "No record."}</Typography>
                                            <Typography variant="body1"><strong>Contact 1:</strong> {item.contact_1 || "No record."}</Typography>
                                            <Typography variant="body1"><strong>Contact 2:</strong> {item.contact_2 || "No record."}</Typography>
                                            <Typography variant="body1"><strong>Contact 3:</strong> {item.contact_3 || "No record."}</Typography>
                                            <Typography variant="body1"><strong>State Name:</strong> {item.state_code}</Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="body2" color="var(--text-color)" className="placeholder-text">
                                        Select a customer to view details.
                                    </Typography>
                                )
                                )}
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Main>
        </React.Fragment>
    );
}