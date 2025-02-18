import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const UserDetect = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default UserDetect;

