import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";  // Adjust as per your setup

const PostEditPage = () => {
    const { postId } = useParams();  // Extract the post ID from the URL
    const [post, setPost] = useState({ title: '', content: '', category: '', imageUrl: '' });  // State to hold post data
    const [error, setError] = useState(null);  // State for errors
    const [loading, setLoading] = useState(true);  // State for loading
    const navigate = useNavigate();  // To navigate after form submission

    useEffect(() => {
        axios.get(`${API_URL}/posts/${postId}`)
          .then(response => {
            setPost(response.data);  // Pre-fill form with existing post data
            setLoading(false);
          })
          .catch(err => {
            setError('Error fetching post details');
            setLoading(false);
          });
      }, [postId]);

      const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');  // Get the token from localStorage
    
        // Send updated post data to the backend
        axios.put(`${API_URL}/posts/${postId}/edit`, post, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          navigate(`/posts/${postId}`);  
        })
        .catch(err => {
          setError('Error updating the post');
        });
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;  // Handle changes to form fields
        setPost(prevPost => ({
          ...prevPost,
          [name]: value  // Dynamically update either the title, content, category, or imageUrl
        }));
      };
    
      if (loading) return <p>Loading post data...</p>;  
    
      return (
        <div>
          {error && <p>{error}</p>}  
          <h1>Edit Post</h1>
          <form onSubmit={handleSubmit}>
          
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={post.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="gallery">Gallery</option>
              <option value="searchandfind">Search & Find</option>
              <option value="recommendation">Recommendation</option>
            </select>
    
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={post.imageUrl}
              onChange={handleChange}
            />
    
            <button type="submit">Update Post</button>
          </form>
        </div>
      );
    };
    
    export default PostEditPage;