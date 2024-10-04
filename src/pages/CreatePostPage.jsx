import { useParams } from 'react-router-dom';
import CreatePost from '../components/CreatePost'; 
import "../css/CreatePost.css";
import { useTranslation } from "react-i18next";

const CreatePostPage = () => {
  const { category } = useParams(); 
  const { t } = useTranslation();


  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{t('CreateNewPost')} {category ? `in ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''}</h2>
        <CreatePost category={category} />
      </div>
    </div>
  );
};

export default CreatePostPage;
