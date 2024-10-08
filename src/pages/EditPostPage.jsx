import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import "../css/EditPost.css";
import { useTranslation } from "react-i18next";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";  // Adjust as per your setup
const DEFAULT_IMAGE_URL = 'https://console.cloudinary.com/console/c-511bcbc8f3c7007e75765c1b668116/media_library/search/asset/07761bdaff339e4c2fcc9229597770f7/manage?q=&view_mode=mosaic&context=manage';


const PostEditPage = () => {
    const { postId } = useParams();  // Extract the post ID from the URL
    const [post, setPost] = useState({ title: '', content: '', category: '', imageUrl: '' });  // State to hold post data
    const [error, setError] = useState(null);  
    const [loading, setLoading] = useState(true);
    const [postImage, setPostImage] = useState(null);  
    const navigate = useNavigate(); 

    const { t } = useTranslation();

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
     
      if (loading) {
        return (
          <>
            <Spinner />
            <p>{t('LoadingPostData')}</p>
          </>
        );
      }

    
      return (
        <div className="form-container">
            <div className="form-card">
                {error && <p className="error-message">{error}</p>}
                <h2>{t('EditPost')}</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">{t('Title')}</label>
                        <input
                            type="text"
                            id="title"
                            name={t('Title')}
                            value={post.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content">{t('Content')}</label>
                        <textarea
                            id="content"
                            name="content"
                            value={post.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category">{t('Category')}</label>
                        <select
                            id="category"
                            name="category"
                            value={post.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">{t('SelectCategory')}</option>
                            <option value="gallery">{t('Gallery')}</option>
                            <option value="searchandfind">{t('SearchAndFind')}</option>
                            <option value="recommendation">{t('Recommendation')}</option>
                        </select>
                    </div>

                    <div>
                        <h3>{t('CurrentPostImage')}</h3>
                        <img
                            src={post.imageUrl || DEFAULT_IMAGE_URL}
                            alt={post.title}
                            className="post-image-preview"
                        />
                    </div>

                    <div>
                        <label htmlFor="postImage">{t('ChangePostImage')}</label>
                        <input
                            type="file"
                            id="postImage"
                            name={t('ChangePostImage')}
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit" className="btn">{t('UpdatePost')}</button>
                </form>
            </div>
        </div>
    );
};
    
    export default PostEditPage;