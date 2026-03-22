import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/components/otpModal.css";

const OtpVerificationModal = ({ email, onSuccess, onCancel }) => {
  const [otp, setOtp] = useState("");
  const { verifyOtp, loading } = useAuth();
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
    <div className="otp-overlay">
      <div className="otp-popup">
        <h3 className="otp-title">Verify OTP</h3>

        <p className="otp-subtext">
          An OTP has been sent to <strong>{email}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="otp-input"
          maxLength={6}
        />

        {localError && <p className="otp-error">{localError}</p>}

        <div className="otp-buttons">
          <button
            onClick={handleVerify}
            disabled={loading}
            className="otp-btn verify"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <button
            onClick={onCancel}
            disabled={loading}
            className="otp-btn cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;