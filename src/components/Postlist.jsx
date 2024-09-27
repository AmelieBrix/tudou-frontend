import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';  
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005"; 

const PostList = ({ category, authorId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useContext(AuthContext); 
  const token = getToken();

  
  useEffect(() => {
    let url = `${API_URL}/posts?category=${category}`;
    if (authorId) {
      url = `${API_URL}/posts/author/${authorId}`;  // Future enhancement for querying by authorId
    }

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts');
        setLoading(false);
      });
  }, [category, authorId]);

  if (loading) return <p>Loading posts...</p>;
  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div>
        <h1>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Posts` : 'User Posts'}</h1>
        <ul>
          {posts.length > 0 ? (
            posts.map(post => (
              <li key={post._id}>
                <h2>{post.title}</h2>
                <p>{post.content.slice(0, 100)}...</p>
                <p>Author: {post.author ? post.author.username : 'Unknown'}</p>
                <Link to={`/gallery/${post._id}`}>Read More</Link>
              </li>
            ))
          ) : (
            <p>No posts found in this category.</p>
          )}
        </ul>
      </div>
    );
  };
export default PostList;
