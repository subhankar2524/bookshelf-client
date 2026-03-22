import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import { useUserActions } from "../hooks/useUserActions";
import { useUser } from "../hooks/useUser";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookDetail, currentBook: book, loading, error } = useBooks();
  const { createBookmark, loading: bookmarkLoading } = useUserActions();
  const { user } = useUser();

  const handleSaveBook = async () => {
    if (!user) {
        alert("Please log in to save books.");
        return;
    }
    try {
      await createBookmark({
        book_id: book.id,
        title: book.title,
        thumbnail: book.thumbnail
      });
      alert("Book saved successfully!");
    } catch (err) {
      alert("Failed to save book: " + err);
    }
  };

  useEffect(() => {
    if (id) {
      getBookDetail(id);
    }
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={handleSaveBook} disabled={bookmarkLoading} style={{ marginLeft: "10px" }}>
        {bookmarkLoading ? "Saving..." : "Save to My Books"}
      </button>

      <h1>{book.title}</h1>
      {book.thumbnail && <img src={book.thumbnail} alt={book.title} style={{ width: "200px" }} />}
      
      <div>
        <strong>Authors:</strong> {book.authors?.join(", ") || "Unknown"}
      </div>
      <div>
        <strong>Publisher:</strong> {book.publisher} ({book.publishedDate})
      </div>
      <div>
        <strong>Page Count:</strong> {book.pageCount}
      </div>
      <div>
        <strong>Rating:</strong> {book.averageRating} ({book.ratingsCount} ratings)
      </div>
      
      <h3>Description</h3>
      <p>{book.description}</p>

      {book.categories && (
        <div>
          <h3>Categories</h3>
          <ul>
            {book.categories.map((cat, index) => (
              <li key={index}>{cat}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <a href={book.previewLink} target="_blank" rel="noopener noreferrer">Preview Link</a> | 
        <a href={book.infoLink} target="_blank" rel="noopener noreferrer"> More Info</a>
      </div>
    </div>
  );
};

export default BookDetail;
