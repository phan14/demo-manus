import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const currentUser = AuthService.getCurrentUser();
  
  // Check if user is logged in
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Check if route requires specific roles
  if (roles && roles.length > 0) {
    const userRoles = currentUser.roles;
    const hasRequiredRole = roles.some(role => userRoles.includes(role));
    
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
