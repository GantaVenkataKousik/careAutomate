// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Tenants from './components/Tenants';
import Hcms from './components/Hcms';
import Appointments from './components/Appointment/Appointments.js';
import Visits from './components/visitpage/Visits.js';
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
import PopupPageHCM from './components/createhcm/PopupPageHCM.js'
import DummyDashboard from './components/DummyDashboard';
import { FaDownload } from 'react-icons/fa';
import PlanUsage from './components/PlanUsage';
import Onboarding from './components/Onboarding.js';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const noNavSidebarRoutes = ['/login', '/signup'];
  const showNavAndSidebar = !noNavSidebarRoutes.includes(location.pathname);

  return (
    <>
      <div className='careAutomate'>
        {showNavAndSidebar && <Navbar />}
        <div className="main-content">
          {showNavAndSidebar && <Sidebar />}
          <div className="content">{children}</div>
        </div>
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
            <Route path="/dashboard" element={<AppLayout><DummyDashboard /></AppLayout>} />
            <Route path="/tenants/tenantProfile" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/tenants" element={<AppLayout><Tenants /></AppLayout>} />
            <Route path="/tenants/createTenant" element={<AppLayout><PopupPage /></AppLayout>} />
            <Route path="/hcms/createHcm" element={<AppLayout><PopupPageHCM /></AppLayout>} />
            <Route path="/hcms" element={<AppLayout><Hcms /></AppLayout>} />
            <Route path="/appointments" element={<AppLayout><Appointments /></AppLayout>} />
            <Route path="/visits" element={<AppLayout><Visits /></AppLayout>} />
            <Route path="/communication" element={<AppLayout><Communication /></AppLayout>} />
            <Route path="/reports" element={<AppLayout><Reports /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
            <Route path="/onBoarding" element={<Onboarding />} />
            <Route path="/tenants/planUsage" element={<AppLayout><PlanUsage /></AppLayout>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
