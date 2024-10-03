import { useParams, Navigate } from 'react-router-dom';
import PostList from '../components/Postlist/Postlist';  
import { Link } from 'react-router-dom';

const UserPostsPage = () => {
  const { authorId } = useParams();  

  if (!authorId) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div>
      <h1>My Posts</h1>
      <PostList authorId={authorId} />

      <Link to={"/createpost/"}>Create Post</Link>
    </div>
  );
};

export default UserPostsPage;
