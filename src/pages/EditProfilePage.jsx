import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import DeleteUser from '../components/DeleteUser';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

const EditProfilePage = () => {
  const { user, getToken } = useContext(AuthContext); // Get user and token
  const [profile, setProfile] = useState({ first_Name: '', last_Name: '', username: '', email: '', profilePicture: '', imageUrl: '' , currentPassword: '', newPassword: ''  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = getToken();

  console.log("here is the user");
  console.log(user.first_Name);
  console.log(" here is the user.id");
  console.log(user.id);
  console.log("this is user._id");
  console.log(user._id);

  useEffect(() => {
    if (user) {
        console.log('right here--> ',user.first_Name);
    // Load current user data into the form
    setProfile({
     first_Name: user.first_Name || '',   
      last_Name: user.last_Name || '',     
      username: user.username || '',       
      email: user.email || '',             
      profilePicture: user.profilePicture || '',
    });
  }}, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Auth profile check:', profile);
    console.log('User ID:', user._id); 

    axios.put(`${API_URL}/users/${user._id}/edit`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          console.log('Profile updated:', response.data);
    
          // If a new token is returned, store it
          if (response.data.authToken) {
            // Replace the old token with the new one
            localStorage.setItem('authToken', response.data.authToken);
          }
    
          // Redirect to the user's profile page
          navigate(`/profile/${user._id}`); 
        })
        .catch(err => {
          setError('Error updating profile');
          console.error(err);
        });
    };

  return (
    <div>
      <h1>Edit Profile</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>

      <label>First Name</label>
        <input type="text" name="first_Name" value={profile.first_Name || ''} onChange={handleChange} />

        <label>Last Name</label>
        <input type="text" name="last_Name" value={profile.last_Name || ''} onChange={handleChange} />

        <label>Username</label>
        <input type="text" name="username" value={profile.username || ''} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={profile.email || ''} onChange={handleChange} required />

        <label>Current Password</label>
        <input type="password" name="currentPassword" onChange={handleChange} value={profile.currentPassword}  placeholder="Enter current password" />

        <label>New Password</label>
        <input type="text" name="newPassword" onChange={handleChange} value={profile.newPassword}  placeholder="Enter new password" />

        <label>Profile Picture URL</label>
        <input type="text" name="profilePicture" value={profile.profilePicture} onChange={handleChange} />

        <button type="submit">Update Profile</button>
      </form>

      <DeleteUser userId={user._id}/>


      

    </div>
  );
};

export default EditProfilePage;
