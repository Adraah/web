import axios from 'axios';
import { logout } from '../auth';

const makeApiCall = async (method, url, data = null, params = null) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    logout();
    throw new Error('Access token not found, login out.');
  }

  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status !== 401 && error.response.status !== 403) {
        throw error;
      } else {
        logout();
        throw error;
      }
  }
};

export default makeApiCall;