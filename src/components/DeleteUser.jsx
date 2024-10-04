import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { useTranslation } from "react-i18next";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

const DeleteUser = ({ userId }) => {
    const { user, getToken, logOutUser } = useContext(AuthContext); // Ensure logOutUser is available from AuthContext
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = getToken();
    const { t } = useTranslation();


    const handleDelete = () => {
      if (window.confirm(t('DeleteQuestion'))) {
        
        if (!user || !token) {
          setError("You must be logged in to delete the account.");
          return;
        }
    
        axios.delete(`${API_URL}/users/${userId}/delete`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          logOutUser() // Log out the user after deletion
          .then(() => {
            navigate('/'); // Redirect to the homepage after logout
          })
          .catch(logOutError => {
            console.error('Error logging out after deletion:', logOutError);
            setError('Failed to log out after account deletion.');
          });
        })
        .catch(err => {
          console.error('Error deleting user:', err);
          setError('Failed to delete user profile.');
        });
      }
    };

    return (
      <div>
        {error && <p>{error}</p>}
        <button onClick={handleDelete}>{t('DeleteUser')}</button>
      </div>
    );
};

export default DeleteUser;
