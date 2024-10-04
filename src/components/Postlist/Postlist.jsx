import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import "./Postlist.css"
import { useTranslation } from "react-i18next";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

const PostList = ({ category, authorId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const { t } = useTranslation();


  useEffect(() => {
    let url; 
    if (authorId) {
      url = `${API_URL}/posts/author/${authorId}`; 
      console.log('Fetching posts from author:', url); 
    } else if (category) {
      url = `${API_URL}/posts?category=${category}`;
      console.log('Fetching posts from category:', url);
    } else {
      setError("Invalid filter for posts");
      setLoading(false);
      return;
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
  }, [category, authorId, token]);


  if (loading) {
    return (
      <>
        <Spinner />
        <p>{t('Loading')}</p>
      </>
    );
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  // <p>Author: {post.author ? post.author.username : 'Unknown'}</p> 
  // 
  return (
    <div className="post-list-container">
      <ul className="post-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <li key={post._id} className="post-card">
              <div className="post-header">
                <div className="author-info">
                  {post.author && post.author.profilePicture && (
                    <img
                      src={post.author.profilePicture}
                      alt={post.author.username}
                      className="author-picture"
                    />
                  )}
                  <div className="author-name">
                    <Link to={`/profile/${post.author._id}`}>
                      {post.author ? post.author.username : 'Unknown'}
                    </Link>
                  </div>
                </div>
                <h2 className="post-title">
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </h2>
              </div>
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="post-image" />
              )}
              <p className="post-content">{post.content.slice(0, 100)}...</p>
            </li>
          ))
        ) : (
          <p>{t('NoPostData')}</p>
        )}
      </ul>
    </div>
  );
};

export default PostList;
