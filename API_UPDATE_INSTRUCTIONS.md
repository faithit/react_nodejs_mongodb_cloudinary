// frontend/src/config/apiClient.js
// This file centralizes all API calls - easier to manage for deployments

import axios from 'axios';

// Get API URL from environment variable, fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export default apiClient;

// Usage in components:
// import apiClient from '../config/apiClient';
// apiClient.get('/products')
// apiClient.post('/contacts', data)
// apiClient.delete(`/products/${id}`)
// apiClient.patch(`/contacts/${id}`)
// apiClient.put(`/products/${id}`, data)
