// src/pages/SignupPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';  

function SignupPage(props) {

    const [firstName, setFirstName] = useState("");  // Added first name state
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleFirstName = (e) => setFirstName(e.target.value);  // Added first name handler
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleUsername = (e) => setName(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("I am the submit button")
        if (!firstName || !lastName || !email || !password || !username) {
            setErrorMessage("All fields are required.");
            return; 
        }

        const requestBody = {
            first_Name: firstName,   // Correct field name
            last_Name: lastName,
            email,
            password,
            username
        };

        axios.post(`${API_URL}/auth/signup`, requestBody)
            .then(() => {
                // Redirect to the login page on success
                console.log("I AM HERE IN THE AXIOS POST!");
                navigate('/login');
            })
            .catch((error) => {
                // Handle any errors and set error message in state
                const errorDescription = error.response?.data?.message || "Something went wrong. Please try again.";
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>

            <form onSubmit={handleSignupSubmit}>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstName}
                />

                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastName}
                />

                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                />

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

                <button type="submit">Sign Up</button>
            </form>

            {/* Display error messages if any */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default SignupPage;