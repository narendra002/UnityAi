import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const location = useLocation();
  const post = location.state.post;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      if (post && post.children) {
        try {
          const commentPromises = post.children.map(commentID =>
            axios.get(`https://hn.algolia.com/api/v1/items/${commentID}`)
              .then(response => response.data)
          );

          const commentData = await Promise.all(commentPromises);

          setComments(commentData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching comments:', error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    fetchComments();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      <p className="text-gray-600">Points: {post.points}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Comments:</h2>
        <ul>
        {comments
  .filter(comment => comment && comment.text) // Filter out empty or falsy comments
  .map(comment => (
    <li key={comment.objectID} className="bg-slate-100 p-4 shadow-md mb-5">
      {comment.text}
    </li>
  ))
}

        </ul>
      </div>
    </div>
  );
}

export default PostDetail;
