// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const user = localStorage.getItem('user');
        try {
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error parsing user JSON:', error);
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem('token');
        return savedToken || null;
    });

    useEffect(() => {
        const user = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if (user) {
            try {
                setCurrentUser(JSON.parse(user));
            } catch (error) {
                console.error('Error parsing user JSON:', error);
                setCurrentUser(null);
            }
        }
        setToken(savedToken || null);
    }, []);

    const login = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setCurrentUser(user);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
