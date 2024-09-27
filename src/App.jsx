import "./App.css";
import './i18n'; 
import { Routes, Route } from "react-router-dom"; // <== IMPORT

import Navbar from "./components/Navbar";     // <== IMPORT
import HomePage from "./pages/HomePage";     // <== IMPORT
import SignupPage from "./pages/SignupPage"; 
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import GalleryPage from "./pages/GalleryPage";
import RecommendationPage from "./pages/Recommendations";
import SearchAndFindPage from "./pages/SearchFind";
import CreatePostPage from "./pages/CreatePost";
import PostDetailPage from "./pages/PostDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import UserPostsPage from "./pages/UserPostsPage";
 
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>      
        <Route path="/" element={ <HomePage/> } />
        <Route path="/signup" element={ <IsAnon><SignupPage/></IsAnon> } />
        <Route path="/login" element={ <IsAnon><LoginPage/></IsAnon> } />
        <Route path="/gallery" element={ <IsPrivate><GalleryPage/></IsPrivate> } />
        <Route path="/searchandfind" element={ <IsPrivate><SearchAndFindPage/></IsPrivate> } />
        <Route path="/recommendations" element={ <IsPrivate><RecommendationPage/></IsPrivate> } />
        <Route path="/createpost/:category" element={ <IsPrivate><CreatePostPage/></IsPrivate> } />
        <Route path="/:category/:postId" element={<PostDetailPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/posts/:authorId" element={<UserPostsPage />} />
        </Routes>
      
    </div>
  );
}
 
export default App;