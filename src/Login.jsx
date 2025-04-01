import React, { useState } from 'react';
import { login } from './utils/auth';
import './Login.css';
import Logo from './assets/Logo.png';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(onLogin, username, password);
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="input-group">
          <input type="text" placeholder="USUARIO" className="input-field"     
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input type="password" placeholder="CONTRASEÑA" className="input-field" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
        </div>
        <div className="input-group">
        <button onClick={handleLogin} className="login-button">Iniciar sesión</button>
        </div>
        <p className="version">v 1.0</p>
      </div>
    </div>
  );
}

export default Login;
