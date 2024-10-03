import { useParams } from 'react-router-dom';
import CreatePost from '../components/CreatePost'; 
import "../css/CreatePost.css";

const CreatePostPage = () => {
  const { category } = useParams(); 

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Create a new post {category ? `in ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''}</h2>
        <CreatePost category={category} />
      </div>
    </div>
  );
};

export default CreatePostPage;
