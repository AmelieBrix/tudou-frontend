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
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailPage from "./pages/PostDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import UserPostsPage from "./pages/UserPostsPage";
import PostEditPage from "./pages/EditPostPage";
import EditProfilePage from "./pages/EditProfilePage";
import ChatPage from "./components/ChatPage";  // Add this import


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

        <Route path="/createpost" element={<IsPrivate><CreatePostPage /></IsPrivate>} />
        <Route path="/createpost/:category" element={ <IsPrivate><CreatePostPage/></IsPrivate> } />

        <Route path="/posts/:postId" element={<IsPrivate><PostDetailPage /></IsPrivate>} />
        <Route path="/posts/:postId/edit" element={<IsPrivate><PostEditPage /></IsPrivate>} />
        <Route path="/posts/author/:authorId" element={<IsPrivate><UserPostsPage /></IsPrivate>} />

        <Route path="/profile/:userId" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route path="/profile/:userId/edit" element={<IsPrivate><EditProfilePage /></IsPrivate>} />  

        {/* The Chat Route */}
        <Route path="/chat/:chatId" element={<IsPrivate><ChatPage /></IsPrivate>} />

      </Routes>
      
    </div>
  );
}
 
export default App;