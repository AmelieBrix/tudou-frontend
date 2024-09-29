import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const PostDetails = ({ post, handleLike, handleCommentSubmit, comment, setComment, handleDelete, handleDeleteComment }) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        Author: {post.author ? (
          <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link>
        ) : (
          'Unknown'
        )}
      </p>
      <p>{post.category}</p>

       {/* Display post image if available */}
       {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} style={{ width: '400px', height: 'auto' }} />
      )}


      <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
      <p>{post.content}</p>


      <button onClick={handleLike}>Like ({post.likes.length})</button>
      {user && user._id === post.author._id && (
        <>
          {/* editing a post */}
          <Link to={`/posts/${post._id}/edit`}>
            <button>Edit Post</button>
          </Link>

          {/* deeletin a post*/}
          <button onClick={handleDelete}>Delete Post</button>
        </>
      )}


      <h2>Comments</h2>
      <ul>
        {post.comments.map(comment => (
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
              <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
            )}
          </li>
        ))}
      </ul>


      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        {user && user._id === post.author._id && (
          <>
            <button onClick={handleDelete}>Delete Post</button>
          </>
        )}
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  )
};

export default PostDetails;

//   {user && user._id === post.author._id && (
// <>
//<button onClick={handleEdit}>Edit Post</button>
//<button onClick={handleDelete}>Delete Post</button>
//</>
//)}/*