export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: 'ORGANIZATION' | 'INDIVIDUAL';
  createdAt: Date;
  updatedAt: Date;
}

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalDonated: number;
  lastDonation?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  donorId: string;
  userId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  target: number;
  raised: number;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}