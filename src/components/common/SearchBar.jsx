import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch, placeholder = 'Search lessons...' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setIsSearching(true);
        onSearch(searchTerm);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {isSearching ? (
          <div className="search-spinner"></div>
        ) : (
          <i className="fas fa-search search-icon"></i>
        )}
      </div>
    </div>
  );
}

export default SearchBar; 