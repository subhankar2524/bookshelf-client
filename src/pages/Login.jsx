import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ErrorPopup from "../components/ErrorPopup";

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
    <div>
      <h1>Login</h1>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>

      <p onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
        Go to Signup
      </p>

      <ErrorPopup
        message={showError ? error : null}
        onClose={() => setShowError(false)}
      />
    </div>
  );
};

export default Login;