import "./CSS/EditProfile.css";

// Axios
import { axiosInstance } from "../../services/utils/axiosInstance";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import {
  profile,
  updateProfile,
  resetMessage,
} from "../../services/slices/userSlice";

// Components
import LoadingSpinner from "../../Components/Loading/Loading";
import Modal from "../../Components/Modal/Modal";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather user data from states
    const userData = {
      name,
    };
    if (profileImage) {
      userData.profileImage = profileImage;
    }
    if (bio) {
      userData.bio = bio;
    }
    if (password) {
      userData.password = password;
    }

    // Build form data
    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 4000);
  };

  // Show or not Error modal and Error message;
  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 4000);
    }
  }, [error]);

  // Send file
  const handleFile = (e) => {
    // Image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // Update image state
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edit your profile</h2>
      <p className="subtitle">
        Add a profile picture and tell more about yourself
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${axiosInstance.defaults.baseURL}uploads/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={() => {}}
          value={email || ""}
        />
        <label>
          <span>Profile image:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Profile description"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Would you like to change your password?</span>
          <input
            type="password"
            placeholder="New password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>

        {!loading && <input type="submit" value="Update" />}
        {loading && <input type="submit" value="Wait" disabled />}
        {loading && <LoadingSpinner />}
        {showErrorModal && error && <Modal msg={error} type="error" />}
        {message && <Modal msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
