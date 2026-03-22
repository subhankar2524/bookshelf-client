import React from "react";
import { useUser } from "../hooks/useUser";
import { useUserActions } from "../hooks/useUserActions";
import "../styles/profile.css";

const Profile = () => {
  const { user, loading: userLoading, logout } = useUser();
  const { bookmarks, getBookmarks, loading: bookmarksLoading } = useUserActions();

  React.useEffect(() => {
    if (user) {
      getBookmarks();
    }
  }, [user]);

  const loading = userLoading || bookmarksLoading;

  if (loading) {
    return <div className="loading-container">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="error-container">
        <h2>You are not logged in</h2>
        <button onClick={() => window.location.href = "/login"} className="login-btn">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.name || "User Name"}</h1>
            <p className="profile-email">{user.email || "user@example.com"}</p>
          </div>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="profile-content">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Books Saved</h3>
              <p className="stat-value">{bookmarks.length}</p>
            </div>
            <div className="stat-card">
              <h3>Books Read</h3>
              <p className="stat-value">5</p>
            </div>
          </div>

          <div className="account-details">
            <h2>Account Details</h2>
            <div className="detail-item">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{user.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
