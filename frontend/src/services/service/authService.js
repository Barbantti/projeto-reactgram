// import axios from "axios";
import { axiosInstance } from "../utils/axiosInstance";

// Register an user
const register = async (data) => {
  const response = await axiosInstance.post("/api/users/register", data);

  const responseData = response.data;

  localStorage.setItem("user", JSON.stringify(responseData));

  return responseData;
};

// Logout an user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in a user
const login = async (data) => {
  const response = await axiosInstance.post("/api/users/login", data);

  const responseData = response.data;

  localStorage.setItem("user", JSON.stringify(responseData));

  return responseData;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
