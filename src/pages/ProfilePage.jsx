import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate to navigate between pages
import { useContext, useState } from 'react';
import UserInfoCard from '../components/UserInfoCard';  // Component to display user information
import { AuthContext } from '../context/auth.context';  // Get the logged-in user info from the AuthContext
import axios from 'axios';  // Import axios to send HTTP requests

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

const ProfilePage = () => {
  // Extract the `userId` of the profile being visited from the URL
  const { userId } = useParams();  

  // Get logged-in user details from the AuthContext
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);  

  // State to store the ID and username of the user whose profile is being visited
  const [authorId, setAuthorId] = useState(null);
  const [username, setUsername] = useState('');

  // For navigation after creating a chat
  const navigate = useNavigate();

  // Check if the logged-in user is viewing their own profile
  const isCurrentUser = isLoggedIn && user && user._id === userId;

  if (isLoading) return <p>Loading...</p>;

  // Function to start a new chat
  const startChat = () => {
    const participants = [user._id, authorId];  // Array of participant IDs: logged-in user and the profile being viewed

    // Send a POST request to the backend to create a new conversation or get the existing one
    axios.post(`${API_URL}/chat`, { participants })
      .then((response) => {
        const { _id: conversationId } = response.data;  // Extract conversationId from the response
        // Navigate to the chat page with the conversationId
        navigate(`/chat/${conversationId}`);
      })
      .catch((err) => console.error('Error starting chat:', err));
  };

  return (
    <div>
      {/* Heading to indicate whose profile is being viewed */}
      <h1>{isCurrentUser ? 'My Profile' : `${username}'s Profile`}</h1>

      {/* Display the profile information through UserInfoCard, which updates authorId and username */}
      <UserInfoCard setAuthorId={setAuthorId} setUsername={setUsername} />

      {/* Show the "View Posts" button */}
      {authorId && (
        <Link to={`/posts/author/${isCurrentUser ? user._id : authorId}`}>
          <button>View {isCurrentUser ? 'My' : `${username}'s`} Posts</button>
        </Link>
      )}

      {/* Show the "Edit Profile" button if the logged-in user is viewing their own profile */}
      {isCurrentUser && (
        <Link to={`/profile/${userId}/edit`}>
          <button>Edit Profile</button>
        </Link>
      )}

      {/* Conditionally render the "Start Chat" button if the logged-in user is viewing someone else's profile */}
      {!isCurrentUser && authorId && (
        <button onClick={startChat}>Start Chat with {username}</button>
      )}
    </div>
  );
};

export default ProfilePage;
