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

// Create Donor function with database connection
async function createDonor(req: any, res: any) {
  const { name, email, donationAmount } = req.body;
  const query = 'INSERT INTO donors (name, email, donation_amount) VALUES (?, ?, ?)';
  pool.execute(query, [name, email, donationAmount], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Donor created successfully', donorId: result.insertId });
  });
}

// Get Donors function with database connection
async function getDonors(req: any, res: any) {
  const query = 'SELECT * FROM donors';
  pool.execute(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(result);
  });
}

// Get Donor Details function with database connection
async function getDonorDetails(req: any, res: any) {
  const donorId = req.params.id;
  const query = 'SELECT * FROM donors WHERE id = ?';
  pool.execute(query, [donorId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json(result[0]);
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
