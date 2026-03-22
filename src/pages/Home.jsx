import SearchBooks from "../components/searchBooks";
import { useBooks } from "../hooks/useBooks";
import { Link } from "react-router-dom";
import { useUserActions } from "../hooks/useUserActions";
import { useUser } from "../hooks/useUser";
import '../styles/pages/home.css'
import { useEffect, useState } from "react";
import ErrorPopup from "../components/ErrorPopup";

/* ── Bookmark icon SVGs ─────────────────────────── */
const IconBookmarkEmpty = () => (
  <svg className="btn-bookmark__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const IconBookmarkFilled = () => (
  <svg className="btn-bookmark__icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const BookCard = ({ book, bookmarked, onBookmark }) => {
  const [hoveringBookmark, setHoveringBookmark] = useState(false);

  const bmLabel = bookmarked
    ? (hoveringBookmark ? 'Remove' : 'Saved')
    : 'Save';

  return (
    <div className="book-card">
      {book.thumbnail ? (
        <img
          className="book-card__cover"
          src={book.thumbnail}
          alt={book.title}
          loading="lazy"
        />
      ) : (
        <div className="book-card__cover-placeholder">No cover</div>
      )}

      <div className="book-card__body">
        {book.authors?.length > 0 && (
          <p className="book-card__authors">
            {book.authors.join(', ')}
          </p>
        )}

        <h3 className="book-card__title">
          <Link to={`/book/${book.id}`}>{book.title}</Link>
        </h3>

        {book.description && (
          <p className="book-card__desc">
            {book.description.substring(0, 120)}
            {book.description.length > 120 ? '…' : ''}
          </p>
        )}

        <div className="book-card__divider" />

        <div className="book-card__footer">
          <button
            className={`btn-bookmark${bookmarked ? ' is-bookmarked' : ''}`}
            onClick={() => onBookmark(book)}
            onMouseEnter={() => setHoveringBookmark(true)}
            onMouseLeave={() => setHoveringBookmark(false)}
          >
            {bookmarked ? <IconBookmarkFilled /> : <IconBookmarkEmpty />}
            <span className="btn-bookmark__label">{bmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { searchBooks, books, loading, error } = useBooks();
  const { createBookmark, deleteBookmark, getBookmarks, bookmarks } = useUserActions();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBookmarks();
    }
  }, [user]);

  const handleSearch = async (query) => {
    try {
      await searchBooks(query);
    } catch (err) {
      setErrorMessage(err?.message || 'Failed to search books');
      setShowError(true);
    }
  };

  const isBookmarked = (bookId) =>
    bookmarks.some((b) => b.book_id === bookId);

  const getBookmarkId = (bookId) =>
    bookmarks.find((b) => b.book_id === bookId)?.id;

  const handleBookmark = async (book) => {
    if (!user) {
      setErrorMessage('Please log in to bookmark books');
      setShowError(true);
      return;
    }

    if (isBookmarked(book.id)) {
      const bookmarkId = getBookmarkId(book.id);
      if (bookmarkId) await deleteBookmark(bookmarkId);
    } else {
      await createBookmark({
        book_id: book.id,
        title: book.title,
        thumbnail: book.thumbnail,
      });
    }
  };

  return (
    <>
      <ErrorPopup
        message={showError ? errorMessage : null}
        onClose={() => setShowError(false)}
      />

      <div className="home-container">
        <div style={{ height: '30%' }} />
        <SearchBooks onSearch={handleSearch} />

        <div className="books-grid">
          {loading && (
            <p className="books-status">Searching…</p>
          )}

          {!loading && books.length === 0 && (
            <p className="books-status">No books found.</p>
          )}

          {!loading && books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              bookmarked={isBookmarked(book.id)}
              onBookmark={handleBookmark}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;