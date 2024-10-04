// src/components/IsPrivate.jsx

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import Spinner from './Spinner/Spinner';
import { useTranslation } from "react-i18next";

function IsPrivate( { children } ) {
  const { t } = useTranslation();
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) {
    return (
      <>
        <Spinner />
        <p>{t('Loading')}</p>
      </>
    );
  }



  if (!isLoggedIn) {
  // If the user is not logged in 
    return <Navigate to="/login" />;
  } else {
  // If the user is logged in, allow to see the page 
    return children;
  }
}

export default IsPrivate;
