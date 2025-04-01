import axios from 'axios';
import { logout } from '../auth';

const makeApiCall = async (method, url, data = null, params = null) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    if (error.response.status !== 401 && error.response.status !== 403) {
        logout();
        throw error;
      } else {
        throw error;
      }
  }
};

export default makeApiCall;