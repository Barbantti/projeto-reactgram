import { axiosInstance } from "../utils/axiosInstance";

// Publish photo an user photo, need:photo (user), token(from state of user on localStorage for validation)

const publishPhoto = async (photo, token) => {
  const response = await axiosInstance.post("/api/photos", photo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get user photos
const getUserPhotos = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/api/photos/user/${id}`, {
      headers: {
        user: id,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Get getUserPhotos Profile route error:: ", error);
  }
};

// Delete a photo
const deletePhoto = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/api/photos/${id}`, {
      headers: {
        user: id,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Delete deletePhoto Profile route error: ", error);
  }
};

// Update a photo
const updatePhoto = async (data, id, token) => {
  try {
    const response = await axiosInstance.put(`/api/photos/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Put updatePhoto Profile route error: ", error);
  }
};

// Get photo by id
const getPhoto = async (id, token) => {
  try {
    const response = await axiosInstance.get(`api/photos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Get getPhoto Profile route error: ", error);
  }
};

// Like a photo
const like = async (id, token) => {
  try {
    const response = await axiosInstance.put(
      `/api/photos/like/${id}`,
      {},
      {
        headers: {
          id: id,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Put like route error: ", error);
  }
};

// Add comment to a photo
const comment = async (data, id, token) => {
  try {
    const response = await axiosInstance.put(
      `/api/photos/comment/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Put comment route error: ", error);
  }
};

// Get all photos
const getPhotos = async (token) => {
  try {
    const response = await axiosInstance.get("/api/photos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Get getPhotos route error: ", error);
  }
};

// Search photo by title
const searchPhotos = async (query, token) => {
  try {
    const response = await axiosInstance.get(`/api/photos/search?q=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Get searchPhotos route error: ", error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  like,
  comment,
  getPhotos,
  searchPhotos,
};

export default photoService;
