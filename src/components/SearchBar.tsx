
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

const SearchBar = ({ initialQuery = '', onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  
  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('pharmaRecentSearches') || '[]');
    setRecentSearches(storedSearches);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowRecent(false);
      
      // Update recent searches
      const updatedSearches = [
        searchQuery.trim(),
        ...recentSearches.filter(s => s !== searchQuery.trim())
      ].slice(0, 10);
      
      setRecentSearches(updatedSearches);
      localStorage.setItem('pharmaRecentSearches', JSON.stringify(updatedSearches));
    }
  };
  
  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    setShowRecent(false);
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-3 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-pharma-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (recentSearches.length > 0) {
                setShowRecent(true);
              }
            }}
            onBlur={() => {
              setTimeout(() => {
                setShowRecent(false);
              }, 200);
            }}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          
          {searchQuery && (
            <button
              type="button"
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={handleClearSearch}
            >
              <X size={18} />
            </button>
          )}
          
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pharma-primary text-white p-1 rounded hover:bg-pharma-dark"
          >
            <Search size={18} />
          </button>
        </div>
      </form>
      
      {/* Recent searches dropdown */}
      {showRecent && recentSearches.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
          <div className="p-2 border-b text-sm font-medium text-gray-600">
            Recent Searches
          </div>
          <ul>
            {recentSearches.map((search, index) => (
              <li key={index}>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                  onClick={() => handleRecentSearch(search)}
                >
                  <Search size={14} className="mr-2 text-gray-400" />
                  {search}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
