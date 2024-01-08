import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
});
const user = localStorage.getItem("user");
user &&  (axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(user)?.token}`);

export default axiosInstance;
