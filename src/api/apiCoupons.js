import axios from "axios";
import { API } from "../utils/config";

export const createCoupon = (token, data) => {
  return axios.post(`${API}/coupon`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCoupon = () => {
  return axios.get(`${API}/coupon`);
};
