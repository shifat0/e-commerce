import { useState } from "react";
import { showError, showLoading, showSuccess } from "../../utils/messages";
import { Link } from "react-router-dom";
import { createCoupon } from "../../api/apiCoupons";
import { userInfo } from "../../utils/auth";

export default function CreateCoupon() {
  const [values, setValues] = useState({
    name: "",
    discount: "",
    error: false,
    success: false,
    loading: false,
  });

  const { name, discount, error, success, loading } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
      error: false,
      success: false,
    });

    createCoupon(userInfo().token, { name: name, discount: discount })
      .then((response) => {
        setValues({
          name: "",
          discount: "",
          error: false,
          success: response.data.message,
          loading: false,
        });
      })
      .catch((err) => {
        if (err.response)
          setValues({
            ...values,
            success: false,
            error: err.response.data,
            loading: false,
          });
        else
          setValues({
            ...values,
            success: false,
            error: "Something went wrong!",
            loading: false,
          });
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
    });
  };

  const couponForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Coupon Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Discount</label>
          <input
            name="discount"
            type="text"
            onChange={handleChange}
            value={discount}
            autoFocus
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Create Coupon
        </button>
      </form>
    );
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Go to Dashboard
      </Link>
    </div>
  );

  return (
    <section>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading(loading)}
          {showError(error, error)}
          {showSuccess(success, "Coupon Created!")}
          {couponForm()}
          {goBack()}
        </div>
      </div>
    </section>
  );
}
