const mysql = require('mysql2');

console.log('Creating database connection pool...');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 10, // set a reasonable limit for the number of connections in the pool
  queueLimit: 100 // set a reasonable limit for the number of queued connections
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database with threadId:', connection.threadId);
  connection.release(); // Release the connection back to the pool when done
});

module.exports = pool.promise();
