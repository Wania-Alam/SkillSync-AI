import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">✦</span>
        <span>SkillSync<span className="brand-accent">AI</span></span>
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/about" className="nav-link">
          About
        </Link>

        <Link to="/faq" className="nav-link">
          FAQ
        </Link>

        <Link to="/analyze" className="nav-button">
          Analyze Resume
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;