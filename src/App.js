import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tenants from './components/Tenants';
import Appointments from './components/Appointments';
import Calendar from './components/Calendar';
import Messages from './components/Messages';
import Reports from './components/Reports';
import Settings from './components/Settings';
import './App.css';
import PopupPage from './components/createTenant/PopupPage.js';
import LoginForm from './components/auth/LoginForm.js';
import Signup from './components/auth/Signup.js';
const AppLayout = ({ children }) => {
  const location = useLocation();

  // Define the routes where Navbar and Sidebar should not be shown
  const noNavSidebarRoutes = ['/signin', '/signup'];

  const showNavAndSidebar = !noNavSidebarRoutes.includes(location.pathname);

  return (
    <>
      {showNavAndSidebar && <Navbar />}
      <div className="main-content">
        {showNavAndSidebar && <Sidebar />}
        <div className="content">
          {children}
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} exact />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={
          <AppLayout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/tenants/createTenant" element={<PopupPage />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;

