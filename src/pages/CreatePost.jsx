import { useParams } from 'react-router-dom';
import CreatePost from '../components/CreatePost'; 

const CreatePostPage = () => {
  const { category } = useParams(); 

  return (
    <div>
      <h1>Create a new post in {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <CreatePost category={category} />  {/* Pass the category to CreatePost */}
    </div>
  );
};

export default CreatePostPage;
