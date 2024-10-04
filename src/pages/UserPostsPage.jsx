import { useParams, Navigate } from 'react-router-dom';
import PostList from '../components/Postlist/Postlist';  
import { Link } from 'react-router-dom';
import '../css/UserPostsPage.css'; // Link to your custom CSS file
import { useTranslation } from "react-i18next";

const UserPostsPage = () => {
  const { authorId } = useParams();  
  const { t } = useTranslation();


  if (!authorId) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="user-post-page-container">
      <h1 className="user-post-title">{t('MyPosts')}</h1>
      <PostList authorId={authorId} />

      <Link to="/createpost/" className="create-post-button">
      {t('CreateNewPost')}
      </Link>
    </div>
  );
};

export default UserPostsPage;
