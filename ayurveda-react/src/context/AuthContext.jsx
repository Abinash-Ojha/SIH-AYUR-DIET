import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // redirect to homepage
  };

  // Helper to get auth header
  const authHeader = () => {
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, authHeader }}>
      {children}
    </AuthContext.Provider>
  );
};
