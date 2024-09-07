import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import styles from "../../styles/layout/Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFilm, faHeart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ title = "Movie App" }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <h1>{title}</h1>
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <FontAwesomeIcon icon={faFilm} /> <span>Movies</span>
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <FontAwesomeIcon icon={faHeart} /> <span>Favorites</span>
          </Link>
        </li>
        <li>
          <button>
            <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
          </button>
        </li>
        <li>
          <button>
            <FontAwesomeIcon icon={faUser} /> <span>Profile</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
