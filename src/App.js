// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { useAuth } from './context/AuthContext';
import './App.css';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "./AuthContext";

const App = () => {
  const { token } = useAuth();

  return (
    <div className='app'>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes wrapped in PrivateRoute */}
            <Route element={<PrivateRoute />}>
              <Route>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/hcm" element={<HCM />} />
                <Route path="/tenants/createTenant" element={<PopupPage />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/visits" element={<Visits />} />
                <Route path="/communication" element={<Communication />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
