import SearchBooks from "../components/searchBooks";
import { useBooks } from "../hooks/useBooks";
import '../styles/pages/home.css'

const Home = () => {
  const { searchBooks, books, loading, error } = useBooks();

  const handleSearch = async (query) => {
    try {
      await searchBooks(query);
    } catch (err) {
      console.error("Search failed:", err);
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
          <div key={book.id} className="book-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            {book.thumbnail && <img src={book.thumbnail} alt={book.title} style={{ width: '100px' }} />}
            <h3>{book.title}</h3>
            <p>Authors: {book.authors?.join(', ')}</p>
            <p>{book.description?.substring(0, 100)}...</p>
          </div>
        ))}
        {!loading && books.length === 0 && <p>No books found.</p>}
      </div>
    </div>
  );
};

export default Home;