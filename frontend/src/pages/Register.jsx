import React, { useState } from 'react';
import HeaderBar from "../components/Header";
import axios from 'axios';
import "../styles/global.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // API'ye post isteği gönder
      const response = await axios.post('http://localhost:5242/api/auth/register', {
        username,
        password
      });

      // Başarılı olursa
      setSuccess('Kayıt başarılı!');
    } catch (error) {
      // Hata oluşursa
      setError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      setSuccess('');
    }
    
  };

  return (
    <div>
      <HeaderBar></HeaderBar>  
      <h2>Kayıt Ol</h2>
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
        <button type="submit">Kayıt Ol</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;