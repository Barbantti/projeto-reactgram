import "./CSS/Modal.css";
import PropTypes from "prop-types";

const Modal = ({ msg, type }) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

Modal.propTypes = {
  msg: PropTypes.any,
  type: PropTypes.any,
};

export default Modal;
