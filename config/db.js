// config/db.js
require('dotenv').config();  // Ensure this loads environment variables

const mysql = require('mysql2');

// Set up the connection using environment variables or directly
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'junction.proxy.rlwy.net', // Railway host
  user: process.env.DB_USER || 'root',                   // MySQL username
  password: process.env.DB_PASSWORD || 'your-password', // MySQL password
  database: process.env.DB_NAME || 'railway',           // Database name
  port: process.env.DB_PORT || 19718                    // MySQL port
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = connection;
