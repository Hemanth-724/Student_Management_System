import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) {
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/signin', { username, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('user');
  },
  register: async (username, password) => {
    return await api.post('/auth/signup', { username, password });
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export const studentService = {
  getAllStudents: async () => {
    const response = await api.get('/students');
    return response.data;
  },
  searchStudents: async (query) => {
    const response = await api.get(`/students/search?query=${query}`);
    return response.data;
  },
  createStudent: async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
  },
  updateStudent: async (id, studentData) => {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  },
  deleteStudent: async (id) => {
    return await api.delete(`/students/${id}`);
  }
};

export default api;
