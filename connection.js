const mysql = require('mysql2');


console.log('Connecting to database...');
var mysqlConnection = mysql.createPool({
   host:process.env.DB_HOST,
   user:process.env.DB_USERNAME,
   password:process.env.DB_PASSWORD,
   database:process.env.DB_DBNAME,
   waitForConnection: true,
   queueLimit:0
});

mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with threadId: ' + mysqlConnection.threadId);
});

module.exports=mysqlConnection;