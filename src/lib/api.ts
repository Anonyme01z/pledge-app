import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async (userData: {
  email: string;
  password: string;
  name: string;
  type: 'ORGANIZATION' | 'INDIVIDUAL';
}) => {
  const { data } = await api.post('/auth/register', userData);
  localStorage.setItem('token', data.token);
  return data;
};

export const getDonors = async () => {
  const { data } = await api.get('/donors');
  return data;
};

export const getDonorDetails = async (id: string) => {
  const { data } = await api.get(`/donors/${id}`);
  return data;
};

export const createDonor = async (donorData: {
  name: string;
  email: string;
  phone?: string;
}) => {
  const { data } = await api.post('/donors', donorData);
  return data;
};