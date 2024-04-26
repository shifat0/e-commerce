import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";
import { useEffect, useState } from "react";
import { getOrderOfUser } from "../../api/apiOrder";

const Dashboard = () => {
  const [PurchasedProducts, setPurchasedProducts] = useState([]);
  const { name, email, role, token, _id } = userInfo();

  useEffect(() => {
    getOrderOfUser(token, _id).then((response) =>
      setPurchasedProducts(response.data)
    );
  }, []);

  const UserLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/user/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="#">
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const PurchaseHistory = () => (
    <div className="card mb-5">
      <h3 className="card-header">Purchase History</h3>
      <ul className="list-group">
        {[...PurchasedProducts].reverse().map((product) => (
          <li key={product._id} className="list-group-item d-flex flex-column">
            <span>Name: {name}</span>
            <span>
              Address: {product.address.address1 + product.address.city}
            </span>
            <span>Phone: {product.address.phone}</span>
            <div className="d-flex flex-column ">
              Ordered Items:
              {product.cartItems.map((item) => (
                <div key={item._id} className="ml-4 d-flex flex-column">
                  <span>product: {item.product.name}</span>
                  <span>price: {item.price}</span>
                  <span>count: {item.count}</span>
                </div>
              ))}
            </div>
            <span>Payment Status: {product.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const UserInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role}</li>
      </ul>
    </div>
  );

  return (
    <section>
      <div className="row">
        <div className="col-sm-3">
          <UserLinks />
        </div>
        <div className="col-sm-9">
          <UserInfo />
          <PurchaseHistory />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
