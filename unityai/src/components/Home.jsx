import React, { useState } from 'react';
import SearchResult from './SearchDetail';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(
        'https://hn.algolia.com/api/v1/search?query=' + searchQuery
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setSearchResults(data.hits);
    } catch (error) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Hacker News Search</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300"
          placeholder="Search Hacker News"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        onClick={handleSearch}
      >
        Search
      </button>
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : (
        <div className="mt-8">
          {searchResults.map((result) => (
            <SearchResult key={result.objectID} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
