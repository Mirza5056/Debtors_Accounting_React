const managers=require('./database/manager');
const entites=require('./database/entites');
const express=require('express');
const cors=require('cors');
const { stdout, stdin } = require('process');
const app=express();
const port=8080;
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
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
    }
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