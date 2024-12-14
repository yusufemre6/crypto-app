import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeaderBar.css'; 

const HeaderBar = () => {
  return (
    <header className="header-bar">
      <nav className="nav-bar">
        <ul className="nav-links">
          <li>
            <Link to="/">Ana Sayfa</Link>
          </li>
          <li>
            <Link to="/login">Giriş Yap</Link>
          </li>
          <li>
            <Link to="/register">Kayıt Ol</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderBar;
