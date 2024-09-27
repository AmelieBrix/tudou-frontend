import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDetails from '../components/PostDetail';

const PostDetailPage = () => {
  const { category, postId } = useParams();  
  const [post, setPost] = useState(null);    
  const [comment, setComment] = useState(''); 
  const [error, setError] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:5005/posts/${postId}`)
      .then(response => {
        console.log(response.data)
        setPost(response.data);   
      }) 
      .catch(err => {
        setError('Error fetching post details');
      });
  }, [category, postId]);

  // Function to handle adding a new comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    // Get the token (this assumes you have a function to retrieve it, like from localStorage)
    const token = localStorage.getItem('authToken');  // Or use your own method to get the token
    
    // Add the token to the Authorization header
    axios.post(`http://localhost:5005/posts/${postId}/createComments`, 
      { content: comment }, 
      {
        headers: {
          Authorization: `Bearer ${token}`  // Send the token as a Bearer token
        }
      })
      .then(response => {
        setPost(prevPost => ({
          ...prevPost,
          comments: [...prevPost.comments, response.data.comment]
        }));
        setComment('');  // Clear comment input
      })
      .catch(err => setError('Error adding comment'));
};

  // Function to handle liking the post
  const handleLike = () => {
    axios.post(`http://localhost:5005/posts/${category}/${postId}/like`)
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
      />
    </div>
  );
};

export default PostDetailPage;
