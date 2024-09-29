import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostDetails from '../components/PostDetail';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";  



const PostDetailPage = () => {
  const { postId } = useParams();  
  const [post, setPost] = useState(null);    
  const [comment, setComment] = useState(''); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/posts/${postId}`)
      .then(response => {
        console.log(response.data)
        setPost(response.data);   
      }) 
      .catch(err => {
        setError('Error fetching post details');
      });
  }, [postId]);

  // Function to handle adding a new comment

  const handleDelete = () => {
    const token = localStorage.getItem('authToken');  // Assuming the authToken is stored in localStorage

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
      // After successful deletion, remove the comment from the post state
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
    axios.post(`${API_URL}/posts/${postId}/like`)
      .then(response => {
        setPost(response.data);  // Update post with new like
      })
      .catch(err => setError('Error liking the post'));
  };

  if (!post) return <p>Loading post details...</p>;

  return (
    <div>
      {error && <p>{error}</p>}
      
      {/* Use the PostDetails component */}
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


//handleDelete={handleDelete}  
        //handleEdit={handleEdit} 