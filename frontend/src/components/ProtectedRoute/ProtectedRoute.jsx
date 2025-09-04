import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, ...props }) => {
  return loggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
