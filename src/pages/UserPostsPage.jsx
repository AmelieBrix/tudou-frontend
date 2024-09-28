import { useParams, Navigate } from 'react-router-dom';
import PostList from '../components/Postlist';  

const UserPostsPage = () => {
  const { authorId } = useParams();  

  if (!authorId) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div>
      <h1>My Posts</h1>
      {/* Display the posts by the user */}
      <PostList authorId={authorId} />
    </div>
  );
};

export default UserPostsPage;
