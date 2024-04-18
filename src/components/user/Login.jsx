import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { showError, showLoading } from "../../utils/messages";
import { login } from "../../api/apiAuth";
import { authenticate, userInfo } from "../../utils/auth";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    disabled: false,
  });

  const navigate = useNavigate();
  const { state } = useLocation();

  const { email, password, loading, error, disabled } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true, disabled: true });

    login({ email, password })
      .then((response) => {
        authenticate(response.data.token, () => {
          setValues({
            email: "",
            password: "",
            success: true,
            disabled: false,
            loading: false,
          });

          const { role } = userInfo();
          role === "admin"
            ? navigate(`/${role}/dashboard`)
            : state?.from
            ? navigate(`${state?.from?.pathname}`)
            : navigate("/");
        });
      })
      .catch((err) => {
        let errMsg = "Something went wrong!";
        if (err.response) {
          errMsg = err.response.data;
        } else {
          errMsg = "Something went wrong!";
        }
        setValues({
          ...values,
          error: errMsg,
          disabled: false,
          loading: false,
        });
      });
  };

  const signInForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Email:</label>
        <input
          name="email"
          type="email"
          className="form-control"
          value={email}
          required
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          className="form-control"
          value={password}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={disabled}
      >
        Login
      </button>
    </form>
  );

  return (
    <section>
      {showLoading(loading)}
      {showError(error, error)}
      <h3>Login Here,</h3>
      <hr />
      <div className="d-flex flex-column">
        <Link
          to="http://localhost:5000/auth/google"
          type="button"
          className="btn btn-secondary d-flex justify-content-center align-items-center"
        >
          <img
            src="/google-icon.png"
            style={{ height: "20px", width: "20px", marginRight: "15px" }}
          />
          <span>Sign in with google</span>
        </Link>
        <Link
          to="http://localhost:5000/auth/facebook"
          type="button"
          className="btn btn-primary my-4 d-flex justify-content-center align-items-center"
        >
          <img
            src="/facebook-logo.png"
            style={{ height: "20px", width: "20px", marginRight: "15px" }}
          />
          <span>Sign in with Facebook</span>
        </Link>
      </div>
      {signInForm()}
      <hr />
    </section>
  );
};

export default Login;
