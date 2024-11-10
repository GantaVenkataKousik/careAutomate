// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
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
import { useAuth } from './context/AuthContext'; // Import useAuth
import './App.css';

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
  const { token } = useAuth(); // Access authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (token){
      setIsAuthenticated(true);
    }
    else{
      setIsAuthenticated(false);
    }
  }, [token]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <AppLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tenants" element={<Tenants />} />
                  <Route path="/hcm" element={<HCM />} />
                  <Route path="/tenants/createTenant" element={<PopupPage />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/visits" element={<Visits />} />
                  <Route path="/communication" element={<Communication />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
