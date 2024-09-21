import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';  // Import AuthContext to access the token and user state

const CreatePost = ({ category }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { getToken } = useContext(AuthContext);  // Get the token from AuthContext

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the stored token from AuthContext
    const token = getToken();

    axios.post('http://localhost:5005/posts/createpost', {
      title,
      content,
      category,  // Automatically pass the category from the prop
      imageUrl,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,  // Use the token in the request headers
      }
    })
    .then(response => {
      setSuccess('Post created successfully!');
      setError(null);
      setTitle('');  // Clear the form fields after success
      setContent('');
      setImageUrl('');
    })
    .catch(err => {
      setSuccess(null);
      setError('Failed to create post. Please try again.');
      console.error(err);
    });
  };

  return (
    <div>
      <h2>Create a new post in {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input 
            type="text" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        {/* Optionally show the category as read-only */}
        <div>
          <label>Category:</label>
          <input 
            type="text" 
            value={category} 
            readOnly  // Make this read-only so the user can't change it
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreatePost;
