const managers = require('./database/manager');
const entites = require('./database/entites');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 8080;
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
const { stdout, stdin } = require('process');
app.get('/', function (request, response) {
    response.redirect('/index.js');
    console.log('starts');
});
app.get('/getStates', async function (request, response) {
    try {
        var m = new managers.StateManager();
        var states = await m.getAll();
        response.send(states);
    } catch (error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.get('/getItems', async function (request, response) {
    try {
        var m = new managers.ItemManager();
        var items = await m.getAllItem();
        if (items.length <= 0) {
            response.json({ success: false, message: "No Data Available" });
            return;
        }
        response.send(items);
    } catch (error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.get('/getByItemCode', async function (request, response) {
    try {
        var code = request.query.code;
        var m = new managers.ItemManager();
        var items = await m.getByItemName(code);
        if (items.length > 0) {
            response.send(items);
        } else {
            response.status(404).send({ message: "Item not found" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.get('/getTraders', async function (request, response) {
    try {
        var m = new managers.TraderManager();
        var traders = await m.getAll();
        response.json(traders);
    } catch (err) {
        console.log(err);
        response.status(500).send("Internal Server Add");
    }
});

app.post("/addItems", async function(request, response) {
    try {
        const m = new managers.ItemManager();
        const { name, hsn_code, cgst, sgst, igst, unitOfMeasurements } = request.body;
        const item = new entites.Item(0, name, hsn_code, cgst, sgst, igst, unitOfMeasurements);
        const items =await m.addItem(item);
        response.send(items);
    } catch (error) {
        response.status(500).send({message: 'An error occured.' });
    }
});


app.post('/updateTraders', async function (request, response) {
    console.log(request.body);
    try {
        console.log('starts');
        var traderUpdate = request.body;
        var code = traderUpdate.code;
        var name = traderUpdate.name;
        var address = traderUpdate.address;
        var gst_num = traderUpdate.gst_num;
        var reg_title_1 = traderUpdate.reg_title_1;
        var reg_value_1 = traderUpdate.reg_value_1;
        var contact_1 = traderUpdate.contact_1;
        var contact_2 = traderUpdate.contact_2;
        var contact_3 = traderUpdate.contact_3;
        var bank_custom_name = traderUpdate.bank_custom_name;
        var account_number = traderUpdate.account_number;
        var ifsc_code = traderUpdate.ifsc_code;
        var branch_name = traderUpdate.branch_name;
        var state_code = traderUpdate.state_code;
        var item = new entites.Trader(code, name, address, gst_num, reg_title_1, reg_value_1, contact_1, contact_2, contact_3, bank_custom_name, account_number, ifsc_code, branch_name, state_code);
        var manager = new managers.TraderManager();
        var traders = await manager.update(item);
        response.send(traders);
    } catch (error) {
        response.status(500).send({message: 'An error occured.' });
    }
});
app.get('/getCustomer', async function (request, response) {
    try {
        var m = new managers.CustomerManager();
        var customers = await m.getAll();
        if (customers.length <= 0) {
            return { success: false, message: "No data available." };
        }
        response.json(customers);
    } catch (error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.get('/getByCustomerCode', async function (request, response) {
    try {
        var code = request.query.code;
        var m = new managers.CustomerManager();
        var customers = await m.getByCustomerCode(code);
        response.send(customers);
    } catch (error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.post('/addCustomer', async function(req, res){
    try
    {
        var customerData = req.body;
        var code = customerData.code;
        var name = customerData.name;
        var address = customerData.address;
        var reg_title_1 = customerData.reg_title_1;
        var reg_value_1 = customerData.reg_value_1;
        var reg_title_2 = customerData.reg_title_2;
        var reg_value_2 = customerData.reg_value_2;
        var reg_title_3 = customerData.reg_title_3;
        var reg_value_3 = customerData.reg_value_3;
        var contact_1 = customerData.contact_1;
        var contact_2 = customerData.contact_2;
        var contact_3 = customerData.contact_3;
        var state_code = customerData.state_code;
        var custom = new entites.Customer(code,name,address,reg_title_1,reg_value_1,reg_title_2,reg_value_2,reg_title_3,reg_value_3,contact_1,contact_2,contact_3,state_code);
        var manager = new managers.CustomerManager();
        var insertCustomer = await manager.addCustomer(custom);
        res.send(insertCustomer);
    }catch(err) {
        console.log(err);
        res.status(500).json({message : "some error occured."});
    }
});


app.post('/updateCustomer', async function(req, res){
    try
    {
        var customerData = req.body;
        var code = customerData.code;
        var name = customerData.name;
        var address = customerData.address;
        var reg_title_1 = customerData.reg_title_1;
        var reg_value_1 = customerData.reg_value_1;
        var reg_title_2 = customerData.reg_title_2;
        var reg_value_2 = customerData.reg_value_2;
        var reg_title_3 = customerData.reg_title_3;
        var reg_value_3 = customerData.reg_value_3;
        var contact_1 = customerData.contact_1;
        var contact_2 = customerData.contact_2;
        var contact_3 = customerData.contact_3;
        var state_code = customerData.state_code;
        var custom = new entites.Customer(code,name,address,reg_title_1,reg_value_1,reg_title_2,reg_value_2,reg_title_3,reg_value_3,contact_1,contact_2,contact_3,state_code);
        var manager = new managers.CustomerManager();
        var updateCustomer = await manager.updateCustomer(custom);
        res.send(updateCustomer);
    }catch(err) {
        console.log(err);
        res.status(500).json({message : "some error occured."});
    }
});

app.delete("/deleteCustomer",async (req, res)=>{
    try
    {
        var code = req.query.code;
        var manager = new managers.CustomerManager();
        var deleteCustom = await manager.deleteCustomer(code);
        res.send(deleteCustom);
    }catch(err) {
        console.log(err);
        res.status(500).json({message : err});
    }
});

app.listen(port, function (error) {
    if (error) {
        console.log('Some error have been occured please try after some time.');
    }
    console.log(`server is ready to accept on port number ${port}`);
    const { exec } = require('child_process');
    exec('npm start', (err, stdout, stdin) => {
        if (err) { console.log(err); }
        console.log(`${stdout}`);
        console.log(`${stdin}`);
    });
});