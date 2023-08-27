import "./CSS/Photo.css";
// Axios
import { axiosInstance } from "../../services/utils/axiosInstance";

//`${axiosInstance.defaults.baseURL}uploads/users/${user.profileImage}`

// Components
import LoadingSpinner from "../../Components/Loading/Loading";
import Modal from "../../Components/Modal/Modal";
import PhotoItem from "../../Components/PhotoItem/PhotoItem";
import LikeContainer from "../../Components/LikeContainer/LikeContainer";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getPhoto, like, comment } from "../../services/slices/photoSlice";

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const [commentText, setCommentText] = useState("");

  // Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // Like and comment
  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  // Insert a comment form
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };
    dispatch(comment(commentData));

    setCommentText("");

    resetMessage();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Modal msg={error} type="error" />}
        {message && <Modal msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments ? (
          <>
            <h3>Comments: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insert a comment"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Send" />
            </form>
            {photo.comments.length === 0 && <p>There&apos;s no comments</p>}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${axiosInstance.defaults.baseURL}uploads/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default Photo;
