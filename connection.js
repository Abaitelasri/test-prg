const mysql = require('mysql2');
require('dotenv').config();


console.log('Creating database connection pool...');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database with threadId:', connection.threadId);
  connection.release(); 
});

module.exports = pool;
