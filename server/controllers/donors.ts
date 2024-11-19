import { Request, Response } from 'express';
import { z } from 'zod';
import db from '../db';
import { AuthRequest } from '../middleware/auth';
import crypto from 'crypto';

const donorSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional()
});

export const createDonor = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone } = donorSchema.parse(req.body);
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    db.prepare(`
      INSERT INTO donors (id, name, email, phone, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, name, email, phone, now, now);

    res.status(201).json({ id, name, email, phone });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error creating donor' });
  }
};

export const getDonors = async (req: AuthRequest, res: Response) => {
  try {
    const donors = db.prepare('SELECT * FROM donors ORDER BY createdAt DESC').all();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching donors' });
  }
};

export const getDonorDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string' || id.length !== 36) {
      return res.status(400).json({ error: 'Invalid donor ID format' });
    }
    
    const donor = db.prepare('SELECT * FROM donors WHERE id = ?').get(id);
    
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    const donations = db.prepare(`
      SELECT d.*, p.name as projectName 
      FROM donations d 
      LEFT JOIN projects p ON d.projectId = p.id 
      WHERE d.donorId = ?
      ORDER BY d.createdAt DESC
    `).all(id);

    res.json({ ...donor, donations });
  } catch (error) {
    console.error('Error in getDonorDetails:', error);
    res.status(500).json({ error: 'Error fetching donor details' });
  }
};