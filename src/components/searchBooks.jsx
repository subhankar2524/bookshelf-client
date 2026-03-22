import React, { useState } from 'react'
import '../styles/components/searchBooks.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchBooks = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="search-bar">
      <input 
        className='search-field' 
        type="text" 
        placeholder="Search" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className='search' onClick={handleSearch}><SearchIcon sx={{ fontSize: 40 }}/></button>
    </div>
  )
}

export default SearchBooks