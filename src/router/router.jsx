import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/user/Login";
import Register from "../components/user/Register";
import ProductDetails from "../components/home/ProductDetails";
import PrivateRoute from "../components/protecteRoutes/PrivateRoute";
import AdminRoute from "../components/protecteRoutes/AdminRoute";
import Dashboard from "../components/user/Dashboard";
import Layout from "../components/Layout";
import Cart from "../components/order/Cart";
import ShippingAddress from "../components/order/ShippingAddress";
import Checkout from "../components/order/Checkout";
import AdminDashboard from "../components/admin/AdminDashboard";
import CreateCategory from "../components/admin/CreateCategory";
import CreateProduct from "../components/admin/CreateProduct";
import Payment from "../components/order/Payment";
import Coupons from "../components/user/Coupons";
import CreateCoupon from "../components/admin/CreateCoupon";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="product/:id" element={<ProductDetails />} />

      <Route path="user">
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="coupons"
          element={
            <PrivateRoute>
              <Coupons />
            </PrivateRoute>
          }
        />
        <Route
          path="shipping"
          element={
            <PrivateRoute>
              <ShippingAddress />
            </PrivateRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="admin">
        <Route
          path="dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="create/category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />

        <Route
          path="create/product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="create/coupon"
          element={
            <AdminRoute>
              <CreateCoupon />
            </AdminRoute>
          }
        />
      </Route>
    </Route>
  )
);
