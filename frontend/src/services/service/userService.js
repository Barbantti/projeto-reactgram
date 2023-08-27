import { axiosInstance } from "../utils/axiosInstance";

// Get user details
const profile = async (token) => {
  try {
    const response = await axiosInstance.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return console.log("Get profile route error: ", error);
  }
};

// Update user details
const updateProfile = async (user, token) => {
  try {
    const response = await axiosInstance.put("/api/users/", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return console.log("Put updateProfile route error: ", error);
  }
};

// Get user details
const getUserDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/users/${id}`, {
      headers: {
        user: id,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Get getUserDetails Profile route error:: ", error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
