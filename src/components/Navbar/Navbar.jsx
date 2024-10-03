import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";  
import LanguageSwitcher from "../LanguageSwitcher";
import "./Navbar.style.css"

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-menu') && !event.target.closest('.hamburger-menu')) {
        setIsMenuOpen(false); 
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727817376/Logo.png" alt="Tudou Logo" className="icon-picture" />
        </Link>
      </div>
      {isLoggedIn ? (
        <>
          <div className="navbar-center">
            <Link to="/Gallery">
              <button className="nav-button">Gallery</button>
            </Link>
            <Link to="/recommendations">
              <button className="nav-button">Recommendation</button>
            </Link>
            <Link to="/searchandfind">
              <button className="nav-button">Search and Find</button>
            </Link>
          </div>

          <div className="navbar-right">
            {/* Hamburger menu in mobile view */}
            <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="hamburger-icon">&#9776;</span>
            </div>

            {/* Dropdown menu for mobile view */}
            {isMenuOpen && (
              <div className="dropdown-menu">
                {/* LanguageSwitcher included in dropdown */}
                <div >
                  <LanguageSwitcher closeMenu={() => setIsMenuOpen(false)} />
                </div>
                <div className="navbar-center-mobile">
                  <Link to="/Gallery">
                    <button className="nav-button">Gallery</button> </Link>
                  <Link to="/recommendations">
                    <button className="nav-button">Recommendation</button></Link>
                  <Link to="/searchandfind">
                    <button className="nav-button">Search and Find</button></Link>
                </div>
                <div className="navbar-profile-logout" >
                  <Link to={`/profile/${user._id}`}>
                    <button className="nav-button" onClick={() => setIsMenuOpen(false)}>My Profile</button>
                  </Link>
                  <button className="nav-button" onClick={() => { logOutUser(); setIsMenuOpen(false); }}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="navbar-right">
          <Link to="/signup"><button className="nav-button">Sign Up</button></Link>
          <Link to="/login"><button className="nav-button">Login</button></Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;