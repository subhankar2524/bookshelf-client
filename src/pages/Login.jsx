import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ErrorPopup from "../components/ErrorPopup";

import "../styles/pages/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setShowError(true);
    }
  };

  return (
    <div className="container">
      
      <div className="image-container">
        <img src="https://images.unsplash.com/photo-1708898813097-aae783d4d8c6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className="image-texts">
          <h2>Get Awesome Experience With Our Book Searching</h2>
          <p>Discover and share your favorite books with the world.</p>
        </div>
      </div>

      <div className="form-container">
        <div className="top-text">
          <h1 className="welcome-message">Get Started Now</h1>
          <p className="welcome-message-description">please log into your account to continue</p>
        </div>

        <div className="label">email</div>
        <input className="textbox" name="email" placeholder="Email" onChange={handleChange} />

        <div className="label">password</div>
        <input className="textbox"  name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button className="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="signup-link">
          <span>
            Don't have an account? 
          </span>
          <span style={{color: "#382CDD", cursor: "pointer", fontWeight: "500"}} onClick={() => navigate("/signup")}>
            &nbsp;Signup
          </span>
        </p>

        <ErrorPopup
          message={showError ? error : null}
          onClose={() => setShowError(false)}
        />
      </div>
    </div>
    
  );
};

export default Login;