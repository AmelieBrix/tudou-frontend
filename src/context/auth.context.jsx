import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5005";   // import.meta.env
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
    // Store the token in localStorage
    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
      };
    
      // Get token from localStorage
      const getToken = () => {
        return localStorage.getItem('authToken');
      };
    
      // Check if the user is authenticated
      const authenticateUser = () => {
        const storedToken = getToken();
    
        if (storedToken) {
          axios.get(`${API_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          })
          .then((response) => {
            const user = response.data;
            console.log('User authenticated:', user);
            setUser(user);  // Store user details
            setIsLoggedIn(true);     // User is logged in
            setIsLoading(false);     // Done loading
          })
          .catch((error) => {
            console.error("Token verification failed:", error);
            setUser(null);  
            setIsLoggedIn(false);    // User is not logged in
            setIsLoading(false);
          });
        } else {
            setUser(null);  
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      };
    
      // Remove the token on logout
      const logOutUser = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUser(null);
      };
    
      // Check if user is authenticated on mount
      useEffect(() => {
        authenticateUser();
      }, []);


      return (
        <AuthContext.Provider
          value={{
            isLoggedIn,
            isLoading,
            user,
            storeToken,  // Make storeToken available to all components
            authenticateUser,
            logOutUser   // Make logOutUser available to components
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );
    }

const useAuth = () => useContext(AuthContext);


export { AuthProviderWrapper, useAuth, AuthContext };
