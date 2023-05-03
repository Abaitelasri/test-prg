const mysql = require('mysql2');


console.log('Connecting to database...');
var mysqlConnection = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'test'
});

mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with threadId: ' + mysqlConnection.threadId);
});

module.exports=mysqlConnection;