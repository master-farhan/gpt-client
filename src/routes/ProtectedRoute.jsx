import React from "react";
import { Navigate } from "react-router-dom";
import { useChat } from "../context/ChatContext"; // Ensure the path is correct

const ProtectedRoute = ({ children }) => {
  const { user } = useChat();

  // Redirect to the login page if the user is not authenticated.
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the child components.
  return children;
};

export default ProtectedRoute;