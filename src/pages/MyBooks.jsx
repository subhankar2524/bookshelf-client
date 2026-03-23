import React, { useEffect } from "react";
import { useUserActions } from "../hooks/useUserActions";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
import '../styles/pages/myBooks.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';


const BookmarkCard = ({ bookmark, onRemove }) => {
  const savedDate = new Date(bookmark.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="mb-card">
      {bookmark.thumbnail ? (
        <img
          className="mb-card__cover"
          src={bookmark.thumbnail}
          alt={bookmark.title}
          loading="lazy"
        />
      ) : (
        <div className="mb-card__cover-placeholder">No cover</div>
      )}

      <div className="mb-card__body">
        <span className="mb-card__saved-on">Saved {savedDate}</span>

        <h3 className="mb-card__title">
          <Link to={`/book/${bookmark.book_id}`}>{bookmark.title}</Link>
        </h3>


        <div className="mb-card__footer">
          <Link className="btn-view" to={`/book/${bookmark.book_id}`}>
            <VisibilityIcon sx={{ fontSize: 14 }} />
            View
          </Link>
          <button
            className="btn-remove"
            onClick={() => onRemove(bookmark.id)}
            title="Remove bookmark"
          >
            <DeleteOutlineIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </div>
  );
};


const MyBooks = () => {
  const { bookmarks, loading, error, getBookmarks, deleteBookmark } = useUserActions();
  const { user } = useUser();

  useEffect(() => {
    if (user) getBookmarks();
  }, [user]);

  if (!user) {
    return (
      <div className="my-books-page">
        <div className="my-books-login">
          <MenuBookIcon style={{ fontSize: 44, color: '#d3cec4' }} />
          <p className="my-books-login__title">Your shelf is waiting</p>
          <p className="my-books-login__sub">Please log in to see your saved books.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-books-page">
      <div className="my-books-content">

        <div className="my-books-header">
          <p className="my-books-header__eyebrow">Your collection</p>
          <h1 className="my-books-header__title">My Books</h1>
          {!loading && (
            <p className="my-books-header__count">
              <strong>{bookmarks.length}</strong>{' '}
              {bookmarks.length === 1 ? 'book' : 'books'} saved
            </p>
          )}
        </div>

        <div className="my-books-divider" />

        {loading && <p className="my-books-state">Loading your collection…</p>}
        {error && <p className="my-books-state" style={{ color: '#c0392b' }}>Error: {error}</p>}

        {!loading && !error && bookmarks.length === 0 && (
          <div className="my-books-empty">
            <p className="my-books-empty__title">No books saved yet</p>
            <p className="my-books-empty__sub">
              Start building your personal library.
            </p>
            <Link className="my-books-empty__link" to="/">
              <SearchIcon sx={{ fontSize: 15 }} />
              Search for books
            </Link>
          </div>
        )}

        {!loading && bookmarks.length > 0 && (
          <div className="my-books-grid">
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onRemove={deleteBookmark}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBooks;