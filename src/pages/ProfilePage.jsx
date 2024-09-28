import { useParams, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserInfoCard from '../components/UserInfoCard';  // Component for displaying user information
import { AuthContext } from '../context/auth.context';

const ProfilePage = () => {
  const { userId } = useParams();  
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);  
  const [authorId, setAuthorId] = useState(null);
  const [username, setUsername] = useState('');


  // Check if the logged-in user is viewing their own profile
  const isCurrentUser = isLoggedIn && user && user._id === userId;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>      
    <h1>{isLoggedIn && user._id === userId ? 'My Profile' : `${username}'s Profile`}</h1>


      {/* Display the user's profile information */}
      <UserInfoCard setAuthorId={setAuthorId} setUsername={setUsername} />

      {/* Conditionally show the button only when authorId is available */}
      {authorId && (
        <Link to={`/posts/author/${isCurrentUser ? user._id : authorId}`}>
          <button>View {isCurrentUser ? 'My' : 'Their'} Posts</button>
        </Link>
      )}

      {isCurrentUser && (
        <Link to={`/profile/${userId}/edit`}>
          <button>Edit Profile</button>
        </Link>
      )}

    </div>
  );
};

export default ProfilePage;
