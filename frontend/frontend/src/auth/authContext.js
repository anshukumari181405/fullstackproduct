// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    
    if (storedToken && storedUsername && storedEmail) {
      setUser({ token: storedToken, username: storedUsername, email: storedEmail });
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
