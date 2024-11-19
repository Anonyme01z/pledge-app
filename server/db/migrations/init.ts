import pool from '../index'; // Import the database connection

const migrate = async () => {
  const connection = await pool.getConnection();

  try {
    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        type ENUM('ORGANIZATION', 'INDIVIDUAL') NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS donors (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(15),
        totalDonated FLOAT DEFAULT 0,
        lastDonation TIMESTAMP NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS donations (
        id VARCHAR(36) PRIMARY KEY,
        donorId VARCHAR(36) NOT NULL,
        userId VARCHAR(36) NOT NULL,
        amount FLOAT NOT NULL,
        status ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL,
        projectId VARCHAR(36),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (donorId) REFERENCES donors(id),
        FOREIGN KEY (userId) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(36) PRIMARY KEY,
        userId VARCHAR(36) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        target FLOAT NOT NULL,
        raised FLOAT DEFAULT 0,
        status ENUM('ACTIVE', 'COMPLETED', 'CANCELLED') NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);

    console.log('Migration completed.');
  } catch (error) {
    console.error('Error running migration:', error);
  } finally {
    connection.release();
  }
};

migrate();
