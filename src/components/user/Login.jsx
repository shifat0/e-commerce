import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showError, showLoading } from "../../utils/messages";
import { login } from "../../api/apiAuth";
import { authenticate, userInfo } from "../../utils/auth";

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
      {signInForm()}
      <hr />
    </section>
  );
};

export default Login;
