// src/pages/SignupPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";  
import '../css/Signup.css';
import { useTranslation } from "react-i18next";



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

function SignupPage(props) {

    const [firstName, setFirstName] = useState("");  
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const { t } = useTranslation();

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleFirstName = (e) => setFirstName(e.target.value);  // Added first name handler
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleUsername = (e) => setName(e.target.value);

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !password || !username) {
            setErrorMessage("All fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append("first_Name", firstName);
        formData.append("last_Name", lastName);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);

        // Append the profile picture only if the user has selected a file
        if (profilePicture) {
            formData.append("profilePicture", profilePicture); // Append file to the form data
        }

        // Send the FormData object with axios
        axios.post(`${API_URL}/auth/signup`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Set the correct headers
            },
        })
            .then(() => {
                // Redirect to the login page on success
                console.log("Signup successful!");
                navigate('/login');
            })
            .catch((error) => {
                // Handle any errors and set error message in state
                const errorDescription = error.response?.data?.message || "Something went wrong. Please try again.";
                setErrorMessage(errorDescription);
                navigate(`/error`);
            });
    };

    return (
        <Container className="signup-page">
            <div className="form-card">
                <h2>{t('Signup')}</h2>
                <Form onSubmit={handleSignupSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('FirstName')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={firstName} 
                            onChange={handleFirstName} 
                            placeholder={t('FirstName')}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{t('LastName')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={lastName} 
                            onChange={handleLastName} 
                            placeholder={t('LastName')}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{t('Username')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={username} 
                            onChange={handleUsername} 
                            placeholder={t('Username')}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{t('Email')}</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={handleEmail} 
                            placeholder={t('Email')}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{t('Password')}</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} 
                            onChange={handlePassword} 
                            placeholder={t('Password')}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{t('ProfilePicture')}</Form.Label>
                        <Form.Control 
                            type="file" 
                            onChange={handleProfilePictureChange} 
                        />
                    </Form.Group>

                    {errorMessage && (
                        <Alert variant="danger" className="mt-3">
                            {errorMessage}
                        </Alert>
                    )}

                    <Button variant="primary" type="submit" className="btn-block">
                    {t('Signup')}
                    </Button>
                </Form>

                <p className="mt-3">{t('AlreadyAccount')} <Link to="/login">{t('Login')}</Link></p>
            </div>
        </Container>
    );
}

export default SignupPage;