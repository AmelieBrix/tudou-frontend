import { Link } from 'react-router-dom';
import PostList from '../components/Postlist/Postlist';  // Import the reusable PostList component
import '../css/CategoryPage.css'

const GalleryPage = () => {
  return (
    <div className="category-page">
    {/* Large image header with text overlay */}
    <div className="category-header">
      <img src="https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727947817/tsjgffu4wabcrcdqcwzx.png" alt="Gallery Header" className="header-image" />
      <div className="header-content">
        <Link to="/createpost/gallery">
          <button className="fancy-button">Create New Post</button>
        </Link>
      </div>
    </div>

    {/* Post List */}
    <div className="post-list-container">
      <PostList category="gallery" />
    </div>
  </div>
);
};


export default GalleryPage;
