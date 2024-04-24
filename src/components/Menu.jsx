import { Link, useNavigate, useLocation } from "react-router-dom";
import { singout, isAuthenticated, userInfo } from "../utils/auth";
import { useState } from "react";

const Menu = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const pathName = useLocation().pathname;

  const isActive = (path) => {
    if (pathName === path) {
      return { color: "#ff9900" };
    } else {
      return { color: "grey" };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`?search=${searchValue}`);
  };

  const handleChange = (e) => setSearchValue(e.target.value);

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
                style={{ color: "gray", cursor: "pointer" }}
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
      <form
        className="form-inline my-2 my-lg-0"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          name="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </nav>
  );
};

export default Menu;
