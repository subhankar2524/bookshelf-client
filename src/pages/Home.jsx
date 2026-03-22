import SearchBooks from "../components/searchBooks";
import { useBooks } from "../hooks/useBooks";
import { Link } from "react-router-dom";
import { useUserActions } from "../hooks/useUserActions";
import { useUser } from "../hooks/useUser";
import '../styles/pages/home.css'
import { useEffect } from "react";

const Home = () => {
  const { searchBooks, books, loading, error } = useBooks();
  const { createBookmark, deleteBookmark, getBookmarks, bookmarks } = useUserActions();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBookmarks();
    }
  }, [user])

  const handleSearch = async (query) => {
    try {
      await searchBooks(query);
    } catch (err) {
      console.error("Search failed:", err);
    }
  }

  const isBookmarked = (bookId) => {
    return bookmarks.some(bookmark => bookmark.book_id === bookId);
  }

  const getBookmarkId = (bookId) => {
    return bookmarks.find(bookmark => bookmark.book_id === bookId)?.id;
  }

  const handleBookmark = async (book) => {
    if (!user) {
      alert("Please log in to bookmark books!");
      return;
    }

    const bookId = book.id;
    if (isBookmarked(bookId)) {
      const bookmarkId = getBookmarkId(bookId);
      if (bookmarkId) {
        await deleteBookmark(bookmarkId);
      }
    } else {
      await createBookmark({
        book_id: book.id,
        title: book.title,
        thumbnail: book.thumbnail
      });
    }
  }

  return (
    <div className="home-container">
      <div style={{height: '30%'}}></div>
      <SearchBooks onSearch={handleSearch} />
      
      <div className="books-grid">
        {loading && <p>Loading books...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && books.length > 0 && books.map((book) => (
          <div key={book.id} className="book-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', position: 'relative' }}>
            {book.thumbnail && <img src={book.thumbnail} alt={book.title} style={{ width: '100px' }} />}
            <Link to={`/book/${book.id}`}>
              <h3>{book.title}</h3>
            </Link>
            <p>Authors: {book.authors?.join(', ')}</p>
            <p>{book.description?.substring(0, 100)}...</p>
            <button 
                onClick={() => handleBookmark(book)}
                style={{
                    backgroundColor: isBookmarked(book.id) ? 'red' : 'blue',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
              {isBookmarked(book.id) ? 'Bookmarked' : 'Add Bookmark'}
            </button>
          </div>
        ))}
        {!loading && books.length === 0 && <p>No books found.</p>}
      </div>
    </div>
  );
};

export default Home;