import Menu from "./Menu";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="mb-3">
        <Menu />
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
