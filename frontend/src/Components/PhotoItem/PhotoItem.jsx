import "./CSS/PhotoItem.css";

import PropTypes from "prop-types";

// Axios
import { axiosInstance } from "../../services/utils/axiosInstance";

// Hooks
import { Link } from "react-router-dom";

//`${axiosInstance.defaults.baseURL}uploads/users/${user.profileImage}`

const PhotoItem = ({ photo }) => {
  return (
    <div className="photo-item">
      {photo.image && (
        <img
          src={`${axiosInstance.defaults.baseURL}uploads/photos/${photo.image}`}
          alt={photo.title}
        />
      )}
      <h2>{photo.title}</h2>
      <p className="photo-author">
        Published by:
        <Link to={`/users/${photo.userId}`}> {photo.userName}</Link>
      </p>
    </div>
  );
};

PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default PhotoItem;
