const express=require('express');
const { stdout, stdin } = require('process');
const app=express();
const port=8080;
app.use(express.static('public'));
app.get('/',function(request,response){
    response.redirect('/index.js');
});

app.listen(port,function(error){
    if(error) {
        console.log('Some error have been occured please try after some time.');
    }
    console.log(`server is ready to accept on port number ${port}`);
    const {exec} =require('child_process');
    exec('npm start',(err,stdout,stdin)=>{
        if(err) { console.log('err'); } 
        console.log(`${stdout}`);
        console.log(`${stdin}`);
    });
});