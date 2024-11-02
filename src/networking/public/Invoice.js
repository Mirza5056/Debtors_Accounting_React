import React, { useEffect, useState } from "react";
import './styles/invoice.css';
import { Download, Share, Delete, Add, Search, ReceiptLong, MonetizationOn, LocalShipping, Percent } from '@mui/icons-material';
import { Backdrop, Box, Button, Card, Divider, Fab, Fade, IconButton, InputBase, List, ListItem, ListItemText, MenuItem, MenuList, Modal, Paper, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from
    "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack, Tab, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTraders } from "./actions/TraderAction";
import Main from "./Main";
import { fetchCustomers, fetchCustomersDetails, setCustomerDetails } from "./actions/customerActions";
import { fetchItemsData, fetchItemsDetails, setItemDetails } from "./actions/ItemActions";
export default function Invoice() {
    {/* Setting traders details using useState */ }
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
    {/* Setting traders details ends here. */ }
    {/* Fetching traders details  */ }
    const fillTraderForm = () => {
        traderData.map((trader) => {
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
            setValue1(trader.state_code);
            setContact1(trader.contact_1);
            setContact2(trader.contact_2);
            setContact3(trader.contact_3);
        });
    };
    {/* ends here.. */ }
    {/* Fetching customers and traders details using redux. */ }
    const dispatch = useDispatch();
    const traderData = useSelector((state) => state.traders.traderList);
    const customerDetails = useSelector((state) => state.customers.customerDetails);
    const itemsDetails = useSelector((state) => state.items.itemsDetails);
    useEffect(() => {
        dispatch(fetchTraders());
        dispatch(fetchItemsData());
        dispatch(fetchCustomers());
    }, [dispatch], [traderData]);
    {/* Fetching customers and traders details using redux. */ }


    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const isSame = value1 === value2; // comparing traders and customer state for calculating igst,cgst,sgst..    


    useEffect(() => {
        fillTraderForm();
    }, [traderData]);
    {/* Setting rate,quantity,uom int table section... */ }
    const [rate, setRate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [itemsData, setItemsData] = useState([{ hsn_code: '', cgst: '', igst: '', unitOfMeasurements: '' }]);
    const handleInputChange = (index, field, value) => {
        const updatedItems = [...itemsDetails];
        updatedItems[index][field] = value;
        setItemsData(updatedItems);
    };
    {/* It have been ends here. */ }


    {/* Customer name search and place their details. */ }
    const customers = useSelector((state) => state.customers.customerList) || [];
    const [searchName, setSearchName] = useState('');
    const filteredName = searchName ? customers.filter(customer =>
        customer.name.toLowerCase().includes(searchName.toLowerCase())
    ) : customers;
    const [customerClick, setCustomerClick] = useState(false);
    const [showCustomerList, setShowCustomerList] = useState(false);

    const selectCustomer = (customer) => {
        dispatch(setCustomerDetails(customer));
        dispatch(fetchCustomersDetails(customer.code));
        setSearchName(customer.name);
        setValue2(customer.state_code);
        setCustomerClick(true);
        setShowCustomerList(false);
    };
    {/* Customer name search and place their details ends here */ }

    {/* Add Modal Open and Close code.. */ }
    const [addModal, setAddModal] = useState(false);
    const handleButtonClicked = () => { setAddModal(true); };
    const addModalClose = () => {
        setAddModal(false);
        clearField();
    };
    {/* Ends Here.. */ }

    {/* Table Functionalites Start Here */ }
    {/* Items Select add Button Click to add in table code here.. */ }
    const items_data = useSelector((state) => state.items.itemsList);
    const [showItemList, setShowItemList] = useState(false);
    const [searchItemName, setSearchItemName] = useState('');
    const [selectedName, setSelectedName] = useState(null);
    const filteredItemName = searchItemName ?
        items_data.filter(item => item.name.toLowerCase().includes(searchItemName.toLowerCase())
        ) : items_data;
    const selectedItemName = (item) => {
        dispatch(setItemDetails(item));
        dispatch(fetchItemsDetails(item.code));
        setSearchItemName(item.name);
        setShowItemList(false);
    }
    const addButtonClicked = () => {
        const newItem = {
            ...itemsDetails[0],
            rate: parseFloat(rate),
            quantity: parseFloat(quantity),
            selectedUOM
        };
        alert(selectedUOM);
        setAddModal(false);
        setTableData([...tableData, newItem]);
        clearField();
    };
    {/* Items Select add Button Click to add in table code here.. */ }
    {/* Search Item name clear fields code here... */ }
    const [tableData, setTableData] = useState([]);
    const clearField = () => {
        setSearchItemName('');
        setRate('');
        setQuantity('');
    }
    {/* Search Item name clear fields code here... */ }
    {/* Select UOM Code.. */ }
    const [selectedUOM, setSelectedUOM] = useState(Array(items_data.length).fill(''));
    const handleUOMChange = (index, ev) => {
        const updateUOM = [...selectedUOM];
        updateUOM[index] = ev.target.value;
        setSelectedUOM(updateUOM);
    }
    {/* Select UOM Code.. */ }
    {/* Table IGST,Amount Calulate Code... */ }
    const calculateAmount = (item) => {
        const baseAmount = item.rate * item.quantity;
        let cgstAmount = 0, igstAmount = 0, sgstAmount = 0;
        if (isSame) {
            cgstAmount = (baseAmount * item.cgst) / 100;
            sgstAmount = (baseAmount * item.sgst) / 100;
        } else {
            igstAmount = (baseAmount * item.igst) / 100;
        }
        return {
            baseAmount: baseAmount.toFixed(2),
            igstAmount: igstAmount.toFixed(2),
            sgstAmount: sgstAmount.toFixed(2),
            cgstAmount: cgstAmount.toFixed(2),
            totalAmount: (baseAmount + igstAmount + cgstAmount + sgstAmount).toFixed(2)
        };
    };
    const totalAmount = tableData.reduce((acc, item) => acc + parseFloat(calculateAmount(item).totalAmount), 0).toFixed(2);
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    useEffect(() => {
        const generateInvoiceNumber = () => `INV${Math.floor(100000 + Math.random() * 900000)}`;
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours} : ${minutes}`;
        }
        setInvoiceNumber(generateInvoiceNumber());
        setInvoiceDate(formatDate(new Date()));
    }, []);
    {/* Table IGST,Amount Calulate Code... */ }
    const [checkedItems, setCheckedItems] = useState(new Array(tableData.length).fill(false));
    const [isSelectAll, setIsSelectAll] = useState(false);
    const handleCheckbox = (index) => {
        const updateCheckboxItems = [...checkedItems];
        updateCheckboxItems[index] = !updateCheckboxItems[index];
        setCheckedItems(updateCheckboxItems);
        setIsSelectAll(updateCheckboxItems.every(item => item));
    }
    const handleSelectAllChange = () => {
        const newSelectAll = !isSelectAll;
        setIsSelectAll(newSelectAll);
        setCheckedItems(new Array(tableData.length).fill(newSelectAll));
    };
    {/* Ends Here */ }
    {/* Invoice Item Select Add Modal */ }
    const InvoiceAddModal = (
        <>
            <Modal open={addModal}
                aria-labelledby="add-modal-title"
                aria-describedby="add-modal-description"
                onClose={addModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={addModal}>
                    <Box component="form" className="addModalStyle">
                        <Typography variant="h6" className="addModalText" sx={{color :'var(--text-color)'}}>Items Details</Typography>
                        {/* Search Bar with Search Icon */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <TextField
                                label="Search Item"
                                size="small"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <Search fontSize="small" />
                                }}
                                value={searchItemName}
                                onChange={(ev) => {
                                    setSearchItemName(ev.target.value);
                                    setShowItemList(true);
                                }}
                                sx={{ flexGrow: 1 }}
                            />
                        </Box>
                        {showItemList && (
                            <List className="list-bar">
                                {filteredItemName.length > 0 ? (
                                    filteredItemName.map(item => (
                                        <ListItem key={item.code} divider className="list-item">
                                            <ListItemText sx={{color : 'var(--text-color)'}} primary={item.name} onClick={() => selectedItemName(item)} />
                                        </ListItem>
                                    ))
                                ) : (
                                    <helperText color="textSecondary">Search Item Name and Select...</helperText>
                                )}
                            </List>
                        )}


                        {itemsDetails && itemsDetails.length > 0 ? (
                            itemsDetails.map((item, index) => (
                                <>
                                    {/* Tax Fields with Icons */}
                                    <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                                        <TextField
                                            label="HSN code"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            value={item.hsn_code}
                                            onChange={(ev) => handleInputChange(index, 'hsn_code', ev.target.value)}
                                            InputProps={{
                                                startAdornment: <Percent fontSize="small" />
                                            }}
                                            sx={{ flex: 1 }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                                        <TextField
                                            label="IGST"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            value={item.igst}
                                            onChange={(ev) => handleInputChange(index, 'igst', ev.target.value)}
                                            InputProps={{
                                                startAdornment: <Percent fontSize="small" />
                                            }}
                                            sx={{ flex: 1 }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                                        <TextField
                                            label="CGST"
                                            size="small"
                                            variant="outlined"
                                            value={item.cgst}
                                            onChange={(ev) => handleInputChange(index, 'cgst', ev.target.value)}
                                            InputProps={{
                                                startAdornment: <Percent fontSize="small" />
                                            }}
                                            sx={{ flex: 1 }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                                        <TextField
                                            label="SGST"
                                            size="small"
                                            variant="outlined"
                                            value={item.sgst}
                                            onChange={(ev) => handleInputChange(index, 'sgst', ev.target.value)}
                                            InputProps={{
                                                startAdornment: <Percent fontSize="small" />
                                            }}
                                            sx={{ flex: 1 }}
                                        />
                                    </Box>

                                    {/* Rate and UOM Fields with Icons */}
                                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                        <TextField
                                            label="Rate"
                                            size="small"
                                            type="number"
                                            value={rate}
                                            onChange={(ev) => setRate(ev.target.value)}
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: <MonetizationOn fontSize="small" />
                                            }}
                                            sx={{ flex: 1 }}
                                        />
                                        <TextField
                                            label="Quantity"
                                            size="small"
                                            type="number"
                                            value={quantity}
                                            onChange={(ev) => setQuantity(ev.target.value)}
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: <MonetizationOn fontSize="small" />
                                            }}
                                            sx={{ flex: 1 }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                                        <TextField
                                            select
                                            value={selectedUOM[index]}
                                            onChange={(ev) => handleUOMChange(index, ev)}
                                            label="UOM"
                                            size="small"
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: <span role="img" aria-label="uom-icon">⚖️</span>
                                            }}
                                            sx={{ flex: 1 }}
                                        >
                                            {item.unitOfMeasurements.map((uom, idx) => (
                                                <MenuItem key={idx} value={uom.trim()}>
                                                    {uom.trim()}
                                                </MenuItem>
                                            ))}
                                            {/* Add more options as needed */}
                                        </TextField>
                                    </Box>
                                </>
                            ))) : (
                            <b></b>
                        )}
                        {/* Items Select Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'right', mt: 3 }}>
                            <Button variant="contained" onClick={addButtonClicked} sx={{ mr: 2 }}>Add</Button>
                            <Button variant="contained" onClick={addModalClose}>Cancel</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
    {/* Invoice Item Add Modal */ }
    return (
        <React.Fragment>
            <Main>
                {InvoiceAddModal}
                <Box p={3} bgcolor="#ffffff" borderRadius={2} boxShadow={3} sx={{ marginTop: '3cm', backgroundColor: 'var(--background-color)', transition: 'background-color 0.3s, color 0.3s' }} >
                    {/* Top Section: Credit Invoice, Download and Share Icons */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" fontWeight="bold">Credit Invoice</Typography>
                        <Box>
                            <IconButton color="primary">
                                <Download />
                            </IconButton>
                            <IconButton color="primary">
                                <Share />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Trader Details Section */}
                    <Box mb={2}>
                        <Typography variant="h6" color="primary" fontWeight="bold">Trader Details</Typography>
                        <Typography>Name: {name}</Typography>
                        <Typography>Address: {address}</Typography>
                        <Typography>GST Number: {gstNumber || 'No records'}</Typography>
                        <Typography>PIN Number: {pinNumber || 'No records'}</Typography>
                        <Typography>TIN Number: {tinNumber || 'No records'}</Typography>
                        <Typography>Contact 1: {contact1 || 'No records'}</Typography>
                        <Typography>Contact 2: {contact2 || 'No records'}</Typography>
                        <Typography>Contact 3: {contact3 || 'No records'}</Typography>
                        <Typography>State: {state}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" flexDirection="column" mb={2}>
                        {/* Invoice Details Header */}
                        <Typography variant="h6" color="primary" fontWeight="bold" mb={1}>
                            Invoice Details
                        </Typography>

                        {/* Search Field below Invoice Details */}
                        <Box className="search-bar">
                            <IconButton sx={{ color: 'var(--text-color)' }}><SearchIcon /></IconButton>
                            <InputBase type="text" placeholder="Search Customer Name..." value={searchName}
                                onChange={(ev) => {
                                    setSearchName(ev.target.value);
                                    setSelectedName(null);
                                    setShowCustomerList(true);
                                }}
                                sx={{
                                    flex: 1,
                                    padding: '0.1rem 0.9rem',
                                    border: 'none',
                                    outline: 'none'
                                }}
                            />
                        </Box>

                        {showCustomerList && (
                            <List className="list-bar-customer">
                                {filteredName.length > 0 ? (
                                    filteredName.map(customer => (
                                        <ListItem key={customer.code} divider className="list-item">
                                            <ListItemText primary={customer.name} onClick={() => selectCustomer(customer)} />
                                        </ListItem>
                                    ))
                                ) : (
                                    <Typography color="textSecondary">Search Customer Name and Select...</Typography>
                                )}
                            </List>
                        )}

                        {customerClick && customerDetails.length > 0 && customerDetails.map((customer) => (
                            <Box key={customer.code} className="customer-details-box">
                                <Typography variant="h6">Customer Details</Typography>
                                <div className="detail-item">
                                    <Typography>Name:</Typography>
                                    <Typography>{customer.name || "no data available"}</Typography>
                                </div>
                                <div className="detail-item">
                                    <Typography>Address:</Typography>
                                    <Typography>{customer.address || "no data available"}</Typography>
                                </div>
                                <div className="divider" />
                                <div className="detail-item">
                                    <Typography>Reg Title 1:</Typography>
                                    <Typography>{customer.reg_title_1 || "no data available"}</Typography>
                                </div>
                                <div className="detail-item">
                                    <Typography>Reg Title 2:</Typography>
                                    <Typography>{customer.reg_title_2 || "no data available"}</Typography>
                                </div>
                                <div className="detail-item">
                                    <Typography>Reg Title 3:</Typography>
                                    <Typography>{customer.reg_title_3 || "no data available"}</Typography>
                                </div>
                                <div className="divider" />
                                <div className="detail-item">
                                    <Typography>Reg Value 1:</Typography>
                                    <Typography>{customer.reg_value_1 || "no data available"}</Typography>
                                </div>
                                <div className="detail-item">
                                    <Typography>Reg Value 2:</Typography>
                                    <Typography>{customer.reg_value_2 || "no data available"}</Typography>
                                </div>
                                <div className="detail-item">
                                    <Typography>Reg Value 3:</Typography>
                                    <Typography>{customer.reg_value_3 || "no data available"}</Typography>
                                </div>
                                <div className="divider" />
                                <div className="detail-item">
                                    <Typography>Contact 1:</Typography>
                                    <Typography>{customer.contact_1 || "no data available"}</Typography>
                                </div>
                                <div className="detail-item">
                                    <Typography>Contact 2:</Typography>
                                    <Typography>{customer.contact_2 || "no data available"}</Typography>
                                </div>
                                <div className="detail-item">
                                    <Typography>Contact 3:</Typography>
                                    <Typography>{customer.contact_3 || "no data available"}</Typography>
                                </div>
                                <div className="divider" />
                                <div className="detail-item">
                                    <Typography>State:</Typography>
                                    <Typography>{customer.state_code || "no data available"}</Typography>
                                </div>
                            </Box>
                        ))}
                        {/* Invoice Number and Date Fields in a Column on the Right */}
                        <Box display="flex" justifyContent="flex-end">
                            <Box display="flex" flexDirection="column" alignItems="flex-start" maxWidth={300}>
                                <TextField
                                    label="Invoice Number"
                                    size="small"
                                    value={invoiceNumber}
                                    variant="outlined"
                                    sx={{ mb: 2, width: "100%",backgroundColor: 'var(--background-color)',color:'var(--text-color)' }}
                                />
                                <TextField
                                    label="Invoice Date"
                                    size="small"
                                    value={invoiceDate}
                                    variant="outlined"
                                    sx={{ width: "100%",backgroundColor: 'var(--background-color)',color:'var(--text-color)'}}
                                />
                            </Box>
                        </Box>
                    </Box>


                    <Divider sx={{ my: 2 }} />

                    {/* Items Section */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" color="primary" fontWeight="bold" display="flex" alignItems="center">
                            <ReceiptLong fontSize="small" sx={{ mr: 1 }} /> Items
                        </Typography>
                        <Stack direction="row">
                            <IconButton color="primary">
                                <Add onClick={handleButtonClicked} />
                            </IconButton>
                            <IconButton color="error">
                                <Delete />
                            </IconButton>
                        </Stack>
                    </Box>

                    {/* Items Table */}
                    <TableContainer component={Paper} sx={{ mb: 2,backgroundColor: 'var(--background-color)', transition: 'background-color 0.3s, color 0.3s' }}>
                        <Table className="items-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <input type="checkbox" checked={isSelectAll} onChange={handleSelectAllChange} />
                                    </TableCell>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>HSNCODE</TableCell>
                                    <TableCell>UOM</TableCell>
                                    <TableCell>IGST</TableCell>
                                    <TableCell>CGST</TableCell>
                                    <TableCell>SGST</TableCell>
                                    <TableCell>Rate</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((item, index) => {
                                    const { baseAmount, igstAmount, cgstAmount, sgstAmount, totalAmount } = calculateAmount(item);
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <input type="checkbox" onChange={() => handleCheckbox(index)} checked={checkedItems[index]} />
                                            </TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{index + 1}</TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{item.name || 'Item Name'}</TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{item.hsn_code}</TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{selectedUOM}</TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{isSame ? '0.00' : igstAmount}</TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{isSame ? cgstAmount : '0.00'}</TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{isSame ? sgstAmount : '0.00'}</TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{item.rate.toFixed(2)}</TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{item.quantity}</TableCell>
                                            <TableCell sx={{color : 'var(--text-color)'}}>{totalAmount}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow sx={{backgroundColor: 'var(--background-color)', transition: 'background-color 0.3s, color 0.3s'}}>
                                    <TableCell sx={{color : 'var(--text-color)'}} colSpan={10} align="right">Total</TableCell>
                                    <TableCell sx={{color : 'var(--text-color)'}}>{totalAmount}</TableCell>
                                </TableRow>
                                <TableRow sx={{backgroundColor: 'var(--background-color)', transition: 'background-color 0.3s, color 0.3s'}}>
                                    <TableCell sx={{color :'var(--text-color)'}} colSpan={10} align="right">Round Off</TableCell>
                                    <TableCell sx={{color :'var(--text-color)'}}>{totalAmount}</TableCell>
                                </TableRow>
                                {/* Additional rows can be added here */}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Divider sx={{ my: 2 }} />

                    {/* Bank Details Section */}
                    <Box>
                        <Typography variant="h6" color="primary" fontWeight="bold">Bank Details</Typography>
                        <Typography>Bank Name : {bankName}</Typography>
                        <Typography>Account Number: {accountNumber}</Typography>
                        <Typography>IFSC Code: {ifscCode}</Typography>
                        <Typography>Branch Name: {branchName}</Typography>
                    </Box>
                </Box>
            </Main>
        </React.Fragment>
    );
}