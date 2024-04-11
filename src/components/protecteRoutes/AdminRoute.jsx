import { useLocation, Route, Navigate } from "react-router-dom";
import { isAuthenticated, userInfo } from "../../utils/auth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { role } = userInfo();
  console.log(role);

  if (role !== "admin") {
    alert("Please Log in as admin to continue");
    return <Navigate to="/user/dashboard" state={{ from: location }} replace />;
  }

  return children;
  // return <Route {...rest} element={element} />;
};

export default PrivateRoute;
