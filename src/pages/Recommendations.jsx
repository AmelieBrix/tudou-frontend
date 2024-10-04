import { Link } from 'react-router-dom';
import PostList from '../components/Postlist/Postlist';  // Import the reusable PostList component
import '../css/CategoryPage.css';
import { useTranslation } from "react-i18next";


const RecommendationPage = () => {
  const { t } = useTranslation();

  return (
    <div className="category-page">
      {/* Large image header with text overlay */}
      <div className="category-header">
        <img src="https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727948872/mjrcvykf2yk1twp4nqli.png" alt="Recommendation Header" className="header-image" />
        <div className="header-content">
          <Link to="/createpost/recommendation">
            <button className="fancy-button">{t('CreateNewPost')}</button>
          </Link>
        </div>
      </div>

      {/* Post List */}
      <div className="post-list-container">
        <PostList category="recommendation" />
      </div>
    </div>
  );
};



export default RecommendationPage;
