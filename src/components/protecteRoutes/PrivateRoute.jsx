import { useLocation, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  // console.log(...rest);

  if (!isAuthenticated()) {
    alert("Please Log in to continue");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
  // return <Route {...rest} element={element} />;
};

export default PrivateRoute;
