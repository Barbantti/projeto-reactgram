import "./CSS/Auth.css";
// Components
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/Loading/Loading";
import Modal from "../../Components/Modal/Modal";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../services/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  // Clean all form states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // Show or not Error modal and Error message;
  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
      setTimeout(() => {}, 4000);
    }
  }, [error]);

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Login to see your friends&apos; photos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input type="submit" value="To enter" />
        {user && <p>Login successfully!</p>}
        {showErrorModal && error && <Modal msg={error} type="error" />}
        {loading && <LoadingSpinner />}
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
