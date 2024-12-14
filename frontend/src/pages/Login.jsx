import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from "../components/Header";
import "../styles/global.css";
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5242/api/auth/login', {
        username,
        password
      });

      console.log(response.data);

      // JWT token'ı localStorage'a kaydet
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setSuccess('Giriş başarılı!');
        setError('');
        navigate('/'); // Girişten sonra ana sayfaya yönlendirme
      }
    } catch (error) {
      setError('Giriş yapılırken bir hata oluştu.');
      setSuccess('');
    }
  };

  return (
    <div>
      <HeaderBar></HeaderBar>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;