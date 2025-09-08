import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ChatProvider } from "../context/ChatContext";
import ProtectedRoute from "./ProtectedRoute";

const MainRoutes = () => {
  return (
    <ChatProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ChatProvider>
  );
};

export default MainRoutes;