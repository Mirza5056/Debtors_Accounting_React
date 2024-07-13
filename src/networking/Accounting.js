const managers=require('./database/manager');
const entites=require('./database/entites');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express()
const port=8080;
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
const { stdout, stdin } = require('process');
app.get('/',function(request,response){
    response.redirect('/index.js');
    console.log('starts');
});
app.get('/getCustomer',async function(request,response){
    try
    {
        var m=new managers.CustomerManager();
        var customers=await m.getAll();
        response.json(customers);
    }catch(error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.get('/getByCustomerCode',async function(request,response){
    try
    {
        var code=request.query.code;
        var m=new managers.CustomerManager();
        var customers=await m.getByCustomerCode(code);
        response.send(customers);
    }catch(error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.get('/getStates',async function(request,response){
    try
    {
        var m=new managers.StateManager();
        var states=await m.getAll();
        response.send(states);
    }catch(error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.get('/getItems',async function(request,response){
    try
    {
        var m=new managers.ItemManager();
        var items=await m.getAllItem();
        response.send(items);
    }catch(error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.get('/getByItemCode',async function(request,response){
    try
    {
        var code=request.query.code;
        var m=new managers.ItemManager();
        var items=await m.getByItemName(code);
        response.json(items);
    }catch(error) {
        console.log(error);
        response.status(500).send("Internal Server Error");
    }
});
app.get('/getTraders',async function(request,response){
    try
    {
        var m=new managers.TraderManager();
        var traders=await m.getAll();
        response.json(traders);
    }catch(err) {
        console.log(err);
        response.status(500).send("Internal Server Add");
    }
});
/*app.post('/addItems',async function(request,response){
    try
    {
        var m=new managers.ItemManager();
        var body=request.body;
        var name=request.body.name;
        var hsn_code=request.body.hsn_code;
        var igst=request.body.igst;
        var sgst=request.body.sgst;
        var cgst=request.body.cgst;
        var unitOfMeasurement=request.body.unitOfMeasurement;
        var unitOfMeasurements=[];
        for(var i=0; i<unitOfMeasurements.length; i++) {
            var uomName=unitOfMeasurement[i];
            var uomCode=unitOfMeasurement[i];
            var uom=new entites.UnitOfMeasurement(uomCode,uomName);
            unitOfMeasurements.push(uom);
            i++;
        }
        var item=new entites.Item(0,name,hsn_code,igst,sgst,cgst,unitOfMeasurements);
        console.log(name,hsn_code,igst,sgst,cgst,unitOfMeasurements);
        var updated=await m.add(item);
        response.send(updated);
        console.log(request.body);
    }catch(error) {
        console.log(error);
        //response.status(500).send("Some Problem Occured");
    }
});*/
app.post('/addItems',async function(request,response){
    try
    {
        var itemData=request.body;
        var name=itemData.name;
        var hsn_code=itemData.hsn_code;
        var igst=itemData.igst;
        var sgst=itemData.sgst;
        var cgst=itemData.cgst;
        var unitOfMeasurements=itemData.unitOfMeasurements;
        var item=new entites.Item(0,name,hsn_code,igst,sgst,cgst,unitOfMeasurements);
        console.log(name,hsn_code,igst,sgst,cgst,unitOfMeasurements);
        var m=new managers.ItemManager();
        var updated=await m.add(item);
        response.send(updated);
    }catch(error) {
        console.log(error);
    }
});

app.post('/updateTraders',async function(request,response){
    console.log(request.body);
    try
    {
        console.log('starts');
        var traderUpdate=request.body;
        var code=traderUpdate.code;
        var name=traderUpdate.name;
        var address=traderUpdate.address;
        var gst_num=traderUpdate.gst_num;
        var reg_title_1=traderUpdate.reg_title_1;
        var reg_value_1=traderUpdate.reg_value_1;
        var contact_1=traderUpdate.contact_1;
        var contact_2=traderUpdate.contact_2;
        var contact_3=traderUpdate.contact_3;
        var bank_custom_name=traderUpdate.bank_custom_name;
        var account_number=traderUpdate.account_number;
        var ifsc_code=traderUpdate.ifsc_code;
        var branch_name=traderUpdate.branch_name;
        var state_code=traderUpdate.state_code;
        var item=new entites.Trader(code,name,address,gst_num,reg_title_1,reg_value_1,contact_1,contact_2,contact_3,bank_custom_name,account_number,ifsc_code,branch_name,state_code);
        var manager=new managers.TraderManager();
        var traders=await manager.update(item);
        response.send(traders);
        console.log(code,name);
        response.status(200).send({message : 'Trader Updated Successfully'});
        console.log('ends successfully');
    }catch(error) {
        console.log(error);
    }
});
app.listen(port,function(error){
    if(error) {
        console.log('Some error have been occured please try after some time.');
    }
    console.log(`server is ready to accept on port number ${port}`);
    const {exec} =require('child_process');
    /*exec('npm start',(err,stdout,stdin)=>{
        if(err) { console.log(err); } 
        console.log(`${stdout}`);
        console.log(`${stdin}`);
    });*/
});