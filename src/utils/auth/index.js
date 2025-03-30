import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-2_SolgJb1su',
    ClientId: '3dk36tnec1ue5qiiiqnql7fdjf',
  };
const userPool = new CognitoUserPool(poolData);

export const login = (onLogin, username, password) => {
    const user = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
  
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });
  
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          const accessToken = result.getAccessToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();
  
          console.log("🚀 ~ idToken:", result.getIdToken())
          console.log("🚀 ~ accessToken:", accessToken)
          
          localStorage.setItem('idToken', idToken);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('email', username);
  
          onLogin();
        },
        onFailure: (err) => {
          console.error('Login error', err);
        },
      });
};
export const logout = () => {
    localStorage.clear();
    window.location.href = '/web/#/login';
    return null;
};