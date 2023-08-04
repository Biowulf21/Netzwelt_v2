import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/authContextProvider";

export default function ProtectedRoutes() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();


  console.log('in protected routes: ' + isLoggedIn);

  return (
    isLoggedIn === true ? <Outlet /> : <Navigate to="login" />
  );

}
