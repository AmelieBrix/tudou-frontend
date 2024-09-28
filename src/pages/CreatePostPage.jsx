import { useParams } from 'react-router-dom';
import CreatePost from '../components/CreatePost'; 

const CreatePostPage = () => {
  const { category } = useParams(); 

  return (
    <div>
      {/* If category is present in the URL, display the category in the heading */}
      <h1>Create a new post {category ? `in ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''}</h1>
      
      {/* Pass the category to CreatePost if it's available */}
      <CreatePost category={category} />
    </div>
  );
};

export default CreatePostPage;
