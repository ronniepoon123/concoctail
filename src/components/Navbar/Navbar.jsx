import { Link } from "react-router-dom";

import "./Navbar.css";

import SearchBar from "../Searchbar/Searchbar";

function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">
        <Link
          to="/"
          className="brand-link"
        >
          <h2>Concoctail</h2>
        </Link>

        <span>|</span>

        <p>
          Cocktails made simple.
        </p>
      </div>

      <div className="navbar-search">
        <SearchBar />
      </div>

      <nav className="navbar-links">
        <Link to="/shopping-list">
          🛒 Shopping List
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;