import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import '../PostDetail/PostDetail.css';

const DEFAULT_IMAGE_URL = 'https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727615596/PostDefault_ua9vkv.png';

const PostDetails = ({ post, handleLike, handleCommentSubmit, comment, setComment, handleDelete, handleDeleteComment }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="post-details-container">
      {/* Post Header */}
      <div className="post-header">
      <div className="post-author-container">
          {post.author && post.author.profilePicture && (
            <img src={post.author.profilePicture} alt="Profile" className="author-picture" />
          )}
          <p className="post-author">
            By: <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link>
            <span className="created-at"> | {new Date(post.createdAt).toLocaleDateString()}</span>
          </p>
        </div>
        <h1>{post.title}</h1>       
      </div>

      <img src={post.imageUrl || DEFAULT_IMAGE_URL} alt={post.title} className="post-image" />
      <button className={`like-button ${post.likes.includes(user._id) ? 'liked' : ''}`} onClick={handleLike}>
        ❤️ {post.likes.length}
      </button>

      <p>{post.content}</p>

      {user && user._id === post.author._id && (
        <div className="post-actions">
          <Link to={`/posts/${post._id}/edit`}>
            <button>Edit Post</button>
          </Link>
          <button onClick={handleDelete}>Delete Post</button>
        </div>
      )}

      <div className="comment-section">
        <h2>Comments</h2>
        <ul className="comment-list">
          {post.comments.length > 0 ? (
            post.comments.map(comment => (
              <li key={comment._id}>
                <p>{comment.content}</p>
                <p>
                  By: {comment.user ? (
                    <Link to={`/profile/${comment.user._id}`}>{comment.user.username}</Link>
                  ) : (
                    'Unknown'
                  )}
                </p>
                {/* Conditionally render the delete button only for the comment author */}
                {user && user._id === comment.user._id && (
                  <button onClick={() => handleDeleteComment(comment._id)} className="delete-comment-btn">Delete Comment</button>
                )}
              </li>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </ul>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="comment-input">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default PostDetails;
