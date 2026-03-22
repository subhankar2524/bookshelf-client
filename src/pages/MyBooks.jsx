import React, { useEffect } from "react";
import { useUserActions } from "../hooks/useUserActions";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
import '../styles/pages/myBooks.css';

/* ── Icons ──────────────────────────────────────── */
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const IconBookOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/* ── Single bookmark card ───────────────────────── */
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
            <IconEye />
            View
          </Link>
          <button
            className="btn-remove"
            onClick={() => onRemove(bookmark.id)}
            title="Remove bookmark"
          >
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Page ────────────────────────────────────────── */
const MyBooks = () => {
  const { bookmarks, loading, error, getBookmarks, deleteBookmark } = useUserActions();
  const { user } = useUser();

  useEffect(() => {
    if (user) getBookmarks();
  }, [user]);

  /* Not logged in */
  if (!user) {
    return (
      <div className="my-books-page">
        <div className="my-books-login">
          <IconBookOpen style={{ width: 44, height: 44, color: '#d3cec4' }} />
          <p className="my-books-login__title">Your shelf is waiting</p>
          <p className="my-books-login__sub">Please log in to see your saved books.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-books-page">
      <div className="my-books-content">

        {/* Header */}
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

        {/* States */}
        {loading && <p className="my-books-state">Loading your collection…</p>}
        {error && <p className="my-books-state" style={{ color: '#c0392b' }}>Error: {error}</p>}

        {/* Empty state */}
        {!loading && !error && bookmarks.length === 0 && (
          <div className="my-books-empty">
            {/* <IconBookOpen className="my-books-empty__icon" style={{width:50, height:50}}/> */}
            <p className="my-books-empty__title">No books saved yet</p>
            <p className="my-books-empty__sub">
              Start building your personal library.
            </p>
            <Link className="my-books-empty__link" to="/">
              <IconSearch />
              Search for books
            </Link>
          </div>
        )}

        {/* Grid */}
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