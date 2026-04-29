import axios from "axios";

const API = import.meta.env.VITE_API_URL

const instance = axios.create({
  baseURL: API
});

// 🔥 interceptor yaha lagao
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default instance;