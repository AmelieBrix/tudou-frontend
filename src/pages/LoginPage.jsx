// src/pages/LoginPage.jsx
 
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";  // We will use `useNavigate` to redirect after login.
import { AuthContext } from "../context/auth.context";
 
const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5005";  
 
function LoginPage(props) {
  const [email, setEmail] = useState("");  // For email input
  const [password, setPassword] = useState("");  // For password input
  const [errorMessage, setErrorMessage] = useState(undefined);  // For displaying errors
  
  const navigate = useNavigate();  // Hook to navigate to other pages.
 
  const { storeToken, authenticateUser } = useContext(AuthContext)

  // Handlers to update state when form inputs change
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  // This function will handle form submission for login
  const handleLoginSubmit = (e) => {
    e.preventDefault(); 
    
    // Prepare request body with email and password
    const requestBody = { email, password };

    console.log('this is the api url',API_URL);
 
    // Send POST request to login API endpoint
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // On success, response will contain the JWT token
        console.log('JWT token:', response.data.authToken); 

        storeToken(response.data.authToken); 

        authenticateUser();

        navigate('/');                             
      })
      .catch((error) => {
        // Handle errors 
        const errorDescription = error.response?.data?.message || "Login failed. Please try again.";
        setErrorMessage(errorDescription);
      });
  };
  
  // The component renders the form with email and password inputs and handles form submission
  return (
    <div className="LoginPage">
      <h1>Login</h1>

      {/* The login form */}
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>

      {/* Show error messages if login fails */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
};

export default LoginPage;
