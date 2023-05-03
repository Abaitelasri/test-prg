const connection = require('./connection.js');
const express = require('express');

const app = express();

// add middleware to parse request body
app.use(express.json());

app.get('/ee', (req, res) => {
  connection.query('SELECT * FROM people', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Query result:', rows);
    res.send(rows);
  });
});
app.post('/test',(req,res)=>{
    console.log("worked");
  
      const sql = `INSERT INTO people (id,date,etat) VALUES ('11123','2023-05-03','aze')`;
  console.log('SQL query:', sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.status(500).send(err);
      return;
    }
    console.log('Data inserted successfully');
    res.send('Data inserted successfully');
  });
    
});


// route for inserting data into the database
app.post('/insertData', (req, res) => {
  console.log('Request body:', req.body);

  var a;
  var dir;
  if (req.body.meta[0].nodes[0].lines[0].cur_dir1_objects[0]) {
    a = req.body.meta[0].nodes[0].lines[0].cur_dir1_objects[0];
    dir = 'dir1';
  } else {
    a = req.body.meta[0].nodes[0].lines[0].cur_dir2_objects[0];
    dir = 'dir2';
  }

  const timestamp = req.body.meta[0].timestamp;

  console.log('Inserting data into database...');
  const sql = `INSERT INTO people (id,date,etat) VALUES ('${a}','${timestamp}','${dir}')`;
  console.log('SQL query:', sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.status(500).send('Error inserting data into database');
      return;
    }
    console.log('Data inserted successfully');
    res.send('Data inserted successfully');
  });
});

// start the server
app.listen(8080 || process.env.PORT, () => {
  console.log('Server listening on port ');
});