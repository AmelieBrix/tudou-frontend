import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import UserInfoCard from '../components/UserInfoCard';  // Component for displaying user information
import { AuthContext } from '../context/auth.context';

const ProfilePage = () => {
  const { username } = useParams();  
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);  

  // Check if the logged-in user is viewing their own profile
  const isCurrentUser = isLoggedIn && user && user.username === username;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{isCurrentUser ? 'My Profile' : `${username}'s Profile`}</h1>

      {/* Display the user's profile information */}
      <UserInfoCard username={username} />

      {/* Show "View My Posts" button only if the logged-in user is viewing their own profile */}
      {isCurrentUser && (
        <Link to={`/posts/${user._id}`}>
          <button>View My Posts</button>
        </Link>
      )}
    </div>
  );
};

export default ProfilePage;
