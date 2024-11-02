import Main from "./Main";
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { addItemData, fetchItemsData, fetchItemsDetails, setItemDetails } from "./actions/ItemActions";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, Box, Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, List, ListItem, Modal, Fade, Backdrop, Card, ListItemText, Typography, InputBase, Alert, Snackbar } from "@mui/material";
const Items = () => {
    const dispatch = useDispatch();
    const items_data = useSelector((state) => state.items.itemsList);
    useEffect(() => {
        dispatch(fetchItemsData());
    }, [dispatch]);
    const itemsDetails = useSelector((state) => state.items.itemsDetails);
    const itemRowButtonGotClicked = (item) => {
        dispatch(setItemDetails(item));
        dispatch(fetchItemsDetails(item.code));
    };
    const [addModalOpen, setAddModalOpen] = React.useState(false);
    const addModalClose = () => setAddModalOpen(false);
    const handleAddModalOpen = () => setAddModalOpen(true);
    const [items, setItems] = useState([
        { name: 'kg', code: 1 },
        { name: 'gram', code: 2 },
        { name: 'ltr', code: 3 },
        { name: 'pack', code: 4 },
        { name: 'box', code: 5 },
        { name: 'ton', code: 6 },
        { name: 'cm', code: 7 },
        { name: 'mm', code: 8 },
        { name: 'feet', code: 9 },
        { name: 'dozen', code: 10 }
    ]);
    {/* Item Transfer Code */ }
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedMeasure, setSelectedMeasure] = useState(null);
    const [selectedSelect, setSelectedSelect] = useState(null);
    const handleTransferLeft = () => {
        if (selectedSelect !== null) {
            setItems([...items, selectedItem[selectedSelect]]);
            setSelectedItem(selectedItem.filter((_, index) => index !== selectedSelect));
            setSelectedSelect(null);
        }
    };
    const handleTransferRight = () => {
        if (selectedMeasure !== null) {
            setSelectedItem([...selectedItem, items[selectedMeasure]]);
            setItems(items.filter((_, index) => index !== selectedMeasure));
            setSelectedMeasure(null);
        }
    };
    {/* Item Transfer Code Ends Here. */ }
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>UNDO</Button>
            <IconButton size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    {/* Add Item Text Field */ }
    const [name, setName] = useState('');
    const [hsnCode, setHsnCode] = useState('');
    const [igst, setIGST] = useState('');
    const [cgst, setCGST] = useState('');
    const [sgst, setSGST] = useState('');
    const handleAddSubmit = async(ev) => {
        ev.preventDefault();
        console.log(selectedItem);
        if (selectedItem.length === 0) {
            alert('select unitOfmeasurements.');
            return;
        }
        const unitOfMeasurements = selectedItem.map((item) => ({
            name: item.name,
            code: item.code
        }));
        const item = {
            name,
            hsn_code: hsnCode,
            igst,
            cgst,
            sgst,
            unitOfMeasurements
        };
        try {
            const data = JSON.stringify(item);
            const response = await dispatch(addItemData(data));
            if (!response.success) {
                throw new Error(response.message);
            }
            setSnackServertiy("success");
            setSnackServertiy("Item added successfully!");
            setName('');
            setHsnCode('');
            setIGST('');
            setSGST('');
            setCGST('');
            addModalClose();
            setOpen(true);
        } catch (err) {
            setSnackServertiy("error");
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
            setShowSnackbar(true);
        };
    };
    {/* Item Add Modal */ }
    const ItemsAddModal = (
        <>
            <Modal open={addModalOpen}
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
                <Fade in={addModalOpen}>
                    <Box component="form" className="addModalStyle" onSubmit={handleAddSubmit}>
                        <p className="addModalText">Add Items Module</p>
                        <TextField
                            className="addModalTextField"
                            variant="outlined"
                            label="Name"
                            helperText="Enter a Name"
                            size="small"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            type="text"
                        />
                        <TextField
                            className="addModalTextField"
                            variant="outlined" label="HSN CODE"
                            helperText="Enter a HSN CODE"
                            size="small"
                            fullWidth
                            name="hsn_code"
                            type="number"
                            value={hsnCode}
                            onChange={(e) => setHsnCode(e.target.value)}
                        />
                        <TextField
                            className="addModalTextField"
                            variant="outlined"
                            label="IGST"
                            helperText="Type IGST Value"
                            size="small"
                            fullWidth
                            name="igst"
                            type="number"
                            value={igst}
                            onChange={(e) => setIGST(e.target.value)}
                        />
                        <TextField
                            className="addModalTextField"
                            variant="outlined"
                            label="SGST"
                            helperText="Type SGST Value"
                            size="small"
                            fullWidth
                            value={sgst}
                            onChange={(e) => setSGST(e.target.value)}
                            name="sgst"
                            type="number"
                        />
                        <TextField
                            className="addModalTextField"
                            variant="outlined"
                            label="CGST"
                            helperText="Type CGST Value"
                            size="small"
                            fullWidth
                            value={cgst}
                            onChange={(e) => setCGST(e.target.value)}
                            name="cgst"
                            type="number"
                        />
                        <br></br>
                        <br></br>
                        <Divider></Divider>
                        <p className="addModalText">UnitOfMeasurements</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '180px' }}>
                            <p style={{ fontWeight: 'bold' }}>Select</p>
                            <p style={{ fontWeight: 'bold' }}>Selected</p>
                        </Box>
                        <Box className="addModalContainer">
                            <Card className="addModalCard">
                                <List>
                                    {items.map((item, code) => (
                                        <ListItem key={code} button selected={selectedMeasure === code} onClick={() => setSelectedMeasure(code)}>
                                            <ListItemText>{item.name}</ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                            <Box className="addModalButtonContainer">
                                <Button className="transferButton" variant="contained" onClick={handleTransferRight} disabled={selectedMeasure === null}>&gt;</Button>
                                &nbsp;
                                <Button className="transferButton" variant="contained" onClick={handleTransferLeft} disabled={selectedSelect === null}>&lt;</Button>
                            </Box>
                            <Card className="addModalCard">
                                <List>
                                    {selectedItem.map((item, code) => (
                                        <ListItem
                                            key={code}
                                            button
                                            selected={selectedSelect === code}
                                            onClick={() => setSelectedSelect(code)} >
                                            <ListItemText>{item.name}</ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: '25px' }}>
                            <Button variant="contained" type="submit">Add</Button>
                            &nbsp;
                            <Button variant="contained" onClick={addModalClose}>Cancel</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
    {/* Item Add Modal Ends Here */ }
    {/* Item Edit Modal  */ }
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const editModalClose = () => setEditModalOpen(false);
    const handleEditModalOpen = () => setEditModalOpen(true);
    const ItemsEditModal = (
        <>
            <Modal open={editModalOpen}
                aria-labelledby="add-modal-title"
                aria-describedby="add-modal-description"
                onClose={editModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={editModalOpen}>
                    <Box component={Paper} className="addModalStyle">
                        <p className="addModalText">Edit Items Module</p>
                        <TextField className="addModalTextField" variant="outlined" label="Code" helperText="Enter a Item Code" size="small" fullWidth />
                        <TextField className="addModalTextField" variant="outlined" label="HSN CODE" helperText="Enter a HSN CODE" size="small" fullWidth />
                        <TextField className="addModalTextField" variant="outlined" label="IGST" helperText="Type IGST Value" size="small" fullWidth />
                        <TextField className="addModalTextField" variant="outlined" label="SGST" helperText="Type SGST Value" size="small" fullWidth />
                        <TextField className="addModalTextField" variant="outlined" label="CGST" helperText="Type CGST Value" size="small" fullWidth />
                        <br></br>
                        <br></br>
                        <Divider></Divider>
                        <p className="addModalText">UnitOfMeasurements</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '180px' }}>
                            <p style={{ fontWeight: 'bold' }}>Select</p>
                            <p style={{ fontWeight: 'bold' }}>Selected</p>
                        </Box>
                        <Box className="addModalContainer">
                            <Card className="addModalCard">
                                <List>
                                    {items.map((item, index) => (
                                        <ListItem key={index} button selected={selectedMeasure === index} onClick={() => setSelectedMeasure(index)}>
                                            <ListItemText>{item}</ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                            <Box className="addModalButtonContainer">
                                <Button className="transferButton" variant="contained" onClick={handleTransferRight} disabled={selectedMeasure === null}>&gt;</Button>
                                &nbsp;
                                <Button className="transferButton" variant="contained" onClick={handleTransferLeft} disabled={selectedSelect === null}>&lt;</Button>
                            </Box>
                            <Card className="addModalCard">
                                <List>
                                    {selectedItem.map((item, index) => (
                                        <ListItem key={index} button selected={selectedSelect === index} onClick={() => setSelectedSelect(index)}>
                                            <ListItemText>{item}</ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: '25px' }}>
                            <Button variant="contained">Update</Button>
                            &nbsp;
                            <Button variant="contained">Cancel</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
    {/* Ends Here */ }

    {/* Checkbox checked or select All Implementation. */ }
    const [checkedItems, setCheckedItems] = useState(new Array(items_data.length).fill(false));
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
        setCheckedItems(new Array(items_data.length).fill(newSelectAll));
    };

    {/* Seraching Method Implementation. */ }
    // State for search input 
    const [searchNumber, setSearchNumber] = useState("");
    // State for mantaning data
    const [data, setData] = useState(items_data);
    // Handle for Serach Input 
    const handleSearchInputChange = (ev) => {
        setSearchNumber(ev.target.value);
    };
    const filteredData = searchNumber !== '' ?
        items_data.filter((item) => item.hsn_code === parseInt(searchNumber)) : items_data;
    /*const filtered = items_data.filter(item => {
        return item.hsn_code.toString().includes(searchNumber);
    });*/
    {/* Table Section Starts Here */ }
    const TableData = (
        <TableContainer className="table-container">
            <Box className="search-bar">
                <IconButton><SearchIcon /></IconButton>
                <InputBase type="number" placeholder="Search Using HSN Code..."
                    value={searchNumber}
                    onChange={handleSearchInputChange}
                    sx={{
                        flex: 1,
                        padding: '0.2rem 0.5rem',
                        border: 'none',
                        outline: 'none',
                        width : '100%'
                    }} />
                <IconButton sx={{ color: 'gray', marginRight: '0.5rem' }}><AddIcon onClick={handleAddModalOpen} /></IconButton>
            </Box>
            <Table stickyHeader className="table">
                <TableHead>
                    <TableRow className="table-header-row">
                        <TableCell className="table-header-cell">
                            <input type="checkbox" checked={isSelectAll} onChange={handleSelectAllChange} />
                        </TableCell>
                        <TableCell className="table-header-cell">S.No</TableCell>
                        <TableCell className="table-header-cell">Item-Code</TableCell>
                        <TableCell className="table-header-cell">Name</TableCell>
                        <TableCell className="table-header-cell">HSN_CODE</TableCell>
                        <TableCell className="table-header-cell">Edit</TableCell>
                        <TableCell className="table-header-cell">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((item, index) => {
                        return (
                            <TableRow key={item.code} onClick={() => itemRowButtonGotClicked(item)} style={{
                                backgroundColor: item.hsn_code === parseInt(searchNumber) ? '#ccc' : 'white',
                                fontWeight: item.hsn_code === parseInt(searchNumber) ? 'bold' : 'normal'
                            }}>
                                <TableCell className="table-body-cell">
                                    <input type="checkbox" onChange={() => handleCheckbox(index)} checked={checkedItems[index]} />
                                </TableCell>
                                <TableCell className="table-body-cell" component="th" scope="row">{index + 1}</TableCell>
                                <TableCell className="table-body-cell">{item.code}</TableCell>
                                <TableCell className="table-body-cell">{item.name}</TableCell>
                                <TableCell className="table-body-cell">{item.hsn_code}</TableCell>
                                <TableCell className="table-body-cell"><FontAwesomeIcon onClick={handleEditModalOpen} icon={faEdit} className="icon edit-icon" /></TableCell>
                                <TableCell className="table-body-cell"><FontAwesomeIcon icon={faRemove} className="icon delete-icon" /></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
    {/* Table Section Ends Here */ }
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackServertiy, setSnackServertiy] = useState("success");
    return (
        <>
            {ItemsAddModal}
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
                {/* Table Section Starts Here */}
                {/* Table Section Ends Here */}
                {TableData}
                {/* Bottom Section All Data Show Start Here */}
                <Box className="detailed-box">
                    {itemsDetails && itemsDetails.length > 0 ? (
                        itemsDetails.map((item) => (
                            <>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', textAlign: 'center', padding: '1rem' }}>
                                    {/* Content for the left section */}
                                    <Typography variant="body1" className="bottom-font">HSN_CODE</Typography>&nbsp;<b>{item.hsn_code}</b>&nbsp;|&nbsp;
                                    <Typography variant="body1" className="bottom-font">IGST</Typography>&nbsp;<b>{item.igst}</b>&nbsp;|&nbsp;
                                    <Typography variant="body1" className="bottom-font">CGST</Typography>&nbsp;<b>{item.cgst}</b>&nbsp;|&nbsp;
                                    <Typography variant="body1" className="bottom-font">SGST</Typography>&nbsp;<b>{item.sgst}</b>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', textAlign: 'center', justifyContent: 'center', padding: '1rem' }}>
                                    {/* Content for the right section */}
                                    <Typography variant="body1">{item.unitOfMeasurements}</Typography>
                                </Box>
                            </>
                        ))
                    ) : (
                        <Typography sx={{ textAlign: 'center', color: 'var(--text-color)' }}>Please Select Item Name In Order To Get Details.</Typography>
                    )}
                </Box>
                {/* Bottom Section All Data Show Ends Here */}
            </Main>
        </>
    );
}
export default Items;