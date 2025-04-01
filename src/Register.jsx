import React, { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import SidebarComponent from './components/sidebarComponent';
import './Register.css';

const poolData = {
  UserPoolId: 'us-east-2_SolgJb1su',
  ClientId: '3dk36tnec1ue5qiiiqnql7fdjf',
};

const userPool = new CognitoUserPool(poolData);

const Register = ({ onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();

    const attributeList = [
      new CognitoUserAttribute({
        Name: 'custom:role',
        Value: role,
      }),
      new CognitoUserAttribute({
        Name: 'name',
        Value: username,
      }),
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        setSuccess('');
      } else {
        setSuccess('Registro exitoso. Revisa tu correo electrónico para verificar tu cuenta.');
        setIsRegistered(true);
        setError('');
      }
    });
  };

  const handleVerification = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        setSuccess('');
      } else {
        setSuccess('Cuenta verificada con éxito. Ahora puedes iniciar sesión.');
        setError('');
      }
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent onLogout={onLogout} />
      <div style={{ marginLeft: '220px', flex: 1, backgroundColor: '#EEEEEF', height: '100vh', justifyItems: 'center', alignContent: 'center' }}>
        <div style={{ color: 'black', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '20px', width: '350px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Registro de usuarios</span>
          {!isRegistered ? (
            <form style={{ marginTop: '20px' }} onSubmit={handleRegister}>
              <div className="input-group">
                <input type="text" placeholder="NOMBRE" className="input-field-register"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input type="email" placeholder="EMAIL" className="input-field-register"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input type="password" placeholder="CONTRASEÑA" className="input-field-register"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <div className="input-group">
                <select id="role" className='input-field-register' value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '96%' }}>
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                  <option value="moderator">Moderador</option>
                </select>
              </div>
              <button onClick={handleRegister} className="login-button">Registrarse</button>
            </form>
          ) : (
            <form onSubmit={handleVerification}>
              <div className="input-group" style={{ marginTop: '20px' }}>
                <input type="text" placeholder="CODIGO" className="input-field-register"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required />
              </div>
              <button className="login-button" type="submit">Verificar Cuenta</button>
            </form>
          )}

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
