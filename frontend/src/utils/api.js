import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sesi_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public APIs
export const publicAPI = {
  // States and Districts
  getStates: () => api.get('/public/states'),
  getDistricts: (stateId) => api.get(`/public/districts/${stateId}`),
  
  // Committee
  getCommittee: (params) => api.get('/public/committee', { params }),
  
  // Events
  getEvents: (params) => api.get('/public/events', { params }),
  getEvent: (id) => api.get(`/public/events/${id}`),
  
  // News
  getNews: (params) => api.get('/public/news', { params }),
  getNewsItem: (id) => api.get(`/public/news/${id}`),
  
  // Gallery
  getGallery: (params) => api.get('/public/gallery', { params }),
  
  // Publications
  getPublications: (params) => api.get('/public/publications', { params }),
  
  // Members
  getMembers: (params) => api.get('/public/members', { params }),
  
  // Statistics
  getStatistics: () => api.get('/public/statistics'),
  
  // SEO
  getPageSEO: (pageName) => api.get(`/public/seo/${pageName}`),
  
  // Contact Form
  submitContactForm: (data) => api.post('/public/contact', data),
};

// Membership APIs
export const membershipAPI = {
  submitApplication: (formData) => api.post('/membership/apply', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getApplication: (id) => api.get(`/membership/applications/${id}`),
};

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
};

// Admin APIs
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  
  // Members
  getMembers: () => api.get('/admin/members'),
  createMember: (data) => api.post('/admin/members', data),
  updateMember: (id, data) => api.put(`/admin/members/${id}`, data),
  deleteMember: (id) => api.delete(`/admin/members/${id}`),
  
  // Committee
  getCommittee: () => api.get('/admin/committee'),
  createCommitteeMember: (data) => api.post('/admin/committee', data),
  updateCommitteeMember: (id, data) => api.put(`/admin/committee/${id}`, data),
  deleteCommitteeMember: (id) => api.delete(`/admin/committee/${id}`),
  
  // Events
  getEvents: () => api.get('/admin/events'),
  createEvent: (data) => api.post('/admin/events', data),
  updateEvent: (id, data) => api.put(`/admin/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),
  
  // News
  getNews: () => api.get('/admin/news'),
  createNews: (data) => api.post('/admin/news', data),
  updateNews: (id, data) => api.put(`/admin/news/${id}`, data),
  deleteNews: (id) => api.delete(`/admin/news/${id}`),
  
  // Gallery
  getGallery: () => api.get('/admin/gallery'),
  uploadImage: (formData) => api.post('/admin/gallery/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteImage: (id) => api.delete(`/admin/gallery/${id}`),
  
  // Publications
  getPublications: () => api.get('/admin/publications'),
  createPublication: (data) => api.post('/admin/publications', data),
  deletePublication: (id) => api.delete(`/admin/publications/${id}`),
  
  // Applications
  getApplications: (params) => api.get('/admin/applications', { params }),
  getApplication: (id) => api.get(`/admin/applications/${id}`),
  updateApplicationStatus: (id, status, notes) => api.put(`/admin/applications/${id}/status`, null, {
    params: { status, admin_notes: notes }
  }),
  
  // SEO
  getAllSEO: () => api.get('/admin/seo'),
  updateSEO: (data) => api.post('/admin/seo', data),
  
  // File Upload
  uploadFile: (file, subfolder) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/admin/upload', formData, {
      params: { subfolder },
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

export default api;
