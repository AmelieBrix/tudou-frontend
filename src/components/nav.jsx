import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return (
      <nav className="Navbar">
        <ul>
          <li><NavLink to={'/'} className={({ isActive }) => isActive ? "selected" : ""}>Home</NavLink></li>
          <li><NavLink to={'about'} className={({ isActive }) => isActive ? "selected" : ""}>About</NavLink> </li>
          <li><NavLink to={'projects'} className={({ isActive }) => isActive ? "selected" : ""}>Projects</NavLink></li>
        </ul>
      </nav>
    );
  }
   
  export default Navbar;