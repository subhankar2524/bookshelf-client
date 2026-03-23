import { useState } from "react";
import { getBookSummaryService } from "../services/bookService";
import "../styles/components/bookSummary.css";


import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ShimmerLines = () => (
  <div className="book-summary__loading">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="book-summary__shimmer" />
    ))}
  </div>
);

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

      setSummary(
        typeof data === "string"
          ? data
          : data?.summary || JSON.stringify(data)
      );
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err?.message || "Failed to generate summary."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="book-summary">
      {/* Header */}
      <div className="book-summary__header">
        <span className="book-summary__label">
          <AutoAwesomeIcon fontSize="small" />
          AI Book Summary
        </span>

        {summary && !loading && (
          <button
            className="book-summary__btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            <RefreshIcon fontSize="small" />
            Regenerate
          </button>
        )}
      </div>

      {/* Card */}
      <div className="book-summary__card">
        {/* Loading */}
        {loading && <ShimmerLines />}

        {/* Error */}
        {!loading && error && (
          <p className="book-summary__error">
            <ErrorOutlineIcon fontSize="small" />
            {error}
          </p>
        )}

        {/* Summary */}
        {!loading && !error && summary && (
          <p className="book-summary__text">{summary}</p>
        )}

        {/* Empty */}
        {!loading && !error && !summary && (
          <div className="book-summary__empty">
            <p>
              Get an AI-powered summary of this book — key themes,
              what to expect, and who it's for.
            </p>

            <button
              className="book-summary__btn"
              onClick={handleGenerate}
            >
              <AutoAwesomeIcon fontSize="small" />
              Generate Summary
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSummary;