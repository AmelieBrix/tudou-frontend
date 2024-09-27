import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";  

const GalleryPage = () => {
  const [posts, setPosts] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios.get(`${API_URL}/posts?category=gallery`)  
      .then(response => {
        setPosts(response.data); 
        setLoading(false);  
      })
      .catch(err => {
        console.log(err)
        setError('Failed to fetch posts');
        setLoading(false);  
      });
  }, []);


  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Gallery Posts</h1>

 
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content.slice(0, 100)}...</p> 

              <p>
                Author: {post.author ? post.author.username : 'Unknown'}
              </p>

       
              <Link to={`/gallery/${post._id}`}>Read More</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found in the gallery.</p>
      )}

      <Link to="/createpost/gallery">
        <button>Create New Post</button>
      </Link>
    </div>
  );
};

export default GalleryPage;
