import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // No token or user
  if (!token || !user.email) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
