import axios from "axios";
const createAxiosInstance = () => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") || "")
    : "";
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios.create({
    baseURL: "/api",
    // baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    headers,
  });
};

const axiosInstance = createAxiosInstance();
export default axiosInstance;
