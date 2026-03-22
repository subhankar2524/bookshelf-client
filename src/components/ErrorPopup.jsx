const ErrorPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
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
    background: "rgba(0,0,0,0.5)",
  },
  popup: {
    background: "#fff",
    padding: "20px",
    margin: "100px auto",
    width: "300px",
    textAlign: "center",
  },
};

export default ErrorPopup;