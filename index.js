const connection = require('./connection.js');
const express = require('express');
const bodyParser=require('body-parser');
const app = express();

// add middleware to parse request body
app.use(bodyParser.json());
app.get('/ee',(req,res)=>{
    console.log(req.body.meta[0].nodes[0].lines[0].cur_dir2_objects[0]);
    connection.query('select * from people',(err,row)=>{
        if (err) throw err;
    console.log('Data inserted successfully');
    res.send('Data inserted successfully');
  
    });
});
app.get('/test',(req,res)=>{
    console.log("worked");
    
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
  console.log('Server listening on port 3000');
});