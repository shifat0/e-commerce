import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";

const AdminDashboard = () => {
  const { name, email, role } = userInfo();
  const UserLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/create/coupon">
              Create Coupon
            </Link>
          </li>
        </ul>
      </div>
    );
  };

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
    <section className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <UserLinks />
        </div>
        <div className="col-sm-9">
          <UserInfo />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
