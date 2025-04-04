import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Sidebar = ({ onLogout }) => {
  return (
      <div style={sidebarStyle}>
        <img src={Logo} alt="Logo" style={{ width: '100%', marginBottom: '20px' }} />
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="/" style={linkStyle}>Resumen</Link>
          </li>
          <li>
            <Link to="/about" style={linkStyle}>Reportes</Link>
          </li>
          <li>
            <Link to="/register" style={linkStyle}>Registro</Link>
          </li>
          <li>
            <Link to="/register" style={linkStyle}>Tiempos</Link>
          </li>
          <li>
            <button onClick={onLogout} style={buttonStyle}>Cerrar sesion</button>
          </li>
        </ul>
      </div>
  );
};

const sidebarStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '200px',
  height: '100%',
  backgroundColor: '#525660',
  color: 'white',
  padding: '20px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  padding: '10px 0',
};

const buttonStyle = {
  color: 'white',
  backgroundColor: '#132246',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  width: '100%',
  marginTop: '20px',
};

export default Sidebar;
