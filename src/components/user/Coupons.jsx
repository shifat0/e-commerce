import { useEffect, useState } from "react";
import { getCoupon } from "../../api/apiCoupons";

export default function Coupons() {
  const [couponList, setCouponList] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(
    localStorage.getItem("coupon")
      ? JSON.parse(localStorage.getItem("coupon"))
      : null
  );

  useEffect(() => {
    getCoupon().then((res) => setCouponList(res.data));
  }, []);

  const handleCoupon = (coupon) => {
    localStorage.setItem("coupon", JSON.stringify(coupon));
    setSelectedCoupon(coupon);
  };

  return (
    <div className="card mb-5">
      <h3 className="card-header">Coupons ({couponList.length})</h3>
      <ul className="list-group">
        {couponList.map((coupon) => (
          <li
            key={coupon._id}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <div className="d-flex flex-column">
              <span>Coupon Name: {coupon.name}</span>
              <span>Coupon Discount: {coupon.discount} TK</span>
            </div>
            <div>
              <button
                onClick={() => handleCoupon(coupon)}
                disabled={selectedCoupon}
                className="btn btn-success"
                style={
                  selectedCoupon && { cursor: "not-allowed", opacity: "30%" }
                }
              >
                Add this coupon
              </button>
              {selectedCoupon._id === coupon._id && (
                <button
                  onClick={() => handleCoupon(coupon)}
                  className="btn btn-danger ml-4"
                  style={
                    selectedCoupon && { cursor: "not-allowed", opacity: "30%" }
                  }
                >
                  Remove this coupon
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
