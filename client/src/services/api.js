import axios from 'axios';
import { API_URL } from '../utils/constants';

const api = axios.create({
 baseURL: API_URL,
 headers: {
 'Content-Type': 'application/json',
 },
});

api.interceptors.request.use(
 (config) => {
 const token = localStorage.getItem('token');
 if (token) {
 config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
 },
 (error) => Promise.reject(error)
);

api.interceptors.response.use(
 (response) => response,
 (error) => {
 if (error.response && error.response.status === 401) {
 localStorage.removeItem('token');
 window.location.href = '/login';
 }
 return Promise.reject(error);
 }
);

// ─── Auth Service ────────────────────────────────────────────────────────────
export const authService = {
 login: async (credentials) => {
 // Mock for Phase 1 (uncomment api.post for real backend)
 return new Promise((resolve) => {
 setTimeout(() => {
 resolve({ data: { token: 'mock-jwt-token', user: { id: 1, name: 'John Doe', email: credentials.email, role: 'ADMIN' } } });
 }, 1500);
 });
 // return api.post('/auth/login', credentials);
 },
 register: async (userData) => {
 // Mock for Phase 1
 return new Promise((resolve) => {
 setTimeout(() => {
 resolve({ data: { message: 'Registration successful' } });
 }, 1500);
 });
 // return api.post('/auth/register', userData);
 },
 forgotPassword: async (email) => {
 // Mock for Phase 1
 return new Promise((resolve) => setTimeout(() => resolve({ data: { message: 'OTP sent' } }), 1000));
 // return api.post('/auth/forgot-password', { email });
 },
 verifyOTP: async (data) => {
 // Mock
 return new Promise((resolve) => setTimeout(() => resolve({ data: { message: 'OTP verified', token: 'reset-token' } }), 1000));
 // return api.post('/auth/verify-otp', data);
 },
 resetPassword: async (data) => {
 // Mock
 return new Promise((resolve) => setTimeout(() => resolve({ data: { message: 'Password reset successful' } }), 1000));
 // return api.post('/auth/reset-password', data);
 },
 getMe: async () => {
 return api.get('/auth/me');
 }
};

// ─── User Service ────────────────────────────────────────────────────────────
export const userService = {
 getProfile: async () => api.get('/users/profile'),
 updateProfile: async (data) => api.put('/users/profile', data),
 updateAvatar: async (formData) => api.put('/users/avatar', formData, {
 headers: { 'Content-Type': 'multipart/form-data' }
 }),
 changePassword: async (data) => api.put('/users/password', data),
 getAllUsers: async () => api.get('/users'),
 getUserById: async (id) => api.get(`/users/${id}`),
 deleteUser: async (id) => api.delete(`/users/${id}`),
 updateUserRole: async (id, role) => api.put(`/users/${id}/role`, { role }),
};

// ─── Workspace Service ───────────────────────────────────────────────────────
export const workspaceService = {
 getAll: async () => api.get('/workspaces'),
 getById: async (id) => api.get(`/workspaces/${id}`),
 create: async (data) => api.post('/workspaces', data),
 update: async (id, data) => api.put(`/workspaces/${id}`, data),
 delete: async (id) => api.delete(`/workspaces/${id}`),
 addMember: async (id, userId) => api.post(`/workspaces/${id}/members`, { userId }),
 removeMember: async (id, userId) => api.delete(`/workspaces/${id}/members/${userId}`),
 getMembers: async (id) => api.get(`/workspaces/${id}/members`),
};

// ─── Project Service ─────────────────────────────────────────────────────────
export const projectService = {
 getAll: async (workspaceId) => api.get('/projects', { params: { workspaceId } }),
 getById: async (id) => api.get(`/projects/${id}`),
 create: async (data) => api.post('/projects', data),
 update: async (id, data) => api.put(`/projects/${id}`, data),
 delete: async (id) => api.delete(`/projects/${id}`),
 addMember: async (id, userId) => api.post(`/projects/${id}/members`, { userId }),
 removeMember: async (id, userId) => api.delete(`/projects/${id}/members/${userId}`),
};

// ─── Task Service ────────────────────────────────────────────────────────────
export const taskService = {
 getAll: async (params) => api.get('/tasks', { params }),
 getById: async (id) => api.get(`/tasks/${id}`),
 create: async (data) => api.post('/tasks', data),
 update: async (id, data) => api.put(`/tasks/${id}`, data),
 delete: async (id) => api.delete(`/tasks/${id}`),
 updateStatus: async (id, status) => api.patch(`/tasks/${id}/status`, { status }),
 assignUser: async (id, userId) => api.patch(`/tasks/${id}/assign`, { userId }),
 addComment: async (id, content) => api.post(`/tasks/${id}/comments`, { content }),
 getComments: async (id) => api.get(`/tasks/${id}/comments`),
 addAttachment: async (id, formData) => api.post(`/tasks/${id}/attachments`, formData, {
 headers: { 'Content-Type': 'multipart/form-data' }
 }),
};

// ─── Message Service ─────────────────────────────────────────────────────────
export const messageService = {
 getAll: async (channelId) => api.get('/messages', { params: { channelId } }),
 send: async (data) => api.post('/messages', data),
 getConversation: async (userId) => api.get(`/messages/conversation/${userId}`),
 markAsRead: async (id) => api.patch(`/messages/${id}/read`),
};

// ─── Notification Service ────────────────────────────────────────────────────
export const notificationService = {
 getAll: async () => api.get('/notifications'),
 markAsRead: async (id) => api.patch(`/notifications/${id}/read`),
 markAllAsRead: async () => api.patch('/notifications/read-all'),
 delete: async (id) => api.delete(`/notifications/${id}`),
};

// ─── File Service ────────────────────────────────────────────────────────────
export const fileService = {
 upload: async (formData) => api.post('/files/upload', formData, {
 headers: { 'Content-Type': 'multipart/form-data' }
 }),
 getAll: async (params) => api.get('/files', { params }),
 delete: async (id) => api.delete(`/files/${id}`),
};

// ─── Dashboard Service ──────────────────────────────────────────────────────
export const dashboardService = {
 getStats: async () => api.get('/dashboard/stats'),
 getRecentActivity: async () => api.get('/dashboard/activity'),
};

export default api;

