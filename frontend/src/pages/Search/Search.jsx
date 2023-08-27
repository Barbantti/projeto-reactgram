import "./CSS/Search.css";

// Hooks
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Components
import LikeContainer from "../../Components/LikeContainer/LikeContainer";
import LoadingSpinner from "../../Components/Loading/Loading";
import PhotoItem from "../../Components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";

// Redux
import { searchPhotos, like } from "../../services/slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);
  // Load photos
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  // Like a photo
  const handleLike = (photo = null) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    <LoadingSpinner />;
  }

  return (
    <div id="search">
      <h2>Searching by: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              See more
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">Search not find</h2>
      )}
    </div>
  );
};

export default Search;
