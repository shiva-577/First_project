const express = require('express');
const mysql = require('mysql');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'varshitha',
  password: '123456',
  database: 'mydata'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fetch data from external API
fetch('https://api.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data fetched from API:', data);
  })
  .catch(error => {
    console.error('Error fetching data from API:', error);
  });

// Define route to fetch random text/audio pair from database
app.get('/random', (req, res) => {
  connection.query('SELECT * FROM audio_data ORDER BY RAND() LIMIT 1', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('No data found');
      return;
    }
    const randomPair = results[0];
    res.json(randomPair);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

