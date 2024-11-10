// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Tenants from './components/Tenants';
import HCM from './components/HCM';
import Appointments from './components/Appointments';
import Visits from './components/Visits';
import Communication from './components/Communication';
import Reports from './components/Reports';
import Settings from './components/Settings';
import PopupPage from './components/createTenant/PopupPage.js';
import LoginForm from './components/auth/LoginForm.js';
import Signup from './components/auth/Signup.js';
import './App.css';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "./AuthContext";
import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const noNavSidebarRoutes = ['/login', '/signup'];
  const showNavAndSidebar = !noNavSidebarRoutes.includes(location.pathname);

  return (
    <>
      {showNavAndSidebar && <Navbar />}
      <div className="main-content">
        {showNavAndSidebar && <Sidebar />}
        <div className="content">{children}</div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect to login if not authenticated */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
       
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/tenants" element={<AppLayout><Tenants /></AppLayout>} />
            <Route path="/hcm" element={<AppLayout><HCM /></AppLayout>} />
            <Route path="/appointments" element={<AppLayout><Appointments /></AppLayout>} />
            <Route path="/visits" element={<AppLayout><Visits /></AppLayout>} />
            <Route path="/communication" element={<AppLayout><Communication /></AppLayout>} />
            <Route path="/reports" element={<AppLayout><Reports /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
