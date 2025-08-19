import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // 👀 Si no está logueado, lo mando al login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;