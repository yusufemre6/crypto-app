import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
      <nav>
        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
          <li>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Ana Sayfa</Link>
          </li>
          <li>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Giriş Yap</Link>
          </li>
          <li>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Kayıt Ol</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
