import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
   
    const token = localStorage.getItem("token"); 
   
    
    const isAuthenticated =  token;
      console.log(isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
