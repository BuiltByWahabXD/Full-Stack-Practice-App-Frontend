// src/auth/AuthProvider.jsx
import { createContext, useState, useEffect, useContext, useRef } from "react";
import { apiFetch } from "../api/api";

export const AuthContext = createContext();

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [loading, setLoading] = useState(true);
  const hasCheckedAuth = useRef(false);

  // Check if user is authenticated on mount (has valid cookies)
  useEffect(() => {
    // Prevent duplicate calls in StrictMode
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const checkAuth = async () => {
      // Only check auth if localStorage says user was authenticated
      const storedAuth = localStorage.getItem("isAuthenticated");
      
      if (storedAuth !== "true") {
        // User was not authenticated, skip the check
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/refresh`, {
          method: "POST",
          headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
        
        console.log("Auth check response status:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("Auth check data:", data);
          if (data.success) {
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
            
            // Use apiFetch which handles token refresh automatically
            try {
              const userData = await apiFetch("/api/users/me");
              if (userData.success) {
                setUser(userData.data);
                console.log("User data loaded:", userData.data);
              }
            } catch (error) {
              console.error("Failed to load user data:", error);
              // Even if /me fails, we're still authenticated if refresh worked
              setIsAuthenticated(true);
              localStorage.setItem("isAuthenticated", "true");
            }
          } else {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("isAuthenticated");
          }
        } else {
          // No valid cookies
          console.log("Auth check failed - no valid cookies");
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem("isAuthenticated");
        }
      } catch (error) {
        // No valid cookies, user needs to login
        console.log("Auth check error:", error);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("isAuthenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Auto-refresh tokens before they expire
  useEffect(() => {
    if (!isAuthenticated) return;

    // Refresh token every 50 seconds (before the 1 minute expiry)
    const interval = setInterval(async () => {
      try {
        console.log("Auto-refreshing token...");
        await fetch(`${import.meta.env.VITE_API_URL}/api/users/refresh`, {
          method: "POST",
          headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
      } catch (error) {
        console.error("Auto-refresh failed:", error);
      }
    }, 50000); // 50 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
