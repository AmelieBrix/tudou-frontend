const PostDetails = ({ post, handleLike, handleCommentSubmit, comment, setComment }) => (
    <div>
      <h1>{post.title}</h1>
      <p>Author: {post.author ? post.author.username : 'Unknown'}</p>
      <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p> 
      <p>{post.content}</p> 
      
  
      <button onClick={handleLike}>Like ({post.likes.length})</button>
  
      <h2>Comments</h2>
      <ul>
        {post.comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <p>By: {comment.user ? comment.user.username : 'Unknown'}</p> 
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
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
  
  export default PostDetails;
  