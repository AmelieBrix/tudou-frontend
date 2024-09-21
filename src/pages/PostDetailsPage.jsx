import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetailPage = () => {
  const { category, postId } = useParams();  // Extract category and postId from the URL
  const [post, setPost] = useState(null);    // State to store post details
  const [comment, setComment] = useState('');  // State to store new comment
  const [error, setError] = useState(null);

  // Fetch post details on component mount
  useEffect(() => {
    axios.get(`http://localhost:5005/posts/${category}/${postId}`)
      .then(response => {
        setPost(response.data);   // Store post details in state
      })
      .catch(err => {
        setError('Error fetching post details');
      });
  }, [category, postId]);

  // Function to handle adding a new comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // POST request to add a new comment
    axios.post(`http://localhost:5005/posts/${category}/${postId}/comment`, { text: comment })
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
      <h1>{post.title}</h1>
      <p>Author: {post.author.username}</p>   {/* Display author */}
      <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p> {/* Display date */}
      <p>{post.content}</p>   {/* Display content */}
      <button onClick={handleLike}>Like ({post.likes.length})</button> {/* Display like button */}

      {/* Comment section */}
      <h2>Comments</h2>
      <ul>
        {post.comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <p>By: {comment.author.username}</p>
          </li>
        ))}
      </ul>

      {/* Comment input */}
      <form onSubmit={handleCommentSubmit}>
        <textarea 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Add a comment" 
          required 
        />
        <button type="submit">Submit Comment</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default PostDetailPage;
