import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

function SearchResult({ result }) {

  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">
        <a href={result.url} target="_blank" rel="noopener noreferrer">
          {result.title}
        </a>
      </h2>
      <p className="text-gray-600">Points: {result.points}</p>
      <Link to={`/post/${result.objectID}`} state={{ post: result }} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
}

export default SearchResult;
