const connection = require('./connection.js');
const express = require('express');
const bodyParser=require('body-parser');
const app = express();

// add middleware to parse request body
app.use(bodyParser.json());

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
app.get('/test',(req,res)=>{
    console.log("worked");
    res.send("worked successfully");
    
});


// route for inserting data into the database
app.post('/insertData', (req, res) => {
    var a;
    var dir;
    if (req.body.meta[0].nodes[0].lines[0].cur_dir1_objects[0]){
         a = req.body.meta[0].nodes[0].lines[0].cur_dir1_objects[0];
         dir='dir1';
 
    }
    else{
          a = req.body.meta[0].nodes[0].lines[0].cur_dir2_objects[0];
          dir='dir2';

    }
 
    const timestamp = req.body.meta[0].timestamp;
    

  
  // insert data into the database
  const sql = `INSERT INTO people (id,date,etat) VALUES ('${a}','${timestamp}','${dir}')`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Data inserted successfully');
    res.send('Data inserted successfully');
  });
});
// start the server
app.listen(8080 || process.env.PORT, () => {
  console.log('Server listening on port ');
});