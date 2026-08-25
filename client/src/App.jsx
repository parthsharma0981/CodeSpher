import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import { useAuth } from './hooks/useAuth';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OTPVerification from './pages/OTPVerification';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Workspace from './pages/Workspace';
import WorkspaceDetail from './pages/WorkspaceDetail';
import Project from './pages/Project';
import TaskBoard from './pages/TaskBoard';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Notifications from './pages/Notifications';
import NotFound from './pages/NotFound';

// Components
import LoadingSpinner from './components/common/LoadingSpinner';
import Toast from './components/common/Toast';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <>
      <Toast />
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path={ROUTES.HOME} element={<LandingPage />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={ROUTES.VERIFY_OTP} element={<OTPVerification />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.WORKSPACES} element={<Workspace />} />
            <Route
              path={ROUTES.WORKSPACE_DETAIL}
              element={<WorkspaceDetail />}
            />
            <Route path={ROUTES.PROJECTS} element={<Project />} />
            <Route path={ROUTES.PROJECT_DETAIL} element={<Project />} />
            <Route path={ROUTES.TASK_BOARD} element={<TaskBoard />} />
            <Route path={ROUTES.TASKS} element={<TaskBoard />} />
            <Route path={ROUTES.CHAT} element={<Chat />} />
            <Route path={ROUTES.CALENDAR} element={<Calendar />} />
            <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.ADMIN} element={<AdminPanel />} />
            <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
          </Route>

          {/* 404 Route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
