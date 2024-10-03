import { useTranslation } from "react-i18next";
import '../css/ErrorPage.css'; 
import { Link } from "react-router-dom";  


const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="error-page-container">
      <div className="error-card">
        <h1>{t('error')}</h1>
        <p className="error-button"> <Link to="/login">{t('goBack')}</Link></p> 
      </div>
    </div>
  );
};

export default ErrorPage;