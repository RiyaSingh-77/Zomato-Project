import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://zomato-backend-ajqm.onrender.com",
  withCredentials: true
});

export default axiosInstance;