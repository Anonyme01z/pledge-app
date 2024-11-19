import express from 'express';
import cors from 'cors';
import { register, login } from './controllers/auth';
import { createDonor, getDonors, getDonorDetails } from './controllers/donors';
import { auth } from './middleware/auth';
import mysql from 'mysql2';

// Create a MySQL connection pool for your database
const pool = mysql.createPool({
  host: 'your-database-host', // Replace with your actual database host
  user: 'your-database-username', // Replace with your actual database username
  password: 'your-database-password', // Replace with your actual database password
  database: 'your-database-name', // Replace with your actual database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Auth routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Protected routes
app.use('/api', auth);
app.post('/api/donors', createDonor);
app.get('/api/donors', getDonors);
app.get('/api/donors/:id', getDonorDetails);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
