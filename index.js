const connection = require('./connection.js');
const express = require('express');

const app = express();
const moment = require('moment');


// add middleware to parse request body
app.use(express.json());

app.get('/perDate', (req, res) => {
  connection.query('SELECT DATE(date) as date ,count(id) as count_per_day FROM people group by DATE(date)', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Query result:', rows);
    res.send(rows);
  });
});
// requete !!!!
//last Hour requete : SELECT COUNT(id) as count_last_hour FROM people WHERE date >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
//last week requete : SELECT COUNT(id) as count_last_week FROM people WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK);
//last mounth requete :SELECT COUNT(id) as count_last_month FROM people WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH);






app.get('/perHour', (req, res) => {
  connection.query('SELECT DATE_FORMAT(date, "%H:00") as date ,count(id) as count_per_hour  FROM people group by HOUR(date)', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Query result:', rows);
    res.send(rows);
  });
});

app.post('/bathroom',(req,res)=>{

     

      let id;
      let dir;
      let a;
      if (req.body.meta[0].nodes[0].lines[0].cur_dir1_objects[0]) {
        id = req.body.meta[0].nodes[0].lines[0].cur_dir1_objects[0];
        dir = 'dir1';
        a="The bathroom isn't empty";
      
      } else {
        id = req.body.meta[0].nodes[0].lines[0].cur_dir2_objects[0];
        dir = 'dir2';
        a="The bathroom is empty";
      }

        const timestamp = new Date(req.body.meta[0].timestamp).toISOString().slice(0, 19).replace('T', ' ');


    const sql = `INSERT INTO people (id,date,etat,place) VALUES ('${id}','${timestamp}','${dir}','${req.body.meta[0].nodes[0].lines[0].label}')`;
  console.log('SQL query:', sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data into database'+err);
      return;
    }
    console.log('Data inserted successfully');
    res.send(a);
  });
});


// route for inserting data into the database
app.post('/door', (req, res) => {
  console.log('Request body:', req.body);

  var a;
  var dir;
  if (req.body.meta[0].nodes[0].lines[1].cur_dir1_objects[0]) {
    a = req.body.meta[0].nodes[0].lines[1].cur_dir1_objects[0];
    dir = 'dir1';
  } else {
    a = req.body.meta[0].nodes[0].lines[1].cur_dir2_objects[0];
    dir = 'dir2';
  }

  const timestamp = moment(req.body.meta[0].timestamp).format('YYYY-MM-DD HH:mm:ss');


  console.log(a);
  const sql = `INSERT INTO people (id,date,etat,place) VALUES ('${a}','${timestamp}','${dir}','${req.body.meta[0].nodes[0].lines[1].label}')`;
  console.log('SQL query:', sql);
  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data into database'+err);
      return;
    }
    console.log('Data inserted successfully');
    res.send('person crossed');
  });
});

// start the server
app.listen(8080 || process.env.PORT, () => {
  console.log('Server listening on port ');
});