import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005"; 

const PostList = ({ category }) => {
  const [posts, setPosts] = useState([]); 
  const [error, setError] = useState(null); 
  const token = 'your-token-here'; 
  
  useEffect(() => {

    axios.get(`${API_URL}/posts?category=${category}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    })
    .then(response => {
      setPosts(response.data); // Set the fetched posts in the state
    })
    .catch(err => {
      console.error('Error fetching posts:', err);
      setError('Error fetching posts'); 
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
