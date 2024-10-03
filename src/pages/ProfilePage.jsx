import { useParams, Link, useNavigate } from 'react-router-dom'; 
import { useContext, useState } from 'react';
import UserInfoCard from '../components/UserInfoCard/UserInfoCard';  
import { AuthContext } from '../context/auth.context';  
import axios from 'axios';  
import Spinner from '../components/Spinner/Spinner';
import "../components/UserInfoCard/UserInfoCard.css"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

const ProfilePage = () => {
  const { userId } = useParams();  
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);  
  const [authorId, setAuthorId] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const isCurrentUser = isLoggedIn && user && user._id === userId;

  if (isLoading) {
    return (
      <div className="profile-spinner">
        <Spinner />
        <p>Loading user data...</p>
      </div>
    );
  }

  const startChat = () => {
    const participants = [user._id, authorId];  
    axios.post(`${API_URL}/chat`, { participants })
      .then((response) => {
        const { _id: conversationId } = response.data;  
        navigate(`/chat/${conversationId}`);
      })
      .catch((err) => {
        navigate(`/error`); 
      });
    }

  return (
    <div className="profile-page-container">
      <h1 className="profile-page-heading">
        {isCurrentUser ? 'My Profile' : `${username}'s Profile`}
      </h1>

      <UserInfoCard setAuthorId={setAuthorId} setUsername={setUsername} />

      <div className="profile-actions">
        {authorId && (
          <Link to={`/posts/author/${isCurrentUser ? user._id : authorId}`}>
            <button className="btn">View {isCurrentUser ? 'My' : `${username}'s`} Posts</button>
          </Link>
        )}

        {isCurrentUser && (
          <Link to={`/profile/${userId}/edit`}>
            <button className="btn">Edit Profile</button>
          </Link>
        )}

        {!isCurrentUser && authorId && (
          <button onClick={startChat} className="btn">Start Chat with {username}</button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
