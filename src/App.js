import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { logout } from './utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    const accessToken = localStorage.getItem('accessToken');
    console.log("🚀 ~ useEffect ~ accessToken:", accessToken);

    if (idToken && accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    logout();
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home onLogout={handleLogout} />}
        />
        <Route path="/about" element={<About onLogout={handleLogout}/>} />
        <Route path="/register" element={<Register onLogout={handleLogout}/>} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;
