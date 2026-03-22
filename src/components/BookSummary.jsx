import { useState } from "react";
import { getBookSummaryService } from "../services/bookService";
import "../styles/components/bookSummary.css";

/* ── Icons ────────────────────────────────────────── */
const IconSparkles = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.88 5.76a1 1 0 0 0 .95.69h6.06l-4.91 3.57a1 1 0 0 0-.36 1.12L17.5 20 12 16.43 6.5 20l1.88-5.86a1 1 0 0 0-.36-1.12L3.11 9.45h6.06a1 1 0 0 0 .95-.69L12 3z" />
  </svg>
);

const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const IconAlertCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ── Shimmer placeholder ──────────────────────────── */
const ShimmerLines = () => (
  <div className="book-summary__loading">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="book-summary__shimmer" />
    ))}
  </div>
);

/* ── Main component ───────────────────────────────── */
const BookSummary = ({ book }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!book) return;
    try {
      setLoading(true);
      setError(null);
      setSummary(null);

      const payload = {
        title: book.title,
        authors: book.authors || [],
        description: book.description || "",
        categories: book.categories || [],
      };

      const data = await getBookSummaryService(payload);
      // The API may return { summary: "..." } or a raw string — handle both
      setSummary(typeof data === "string" ? data : data?.summary || JSON.stringify(data));
    } catch (err) {
      setError(typeof err === "string" ? err : err?.message || "Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="book-summary">
      {/* Section header */}
      <div className="book-summary__header">
        <span className="book-summary__label">
          <IconSparkles />
          AI Book Summary
        </span>

        {summary && !loading && (
          <button className="book-summary__btn" onClick={handleGenerate} disabled={loading}>
            <IconRefresh />
            Regenerate
          </button>
        )}
      </div>

      {/* Card area */}
      <div className="book-summary__card">
        {/* Loading shimmer */}
        {loading && <ShimmerLines />}

        {/* Error */}
        {!loading && error && (
          <p className="book-summary__error">
            <IconAlertCircle />
            {error}
          </p>
        )}

        {/* Summary text */}
        {!loading && !error && summary && (
          <p className="book-summary__text">{summary}</p>
        )}

        {/* Empty / initial state */}
        {!loading && !error && !summary && (
          <div className="book-summary__empty">
            <div className="book-summary__empty-icon">✨</div>
            <p>
              Get an AI-powered summary of this book — key themes,
              what to expect, and who it's for.
            </p>
            <button className="book-summary__btn" onClick={handleGenerate}>
              <IconSparkles />
              Generate Summary
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSummary;
