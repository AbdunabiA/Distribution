import axios from "axios";
import storage from "services/storage";

const api = axios.create({
  baseURL: "https://paymentstest-60d8729405f3.herokuapp.com/api/v1/",
  timeout: 30000,
});

api.defaults.params = {};
api.defaults.headers.common["Accept"] = "application/json";
api.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";

api.interceptors.request.use(
  (configs) => {
    const token = storage.get("token") || "";
    if (token) {
      configs.headers.Authorization = `Bearer ${token}`;
    }
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
