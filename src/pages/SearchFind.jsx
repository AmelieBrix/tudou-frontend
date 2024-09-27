/*import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005"; 

const SearchAndFindPage = () => {
  const [posts, setPosts] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios.get(`${API_URL}/posts?category=searchandfind`)  
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
  if (error) return ( <div>
    <p>There are no posts yet</p>
    {<Link to="/createpost/searchandfind">
    <button>Create New Post</button>
  </Link>}
  </div>)

  return (
    <div>
      <h1>searchandfind Posts</h1>

      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content.slice(0, 100)}...</p> 

              <p>
                Author: {post.author ? post.author.username : 'Unknown'}
              </p>

              <Link to={`/searchandfind/${post._id}`}>Read More</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found in the Search and Find.</p>
      )}

      <Link to="/createpost/searchandfind">
        <button>Create New Post</button>
      </Link>
    </div>
  );
};

*/
import { Link } from 'react-router-dom';
import PostList from '../components/Postlist';  // Import the reusable PostList component

const SearchAndFindPage = () => {
  return (
    <div>
      <h1>Search and Find</h1>
      
      {/* Reuse the PostList component, passing the "gallery" category */}
      <PostList category="searchandfind" />
      
      {/* Create new post button */}
      <Link to="/createpost/searchandfind">
        <button>Create New Post</button>
      </Link>
    </div>
  );
};



export default SearchAndFindPage;
