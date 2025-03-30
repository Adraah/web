import React, { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import SidebarComponent from './components/sidebarComponent';

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
      <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
        <div style={{ color: 'white', backgroundColor: 'black' }}>
          <h2>{isRegistered ? 'Verificar tu cuenta' : 'Registro de Usuario'}</h2>
          {!isRegistered ? (
            <form onSubmit={handleRegister}>
              <div>
                <label>Nombre de Usuario:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Rol:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                  <option value="moderator">Moderador</option>
                </select>
              </div>
              <button type="submit">Registrarse</button>
            </form>
          ) : (
            <form onSubmit={handleVerification}>
              <div>
                <label>Código de Verificación:</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Verificar Cuenta</button>
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
