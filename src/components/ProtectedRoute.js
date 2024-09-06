import React from "react";
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
   
    const token = localStorage.getItem("token"); 

  
    const isAuthenticated =  token;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
