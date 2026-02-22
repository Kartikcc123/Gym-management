import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // Your custom hook

const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  
  if (!allowedRoles.includes(user.role)) {
    return <div className="p-10 text-center text-red-500">Access Denied: You do not have permission.</div>;
  }

  return <Outlet />;
};

export default RoleRoute;