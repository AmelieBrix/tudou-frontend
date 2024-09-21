import { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = ({ category }) => {
  const [posts, setPosts] = useState([]); // State to store the fetched posts
  const [error, setError] = useState(null); // State to handle errors
  const token = 'your-token-here'; // Replace with your actual token
  
  useEffect(() => {
    // Fetch posts based on the category
    axios.get(`http://localhost:5005/posts?category=${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add Bearer token to the request headers
      }
    })
    .then(response => {
      setPosts(response.data); // Set the fetched posts in the state
    })
    .catch(err => {
      console.error('Error fetching posts:', err);
      setError('Error fetching posts'); // Set error message if the request fails
    });
  }, [category]); // Dependency array includes the category, so it refetches when the category changes

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Posts</h1> {/* Capitalize category name */}
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
