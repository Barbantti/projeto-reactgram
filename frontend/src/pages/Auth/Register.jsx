// CSS
import "./CSS/Auth.css";
// Components
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/Loading/Loading";
import Modal from "../../Components/Modal/Modal";

// Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { register, reset } from "../../services/slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  // Clean all form states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // Show or not Error modal and Error message;
  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 4000);
    }
  }, [error]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Sign up to see your friends&apos; photos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
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
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input
          type="password"
          placeholder="Confirm password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
        />
        <input type="submit" value="Register" />
        {user && <p>Register successfully!</p>}
        {showErrorModal && error && <Modal msg={error} type="error" />}
        {loading && <LoadingSpinner />}
      </form>
      <p>
        Have an account? <Link to="/login">log in</Link>
      </p>
    </div>
  );
};

export default Register;
