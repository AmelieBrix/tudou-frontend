import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('welcome')}</h1>  {/* Translated text for 'welcome' */}
      <p>{t('description')}</p>  {/* Translated text for 'description' */}
 {/* Category buttons */}
 <div style={{ display: 'flex', gap: '10px' }}>
        {/* Button for Gallery */}
        <Link to="/gallery">
          <button>{t('viewGallery')}</button>  {/* Translated 'View Gallery' */}
        </Link>

        {/* Button for Recommendations */}
        <Link to="/recommendations">
          <button>{t('viewRecommendations')}</button>  {/* Translated 'View Recommendations' */}
        </Link>

        {/* Button for Search and Find */}
        <Link to="/searchandfind">
          <button>{t('viewSearchAndFind')}</button>  {/* Translated 'View Search & Find' */}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;