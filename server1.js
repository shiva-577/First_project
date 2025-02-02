const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'varshitha',
  password: '123456',
  database: 'mydata'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the main HTML file when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'easy.html')); // Change to your desired HTML file
});

// Helper function to fetch data
const fetchData = (tableName, counter, res) => {
  const query = `SELECT * FROM ${tableName} WHERE id = ?`;
  connection.query(query, [counter], (err, results) => {
    if (err) {
      console.error(`Error fetching data from ${tableName}:`, err);
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      counter = 1; // Reset counter if no data is found
    } else {
      counter++; // Increment counter for next request
    }
    res.json(results);
  });
  return counter;
};

// Initialize counters
let counters = { easy: 1, hard: 1, medium: 1 };

// Routes to fetch data from respective tables
app.get('/api/easy', (req, res) => {
  counters.easy = fetchData('easy', counters.easy, res);
});

app.get('/api/hard', (req, res) => {
  counters.hard = fetchData('hard', counters.hard, res);
});

app.get('/api/medium', (req, res) => {
  counters.medium = fetchData('medium', counters.medium, res);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
