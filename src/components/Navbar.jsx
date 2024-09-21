import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";  // Import AuthContext
import LanguageSwitcher from "./LanguageSwitcher";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);  // Access user and logOutUser from context

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/Gallery">
            <button>Gallery</button>
          </Link>
          <Link to="/recommendations">
            <button>Recommendation</button>
          </Link>
          <Link to="/searchandfind">
            <button>Search and Find</button>
          </Link>

          <LanguageSwitcher />  {/* Place language switcher buttons */}
          {/* Update Logout button to call logOutUser */}
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      ) : (
        <>
          <Link to="/signup"><button>Sign Up</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;