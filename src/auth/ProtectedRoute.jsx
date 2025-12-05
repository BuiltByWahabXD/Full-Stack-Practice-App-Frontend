// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import AppBar from "../pages/AppBar";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <AppBar />
      <main style={{ paddingTop: 16, color:"darkorange" }}>
        {children}
      </main>
    </>
  );
}
