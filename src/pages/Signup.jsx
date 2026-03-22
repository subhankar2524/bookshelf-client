import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ErrorPopup from "../components/ErrorPopup";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await signup(form);
      navigate("/login");
    } catch (err) {
      setShowError(true);
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

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
        {loading ? "Loading..." : "Signup"}
      </button>

      <p onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
        Go to Login
      </p>

      <ErrorPopup
        message={showError ? error : null}
        onClose={() => setShowError(false)}
      />
    </div>
  );
};

export default Signup;