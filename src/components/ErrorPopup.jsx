import { useEffect } from "react";
import "../styles/components/errorPopup.css";

const ErrorPopup = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="error-popup-container">
      <div className="error-popup">
        <p className="error-message">{message}</p>
        <button className="error-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;