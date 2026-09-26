import axios from 'axios';
import { API_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
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
    if (error.response && error.response.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth Service ────────────────────────────────────────────────────────────
export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },

  verifyOTP: async (data) => {
    const res = await api.post('/auth/verify-otp', data);
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await api.post('/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async (data) => {
    const res = await api.post('/auth/reset-password', data);
    return res.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getMe: async () => {
    const res = await api.get('/users/me');
    return res.data;
  },
};

// ─── Workspace Service ───────────────────────────────────────────────────────
export const workspaceService = {
  getAll: async () => {
    const res = await api.get('/workspaces');
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/workspaces/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/workspaces', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/workspaces/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/workspaces/${id}`);
    return res.data;
  },

  getMembers: async (id) => {
    const res = await api.get(`/workspaces/${id}/members`);
    return res.data;
  },

  inviteMember: async (id, data) => {
    const res = await api.post(`/workspaces/${id}/invite`, data);
    return res.data;
  },

  removeMember: async (workspaceId, userId) => {
    const res = await api.delete(`/workspaces/${workspaceId}/members/${userId}`);
    return res.data;
  },
};

// ─── Project Service ─────────────────────────────────────────────────────────
export const projectService = {
  getAll: async (workspaceId) => {
    const url = workspaceId ? `/projects/workspace/${workspaceId}` : '/projects';
    const res = await api.get(url);
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/projects/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/projects', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/projects/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  },

  addMember: async (id, userId) => {
    const res = await api.post(`/projects/${id}/members`, { userId });
    return res.data;
  },

  removeMember: async (id, userId) => {
    const res = await api.delete(`/projects/${id}/members/${userId}`);
    return res.data;
  },
};

// ─── Task Service ────────────────────────────────────────────────────────────
export const taskService = {
  getAll: async (projectId) => {
    const url = projectId ? `/tasks/project/${projectId}` : '/tasks';
    const res = await api.get(url);
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/tasks', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
  },

  updateStatus: async (id, status, order) => {
    const res = await api.put(`/tasks/${id}/status`, { status, order });
    return res.data;
  },

  assign: async (id, userId) => {
    const res = await api.put(`/tasks/${id}/assign`, { userId });
    return res.data;
  },

  addComment: async (id, content) => {
    const res = await api.post(`/tasks/${id}/comments`, { content });
    return res.data;
  },

  toggleChecklist: async (id, checklistId, completed) => {
    const res = await api.put(`/tasks/${id}/checklist`, { checklistId, completed });
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
  },
};

// ─── Chat / Message Service ──────────────────────────────────────────────────
export const chatService = {
  getWorkspaceMessages: async (workspaceId) => {
    const res = await api.get(`/messages/workspace/${workspaceId}`);
    return res.data;
  },

  getConversation: async (userId) => {
    const res = await api.get(`/messages/conversation/${userId}`);
    return res.data;
  },

  sendMessage: async (data) => {
    const res = await api.post('/messages/send', data);
    return res.data;
  },

  deleteMessage: async (id) => {
    const res = await api.delete(`/messages/${id}`);
    return res.data;
  },
};

// ─── Notification Service ────────────────────────────────────────────────────
export const notificationService = {
  getAll: async () => {
    const res = await api.get('/notifications');
    return res.data;
  },

  markAsRead: async (id) => {
    const res = await api.put(`/notifications/${id}/read`);
    return res.data;
  },

  markAllAsRead: async () => {
    const res = await api.put('/notifications/read-all');
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`/notifications/${id}`);
    return res.data;
  },
};

// ─── Dashboard Service ───────────────────────────────────────────────────────
export const dashboardService = {
  getStats: async () => {
    const res = await api.get('/dashboard/stats');
    return res.data;
  },

  getRecentActivity: async () => {
    const res = await api.get('/dashboard/activity');
    return res.data;
  },
};

// ─── User Service ────────────────────────────────────────────────────────────
export const userService = {
  getMe: async () => {
    const res = await api.get('/users/me');
    return res.data;
  },

  getAll: async (params) => {
    const res = await api.get('/users', { params });
    return res.data;
  },

  updateProfile: async (id, data) => {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  },

  changePassword: async (data) => {
    const res = await api.put('/users/change-password', data);
    return res.data;
  },

  updateAvatar: async (avatarUrl) => {
    const res = await api.put('/users/avatar', { avatarUrl });
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};

export default api;
