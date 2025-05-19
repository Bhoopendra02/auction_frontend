import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token || !user) {
    // Redirect to login if not authenticated
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'seller':
        return <Navigate to="/seller/dashboard" replace />;
      case 'user':
        return <Navigate to="/user/dashboard/profile" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 