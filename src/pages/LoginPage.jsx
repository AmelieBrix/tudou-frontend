import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";  // We will use `useNavigate` to redirect after login.
import { AuthContext } from "../context/auth.context";
import { Form, Button, Container, Alert } from "react-bootstrap";  
import "../css/Login.css";
 
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";  
 
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
        const requestBody = { email, password };

     axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken); 
        authenticateUser();
        navigate('/');                             
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "Login failed. Please try again.";
        setErrorMessage(errorDescription);
      });
  };
  
  // The component renders the form with email and password inputs and handles form submission
  return (
    <Container className="signup-page">  {/* Reusing the same container class */}
    <div className="form-card">
      <h2>Login</h2>
      <Form onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            value={email} 
            onChange={handleEmail} 
            placeholder="Enter your email" 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            value={password} 
            onChange={handlePassword} 
            placeholder="Enter your password" 
            required
          />
        </Form.Group>

        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}

        <Button variant="primary" type="submit" className="btn-block">
          Login
        </Button>
      </Form>

      <p className="mt-3">Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
    </div>
  </Container>
);
}

export default LoginPage;
