// AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null); // Store token
  const [user, setUser] = useState(null);   // Store user data

  useEffect(() => {
    // Check if token exists in localStorage on initial load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) {
      setIsAuthenticated(true);
      console.log(isAuthenticated);
      setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const login = (token, user) => {
    setIsAuthenticated(true);
    console.log(isAuthenticated,'login');
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
