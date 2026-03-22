import React from 'react'
import '../styles/components/searchBooks.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchBooks = () => {
  return (
    <div className="search-bar">
      <input className='search-field' type="text" placeholder="Search" />
      <button className='search'><SearchIcon sx={{ fontSize: 40 }}/></button>
    </div>
  )
}

export default SearchBooks