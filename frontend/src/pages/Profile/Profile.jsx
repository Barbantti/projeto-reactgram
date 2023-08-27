import "./CSS/Profile.css";

// Axios
import { axiosInstance } from "../../services/utils/axiosInstance";

// Components
import LoadingSpinner from "../../Components/Loading/Loading";
import Modal from "../../Components/Modal/Modal";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../services/slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../services/slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);

  const [title, setTile] = useState("");
  const [image, setImage] = useState("");

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const resetComponentMessage = useCallback(async () => {
    await setTimeout(() => {
      dispatch(resetMessage());
      setShowErrorModal(false);
      setShowMessageModal(false);
    }, 4000);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // Build form data
    const formData = new FormData();
    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );
    await dispatch(publishPhoto(formData)).then(() => {
      setTile("");
      resetComponentMessage();
    });
  };

  // Show or not Error modal and Error message;
  useEffect(() => {
    if (errorPhoto) {
      setShowErrorModal(true);
      const errorTimeout = setTimeout(() => {
        setShowErrorModal(false);
        resetComponentMessage();
      }, 4000);
      return clearTimeout(errorTimeout);
    }

    if (messagePhoto) {
      setShowMessageModal(true);
      const messageTimeout = setTimeout(() => {
        setShowMessageModal(false);
        resetComponentMessage();
      }, 4000);
      return clearTimeout(messageTimeout);
    }
  }, [errorPhoto, messagePhoto, resetComponentMessage]);

  // Delete a photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id)).then(() => {
      resetComponentMessage();
    });
  };

  // Show or hide forms
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  };

  // Update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  };

  // Check if edit form is open
  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };
  // Cancel data update
  const handleCancelEdit = () => {
    hideOrShowForms();
  };

  if (loading || loadingPhoto) {
    return <LoadingSpinner />;
  }
  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img
            src={`${axiosInstance.defaults.baseURL}uploads/users/${user.profileImage}`}
            alt={user.name}
          />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Share some moment of yours:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Photo title:</span>
                <input
                  type="text"
                  placeholder="Insert a title"
                  onChange={(e) => setTile(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Image:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loading && <input type="submit" value="Post" />}
              {loading && <input type="submit" value="Wait" disabled />}
            </form>
          </div>
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editing: </p>
            {editImage && (
              <img
                src={`${axiosInstance.defaults.baseURL}uploads/photos/${editImage}`}
                alt={editTitle}
              />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />
              <input type="submit" value="Update" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancel edit
              </button>
            </form>
          </div>
          {loading && <LoadingSpinner />}
          {showErrorModal && errorPhoto && (
            <Modal msg={errorPhoto} type="error" />
          )}
          {showMessageModal && <Modal msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h2>Images shared:</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${axiosInstance.defaults.baseURL}uploads/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`api/photos/${photo._id}`}>
                    See
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 ? <p></p> : <p></p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
