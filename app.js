const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api'
});

// Test conection
connection.connect(err => {
  if (err) throw err;
  console.log('Database server running!');
})

app.listen(port, () => console.log(`Server running on port ${port}`));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// All Customers
app.get('/customers', (req, res) => {
  const sql = 'SELECT * FROM customers';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not results');
    }
  });
});

// Customers by ID
app.get('/customers/:id', (req, res) => {
  const {
    id
  } = req.params;
  const sql = `SELECT * FROM customers WHERE ID = ${id}`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not results');
    }
  });
});

// Insert
app.post('/add', (req, res) => {
  const sql = 'INSERT INTO customers SET ?';
  const customerObj = {
    name: req.body.name,
    city: req.body.city
  }
  connection.query(sql, customerObj, err => {
    if (err) throw err;
    res.send('Customer created!');
  });
});

// Update
app.put('/update/:id', (req, res) => {
  const {id} = req.params;
  const {name, city} = req.body;
  const sql = `UPDATE customers SET NAME = '${name}', CITY = '${city}' WHERE ID = '${id}'`;
  connection.query(sql, err => {
    if (err) throw err;
    res.send('Customer updated!');
  });
});

// Delete
app.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  const sql = `DELETE FROM customers WHERE ID = ${id}`;
  connection.query(sql, err => {
    if (err) throw err;
    res.send('Customer deleted!');
  });
});
