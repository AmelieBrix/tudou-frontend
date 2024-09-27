import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecommendationPage = () => {
  const [posts, setPosts] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:5005/posts?category=recommendation')  // Adjust the URL to match your backend
      .then(response => {
        setPosts(response.data); 
        setLoading(false);  
      })
      .catch(err => {
        setError('Failed to fetch posts');
        setLoading(false);  
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Recommendation Posts</h1>

      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content.slice(0, 100)}...</p> {/* Short preview of content */}

              <p>
                Author: {post.author ? post.author.username : 'Unknown'}
              </p>

              {/* Link to the detailed post page */}
              <Link to={`/recommendation/${post._id}`}>Read More</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found in the recommendation.</p>
      )}

      {/* Button to create a new post */}
      <Link to="/createpost/recommendation">
        <button>Create New Post</button>
      </Link>
    </div>
  );
};

export default RecommendationPage;
