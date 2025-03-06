import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const ProtectAdmin = ({ children }) => {
  const { user, isLoading ,getUser} = useContext(AuthContext);
  const location = useLocation();
  const userInfo = getUser()
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user && userInfo.role === "admin") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectAdmin;