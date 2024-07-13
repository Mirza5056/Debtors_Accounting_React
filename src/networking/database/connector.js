const oracle=require('oracledb');
async function getConnection(){
    var connection=null;
    try
    {
        connection=await oracle.getConnection({
            "user" : "hr",
            "password" : "hr",
            "connectionString" : "localhost:1521/xepdb1"
        });
        return connection;
    }catch(err) {
        console.log("Error getting connection",err);
        throw err;
    }
}
module.exports={getConnection};