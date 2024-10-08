import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { useParams } from 'react-router-dom';  
import "../css/CreatePost.css";
import { useTranslation } from "react-i18next";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

const CreatePost = () => {
  const { category: routeCategory } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState(null); // File input for image upload
  const [category, setCategory] = useState(routeCategory || ''); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { t } = useTranslation();

  const { getToken } = useContext(AuthContext);  // Get the token from AuthContext

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the stored token from AuthContext
    const token = getToken();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    
    if (postImage) {
      formData.append('postImage', postImage); // Add the image file to FormData
    }

    axios.post(`${API_URL}/posts/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Set multipart form data
      }})

    .then(response => {
      setSuccess('Post created successfully!');
      setError(null);
      setTitle('');  // Clear the form fields after success
      setContent('');
      setPostImage(null);
    })
    .catch(err => {
      setSuccess(null);
      setError('Failed to create post. Please try again.');
      console.error(err);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">{t('Title')}:</label>
        <input 
          type="text" 
          id="title"
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
      </div>
      <div>
        <label htmlFor="content">{t('Content')}:</label>
        <textarea 
          id="content"
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required
        />
      </div>
      <div>
        <label htmlFor="postImage">{t('PostImage')}</label>
        <input 
          type="file"  
          id="postImage"
          onChange={handleImageChange}
        />
      </div>
      <div>
        <label htmlFor="category">{t('Category')}:</label>
        <select
          id="category"
          name="category"
          value={category}  
          onChange={(e) => setCategory(e.target.value)}  
          required
        >
          <option value="">{t('SelectCategory')}</option>
          <option value="gallery">{t('Gallery')}</option>
          <option value="searchandfind">{t('SearchAndFind')}</option>
          <option value="recommendation">{t('Recommendation')}</option>
        </select>
      </div>
      <button type="submit" className="btn">{t('CreateNewPost')}</button>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default CreatePost;

