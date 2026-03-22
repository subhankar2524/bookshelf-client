import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const OtpVerificationModal = ({ email, onSuccess, onCancel }) => {
  const [otp, setOtp] = useState("");
  const { verifyOtp, loading, error } = useAuth();
  const [localError, setLocalError] = useState(null);

  const handleVerify = async () => {
    if (!otp) {
      setLocalError("Please enter the OTP");
      return;
    }
    try {
      setLocalError(null);
      await verifyOtp({ email, otp });
      onSuccess();
    } catch (err) {
      setLocalError(err || "Verification failed");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>Verify OTP</h3>
        <p>An OTP has been sent to <strong>{email}</strong></p>
        
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={styles.input}
          maxLength={6}
        />

        {localError && <p style={styles.error}>{localError}</p>}

        <div style={styles.buttonGroup}>
          <button onClick={handleVerify} disabled={loading} style={styles.verifyButton}>
            {loading ? "Verifying..." : "Verify"}
          </button>
          <button onClick={onCancel} style={styles.cancelButton} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "15px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    textAlign: "center",
    letterSpacing: "4px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  verifyButton: {
    flex: 1,
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    flex: 1,
    padding: "10px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    margin: "5px 0",
  },
};

export default OtpVerificationModal;
