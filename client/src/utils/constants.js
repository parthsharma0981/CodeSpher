export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const TASK_STATUS = {
 BACKLOG: 'backlog',
 TODO: 'todo',
 IN_PROGRESS: 'in-progress',
 REVIEW: 'review',
 TESTING: 'testing',
 COMPLETED: 'completed',
};

export const TASK_PRIORITY = {
 LOW: 'LOW',
 MEDIUM: 'MEDIUM',
 HIGH: 'HIGH',
 URGENT: 'URGENT',
};

export const USER_ROLES = {
 ADMIN: 'ADMIN',
 MEMBER: 'MEMBER',
 VIEWER: 'VIEWER',
};

export const ROUTES = {
 HOME: '/',
 LOGIN: '/login',
 REGISTER: '/register',
 FORGOT_PASSWORD: '/forgot-password',
 RESET_PASSWORD: '/reset-password',
 VERIFY_OTP: '/verify-otp',
 DASHBOARD: '/dashboard',
 WORKSPACES: '/workspaces',
 WORKSPACE_DETAIL: '/workspaces/:id',
 PROJECTS: '/projects',
 PROJECT_DETAIL: '/projects/:id',
 TASK_BOARD: '/projects/:id/board',
 TASKS: '/tasks',
 CHAT: '/chat',
 CALENDAR: '/calendar',
 ANALYTICS: '/analytics',
 SETTINGS: '/settings',
 PROFILE: '/profile',
 ADMIN: '/admin',
 NOTIFICATIONS: '/notifications',
};
