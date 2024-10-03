import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { useParams } from 'react-router-dom';  
import Spinner from '../Spinner/Spinner';
import './UserInfoCard.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005"; 

const DEFAULT_IMAGE_URL = 'https://tudou-backend.onrender.com/public/images/default.png'; // maybe add localhost?


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
      setError(`Failed to load user information: ${err.message}`);
      setLoading(false);
    });
  }, [userId, getToken, setAuthorId, setUsername]); 

  if (loading) {
    return (
      <div className="user-info-spinner">
        <Spinner />
        <p>Loading user info...</p>
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <div className="user-info-card">
      <div className="user-info-card__header">
        <img 
          src={userInfo.profilePicture || DEFAULT_IMAGE_URL}
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