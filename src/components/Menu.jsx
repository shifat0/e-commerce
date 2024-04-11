import { Link, useNavigate, useLocation } from "react-router-dom";
import { singout, isAuthenticated, userInfo } from "../utils/auth";

const Menu = () => {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;

  const isActive = (path) => {
    if (pathName === path) {
      return { color: "#ff9900" };
    } else {
      return { color: "grey" };
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive("/")}>
            Home
          </Link>
        </li>
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={isActive("/login")}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/register"
                style={isActive("/register")}
              >
                Register
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/${userInfo().role}/dashboard`}
                style={isActive(`${userInfo().role}/dashboard`)}
              >
                Dashboard
              </Link>
            </li>
            {userInfo().role === "user" && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/user/cart"
                  style={isActive("/user/cart")}
                >
                  Cart
                </Link>
              </li>
            )}
            <li className="nav-item">
              <span
                className="nav-link"
                onClick={() => {
                  singout(() => {
                    navigate("/login");
                  });
                }}
              >
                {" "}
                Log Out
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
