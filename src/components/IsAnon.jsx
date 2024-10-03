import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import Spinner from './Spinner/Spinner';

function IsAnon( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <>
        <Spinner />
        <p>Loading...</p>
      </>
    );
  }

  if (isLoggedIn) {
    // If the user is logged in, navigate to the home page     
    return <Navigate to="/" />;
  } else {
    // If the user is not logged in, allow to see the page 
    return children;
  }
}

export default IsAnon;
