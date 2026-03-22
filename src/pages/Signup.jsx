import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ErrorPopup from "../components/ErrorPopup";
import OtpVerificationModal from "../components/OtpVerificationModal";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await signup(form);
      setShowOtpModal(true);
    } catch (err) {
      setShowError(true);
    }
  };

  return (
  <div className="container">

    <div className="image-container">
      <img
        src="https://images.unsplash.com/photo-1708898816130-0f5020a0f639?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div className="image-texts">
        <h2>Join Our Book World</h2>
        <p>Create an account and explore amazing books with AI.</p>
      </div>
    </div>

    <div className="form-container">
      <div className="top-text">
        <h1 className="welcome-message">Create Account</h1>
        <p className="welcome-message-description">
          Start your journey with us today
        </p>
      </div>

      <div className="label">Name</div>
      <input
        className="textbox"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
      />

      <div className="label">Email</div>
      <input
        className="textbox"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <div className="label">Password</div>
      <input
        className="textbox"
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button className="submit" onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Signup"}
      </button>

      <p className="signup-link">
        <span>Already have an account?</span>
        <span
          style={{ color: "#382CDD", cursor: "pointer", fontWeight: "500" }}
          onClick={() => navigate("/login")}
        >
          &nbsp;Login
        </span>
      </p>

      <ErrorPopup
        message={showError ? error : null}
        onClose={() => setShowError(false)}
      />

      {showOtpModal && (
        <OtpVerificationModal
          email={form.email}
          onSuccess={() => {
            setShowOtpModal(false);
            navigate("/login");
          }}
          onCancel={() => setShowOtpModal(false)}
        />
      )}
    </div>
  </div>
);
};

export default Signup;