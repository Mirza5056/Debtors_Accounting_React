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

app.post('/getsys',function(request,response){
    var name=request.body.name;
    console.log(name);
});
app.listen(port,function(error){
    if(error) {
        console.log('Some error have been occured please try after some time.');
    }
    console.log(`server is ready to accept on port number ${port}`);
    const {exec} =require('child_process');
    exec('npm start',(err,stdout,stdin)=>{
        if(err) { console.log(err); } 
        console.log(`${stdout}`);
        console.log(`${stdin}`);
    });
});