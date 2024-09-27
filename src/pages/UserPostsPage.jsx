import { useParams } from 'react-router-dom';
import PostList from '../components/Postlist';  

const UserPostsPage = () => {
  const { authorId } = useParams();  

  return (
    <div>
      <h1>User's Posts</h1>
      {/* Display the posts by the user */}
      <PostList authorId={authorId} />
    </div>
  );
};

export default UserPostsPage;
