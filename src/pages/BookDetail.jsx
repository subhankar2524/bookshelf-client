import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import { useUserActions } from "../hooks/useUserActions";
import { useUser } from "../hooks/useUser";
import ErrorPopup from "../components/ErrorPopup";
import BookSummary from "../components/BookSummary";
import '../styles/pages/bookDetail.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const StarRating = ({ rating, count }) => {
  if (!rating) return null;
  const filled = Math.round(rating);
  return (
    <div className="book-detail-rating">
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((i) =>
          i <= filled
            ? <StarIcon key={i} className="rating-star" sx={{ fontSize: 15, color: '#d4a017' }} />
            : <StarBorderIcon key={i} className="rating-star empty" sx={{ fontSize: 15, color: '#ddd9d0' }} />
        )}
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
        <div className="book-detail-hero" style={heroStyle}>
          <div className="book-detail-hero__bg" />

          <div className="book-detail-content">
            <button className="book-detail-back" onClick={() => navigate(-1)}>
              <ArrowBackIcon sx={{ fontSize: 14 }} />
              Back
            </button>

            <div className="book-detail-main">
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
                  {saved
                    ? <BookmarkIcon sx={{ fontSize: 14 }} />
                    : <BookmarkBorderIcon sx={{ fontSize: 14 }} />
                  }
                  {bookmarkLoading ? 'Saving…' : saved ? 'Saved to My Books' : 'Save to My Books'}
                </button>
              </div>

              {/* Right: */}
              <div className="book-detail-info">
                {book.categories?.length > 0 && (
                  <div className="book-detail-categories">
                    {book.categories.map((cat, i) => (
                      <span key={i} className="book-detail-tag">{cat}</span>
                    ))}
                  </div>
                )}

                <h1 className="book-detail-title">{book.title}</h1>
                <p className="book-detail-authors">
                  by <span>{book.authors?.join(', ') || 'Unknown Author'}</span>
                </p>

                <StarRating rating={book.averageRating} count={book.ratingsCount} />

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

                {book.description && (
                  <>
                    <p className="book-detail-section-label">About this book</p>
                    {/* <p className="book-detail-desc">{book.description}</p> */}
                    <p className="book-detail-desc" dangerouslySetInnerHTML={{ __html: book.description }} />
                  </>
                )}

                {(book.previewLink || book.infoLink) && (
                  <div className="book-detail-links">
                    {book.previewLink && (
                      <a
                        className="book-detail-link"
                        href={book.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <OpenInNewIcon sx={{ fontSize: 13 }} />
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
                        <OpenInNewIcon sx={{ fontSize: 13 }} />
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

      <BookSummary book={book} />
    </>
  );
};

export default BookDetail;