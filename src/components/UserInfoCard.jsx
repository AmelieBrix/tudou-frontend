import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { useParams } from 'react-router-dom';  

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005"; 

const UserInfoCard = ({setAuthorId, setUsername}) => {
  const { userId } = useParams();  
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useContext(AuthContext);  

  useEffect(() => {
    const token = getToken();  

    console.log('Fetching user with userid:', userId);  

    if (!userId) {
      setError('User not found');
      return;
    }


    axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    })
    .then(response => {
      setUserInfo(response.data);
      setAuthorId(response.data._id);
      setUsername(response.data.username);
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to load user information', err);
      setError(`Failed to load user information: ${err.message}`);
      setLoading(false);
    });
  }, [userId, getToken, setAuthorId, setUsername]); 

  if (loading) return <p>Loading user info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-info-card">
      <div className="user-info-card__header">
        <img 
          src={userInfo.profilePicture || '/default.png'} 
          alt={`${userInfo.username}'s profile`} 
          className="user-info-card__image"
        />
        <div className="user-info-card__details">
          <h2>{userInfo.first_Name} {userInfo.last_Name}</h2>
          <p>@{userInfo.username}</p>
          <p>{userInfo.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;