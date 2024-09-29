import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";  // Adjust as per your setup

const PostEditPage = () => {
    const { postId } = useParams();  // Extract the post ID from the URL
    const [post, setPost] = useState({ title: '', content: '', category: '', imageUrl: '' });  // State to hold post data
    const [error, setError] = useState(null);  
    const [loading, setLoading] = useState(true);
    const [postImage, setPostImage] = useState(null);  
    const navigate = useNavigate(); 

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

      const handleImageChange = (e) => {
        setPostImage(e.target.files[0]);  // Set the selected image file
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');  // Get the token from localStorage
    
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('content', post.content);
        formData.append('category', post.category);
        
        if (postImage) {
          formData.append('postImage', postImage);  // Append the image file if a new one is uploaded
        }

        // Send updated post data to the backend
        axios.put(`${API_URL}/posts/${postId}/edit`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
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
    
            {post.imageUrl && (
              <div>
                <h3>Current Post Image:</h3>
                <img src={post.imageUrl} alt={post.title} style={{ width: '200px', height: 'auto' }} />
              </div>
            )}
    
            <label htmlFor="postImage">Change Post Image:</label>
            <input
              type="file"
              id="postImage"
              name="postImage"
              onChange={handleImageChange}  // Capture the new image file
            />
    
            <button type="submit">Update Post</button>
          </form>
        </div>
      );
    };
    
    export default PostEditPage;