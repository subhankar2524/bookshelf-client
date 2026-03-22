import React, { useEffect } from "react";
import { useUserActions } from "../hooks/useUserActions";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";

const MyBooks = () => {
  const { bookmarks, loading, error, getBookmarks, deleteBookmark } = useUserActions();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBookmarks();
    }
  }, [user]);

  if (!user) {
      return <div>Please log in to see your books.</div>;
  }

  return (
    <div className="my-books-container" style={{ padding: "20px" }}>
      <h1>My Bookmarks</h1>
      {loading && <p>Loading your books...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      
      {!loading && bookmarks.length === 0 && (
        <p>You haven't saved any books yet. <Link to="/">Go search for some!</Link></p>
      )}

      <div className="books-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {!loading && bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="book-card" style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            {bookmark.thumbnail && (
              <img src={bookmark.thumbnail} alt={bookmark.title} style={{ width: "100%", height: "auto" }} />
            )}
            <h3>{bookmark.title}</h3>
            <p>Saved on: {new Date(bookmark.created_at).toLocaleDateString()}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Link to={`/book/${bookmark.book_id}`} style={{ padding: "5px 10px", background: "#f0f0f0", textDecoration: "none", color: "inherit", border: "1px solid #ccc", borderRadius: "4px" }}>
                View Details
                </Link>
                <button 
                onClick={() => deleteBookmark(bookmark.id)}
                style={{ cursor: "pointer", background: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}>
                Remove
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
