import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import DeleteUser from '../components/DeleteUser';
import '../css/EditProfilePage.css';
import { useTranslation } from "react-i18next";
  

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

const EditProfilePage = () => {
  const { user, getToken } = useContext(AuthContext);
  const [profile, setProfile] = useState({ first_Name: '', last_Name: '', username: '', email: '', profilePicture: '', currentPassword: '', newPassword: '' });
  const [profilePicture, setProfilePicture] = useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = getToken();

  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      setProfile({
        first_Name: user.first_Name || '',
        last_Name: user.last_Name || '',
        username: user.username || '',
        email: user.email || '',
        profilePicture: user.profilePicture || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value || ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('first_Name', profile.first_Name);
    formData.append('last_Name', profile.last_Name);
    formData.append('username', profile.username);
    formData.append('email', profile.email);

    if (profile.currentPassword) formData.append('currentPassword', profile.currentPassword);
    if (profile.newPassword) formData.append('newPassword', profile.newPassword);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    axios.put(`${API_URL}/users/${user._id}/edit`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.authToken) {
          localStorage.setItem('authToken', response.data.authToken);
        }
        navigate(`/profile/${user._id}`);
      })
      .catch(err => {
        setError('Error updating profile');
        console.error(err);
      });
  };

  return (
    <div className="edit-profile-container">
      <h1>{t('EditProfile')}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-profile-form">

        <label>{t('FirstName')}</label>
        <input type="text" name="first_Name" value={profile.first_Name || ''} onChange={handleChange} />

        <label>{t('LastName')}</label>
        <input type="text" name="last_Name" value={profile.last_Name || ''} onChange={handleChange} />

        <label>{t('Username')}</label>
        <input type="text" name="username" value={profile.username || ''} onChange={handleChange} required />

        <label>{t('Email')}</label>
        <input type="email" name="email" value={profile.email || ''} onChange={handleChange} required />

        <label>{t('CurrentPassword')}</label>
        <input type="password" name="currentPassword" onChange={handleChange} value={profile.currentPassword} placeholder="Enter current password" />

        <label>{t('NewPassword')}</label>
        <input type="text" name="newPassword" onChange={handleChange} value={profile.newPassword} placeholder="Enter new password" />

        <label>{t('ProfilePicture')}</label>
        <input type="file" name="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />

        <button type="submit" className="btn">{t('Update Profile')}</button>
      </form>

      <DeleteUser userId={user._id} />
    </div>
  );
};

export default EditProfilePage;
