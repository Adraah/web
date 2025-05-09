import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Time from './Time';
import { logout } from './utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    const accessToken = localStorage.getItem('accessToken');

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
    <div className="App" style={{ height: '100%', backgroundColor: '#EEEEEF' }}>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/about"
          element={isLoggedIn ? <About onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={isLoggedIn ? <Register onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
          <Route
          path="/time"
          element={isLoggedIn ? <Time onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;
