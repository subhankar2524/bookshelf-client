import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import { useUserActions } from "../hooks/useUserActions";
import { useUser } from "../hooks/useUser";
import ErrorPopup from "../components/ErrorPopup";
import '../styles/pages/bookDetail.css';

const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const IconBookmark = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const IconExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);


const StarRating = ({ rating, count }) => {
  if (!rating) return null;
  const filled = Math.round(rating);
  return (
    <div className="book-detail-rating">
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} className={`rating-star${i <= filled ? '' : ' empty'}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <span className="rating-score">{rating.toFixed(1)}</span>
      {count > 0 && (
        <span className="rating-count">{count.toLocaleString()} ratings</span>
      )}
    </div>
  );
};

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookDetail, currentBook: book, loading, error } = useBooks();
  const { createBookmark, loading: bookmarkLoading } = useUserActions();
  const { user } = useUser();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (id) getBookDetail(id);
  }, [id]);

  const handleSaveBook = async () => {
    if (!user) {
      setErrorMessage('Please log in to save books');
      setShowError(true);
      return;
    }
    try {
      await createBookmark({
        book_id: book.id,
        title: book.title,
        thumbnail: book.thumbnail,
      });
      setSaved(true);
    } catch (err) {
      setErrorMessage(
        err?.status === 400 ? 'Book already saved' : (err?.message || 'Failed to save book')
      );
      setShowError(true);
    }
  };

  /* ── States ──────────────────────────────────── */
  if (loading) return <div className="book-detail-state">Loading book details…</div>;
  if (!book && error) return <div className="book-detail-state" style={{ color: '#c0392b' }}>Error: {error}</div>;
  if (!book) return <div className="book-detail-state">No book found.</div>;

  const heroStyle = book.thumbnail
    ? { '--hero-img': `url(${book.thumbnail})` }
    : {};

  return (
    <>
      <ErrorPopup
        message={showError ? errorMessage : null}
        onClose={() => setShowError(false)}
      />

      <div className="book-detail-page">
        {/* Blurred hero bg */}
        <div className="book-detail-hero" style={heroStyle}>
          <div className="book-detail-hero__bg" />

          <div className="book-detail-content">
            {/* Back */}
            <button className="book-detail-back" onClick={() => navigate(-1)}>
              <IconArrowLeft />
              Back
            </button>

            {/* Main layout */}
            <div className="book-detail-main">

              {/* Left: cover + save */}
              <div className="book-detail-cover">
                {book.thumbnail ? (
                  <img
                    className="book-detail-cover__img"
                    src={book.thumbnail}
                    alt={book.title}
                  />
                ) : (
                  <div className="book-detail-cover__placeholder">No cover</div>
                )}

                <button
                  className="btn-save"
                  onClick={handleSaveBook}
                  disabled={bookmarkLoading || saved}
                >
                  <IconBookmark filled={saved} />
                  {bookmarkLoading ? 'Saving…' : saved ? 'Saved to My Books' : 'Save to My Books'}
                </button>
              </div>

              {/* Right: info */}
              <div className="book-detail-info">

                {/* Category tags */}
                {book.categories?.length > 0 && (
                  <div className="book-detail-categories">
                    {book.categories.map((cat, i) => (
                      <span key={i} className="book-detail-tag">{cat}</span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="book-detail-title">{book.title}</h1>

                {/* Authors */}
                <p className="book-detail-authors">
                  by <span>{book.authors?.join(', ') || 'Unknown Author'}</span>
                </p>

                {/* Stars */}
                <StarRating rating={book.averageRating} count={book.ratingsCount} />

                {/* Meta grid */}
                <div className="book-detail-meta">
                  <div className="book-detail-meta__cell">
                    <div className="book-detail-meta__label">Publisher</div>
                    <div className="book-detail-meta__value">{book.publisher || '—'}</div>
                  </div>
                  <div className="book-detail-meta__cell">
                    <div className="book-detail-meta__label">Published</div>
                    <div className="book-detail-meta__value">{book.publishedDate || '—'}</div>
                  </div>
                  <div className="book-detail-meta__cell">
                    <div className="book-detail-meta__label">Pages</div>
                    <div className="book-detail-meta__value">{book.pageCount ? book.pageCount.toLocaleString() : '—'}</div>
                  </div>
                  <div className="book-detail-meta__cell">
                    <div className="book-detail-meta__label">Rating</div>
                    <div className="book-detail-meta__value">
                      {book.averageRating ? `${book.averageRating} / 5` : '—'}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {book.description && (
                  <>
                    <p className="book-detail-section-label">About this book</p>
                    <p className="book-detail-desc">{book.description}</p>
                  </>
                )}

                {/* External links */}
                {(book.previewLink || book.infoLink) && (
                  <div className="book-detail-links">
                    {book.previewLink && (
                      <a
                        className="book-detail-link"
                        href={book.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconExternalLink />
                        Preview Book
                      </a>
                    )}
                    {book.infoLink && (
                      <a
                        className="book-detail-link"
                        href={book.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconExternalLink />
                        More Info
                      </a>
                    )}
                  </div>
                )}

              </div>
            </div>

            <div className="book-detail-divider" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;