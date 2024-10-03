import { useParams, Navigate } from 'react-router-dom';
import PostList from '../components/Postlist/Postlist';  
import { Link } from 'react-router-dom';
import '../css/UserPostsPage.css'; // Link to your custom CSS file

const UserPostsPage = () => {
  const { authorId } = useParams();  

  if (!authorId) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="user-post-page-container">
      <h1 className="user-post-title">My Posts</h1>
      <PostList authorId={authorId} />

      <Link to="/createpost/" className="create-post-button">
        Create Post
      </Link>
    </div>
  );
};

export default UserPostsPage;
