const PostDetails = ({ post, handleLike, handleCommentSubmit, comment, setComment }) => (
    <div>
      <h1>{post.title}</h1>
      <p>Author: {post.author ? post.author.username : 'Unknown'}</p>
      <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p> {/* Display date */}
      <p>{post.content}</p> {/* Display content */}
      
      {/* Display like button */}
      <button onClick={handleLike}>Like ({post.likes.length})</button>
  
      {/* Comment section */}
      <h2>Comments</h2>
      <ul>
        {post.comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <p>By: {comment.user ? comment.user.username : 'Unknown'}</p> {/* Show comment author */}
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
    </div>
  );
  
  export default PostDetails;
  