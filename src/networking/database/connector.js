const oracle=require('oracledb');
async function getConnection(){
    var connection=null;
    connection=await oracle.getConnection({
        "user" : "hr",
        "password" : "hr",
        "connectionString" : "localhost:1521/xepdb1"
    });
    return connection;
}
module.exports={getConnection};