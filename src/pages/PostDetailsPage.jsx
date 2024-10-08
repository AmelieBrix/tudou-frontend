import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostDetails from '../components/PostDetail/PostDetail';
import Spinner from '../components/Spinner/Spinner';
import { useTranslation } from "react-i18next";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";  

const PostDetailPage = () => {
  const { postId } = useParams();  
  const [post, setPost] = useState(null);    
  const [comment, setComment] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true); // Start loading
    
    setTimeout(() => {
      axios.get(`${API_URL}/posts/${postId}`)
        .then(response => {
          console.log(response.data);
          setPost(response.data);   
          setLoading(false); 
        }) 
        .catch(err => {
          setError('Error fetching post details');
          setLoading(false); 
        });
    }, 2000); 
  }, [postId]);

  const handleDelete = () => {
    const token = localStorage.getItem('authToken');  

    axios.delete(`${API_URL}/posts/${postId}/delete`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
    .then(() => {
       
      navigate(`/profile/${post.author._id}`);  
    })
    .catch(err => {
      setError('Error deleting the post');
    });
  };

  const handleDeleteComment = (commentId) => {
    const token = localStorage.getItem('authToken');

    axios.delete(`${API_URL}/posts/comments/${commentId}`, {  
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      setPost(prevPost => ({
        ...prevPost,
        comments: prevPost.comments.filter(comment => comment._id !== commentId)
      }));
    })
    .catch(err => {
      setError('Error deleting the comment');
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('authToken');  
    
    axios.post(`${API_URL}/posts/${postId}/createComments`, 
      { content: comment }, 
      {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      })
      .then(response => {
        setPost(prevPost => ({
          ...prevPost,
          comments: [...prevPost.comments, response.data.comment]
        }));
        setComment('');  
      })
      .catch(err => setError('Error adding comment'));
};

  const handleLike = () => {
    const token = localStorage.getItem('authToken');
    axios.post(`${API_URL}/posts/${postId}/like`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('this is the response',response);
        console.log('this is the response.data', response.data);
        setPost(response.data);  
        console.log('poto pelado')
      })
      .catch(err => setError('Error liking the post'));
  };

  if (loading) {
    return (
      <>
        <Spinner />
        <p>{t('LoadingPostData')}</p>
      </>
    );
  }

  if (!loading && !post) {
    return <p>{t('NoPostData')}</p>;
  }

  

  return (
    <div>
      {error && <p>{error}</p>}
      
      <PostDetails 
        post={post} 
        handleLike={handleLike} 
        handleCommentSubmit={handleCommentSubmit}
        comment={comment}
        setComment={setComment}
        handleDelete={handleDelete}
        handleDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default PostDetailPage;
