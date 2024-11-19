import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import db from '../db';
import pool from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';



import pool from '../db';
// Other imports...

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, type } = registerSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();
    const id = crypto.randomUUID();

    const connection = await pool.getConnection();

    try {
      await connection.query(
        `INSERT INTO users (id, email, password, name, type, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, email, hashedPassword, name, type, now, now]
      );

      const token = jwt.sign({ id, email, type }, JWT_SECRET);

      res.status(201).json({ token });
    } finally {
      connection.release();
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error creating user' });
  }
};



const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  type: z.enum(['ORGANIZATION', 'INDIVIDUAL'])
});

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, type } = registerSchema.parse(req.body);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    db.prepare(`
      INSERT INTO users (id, email, password, name, type, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, email, hashedPassword, name, type, now, now);

    const token = jwt.sign({ id, email, type }, JWT_SECRET);
    
    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error creating user' });
  }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = db.prepare('SELECT * FROM users WHERE email = ?')
      .get(email) as any;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, type: user.type },
      JWT_SECRET
    );

    res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error logging in' });
  }
};