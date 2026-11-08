import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Cookies automatically send hongi
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
