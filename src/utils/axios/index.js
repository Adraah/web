import axios from "axios";
import { CognitoUser, CognitoRefreshToken, CognitoUserPool } from 'amazon-cognito-identity-js';
import { logout } from "../auth/index";

const poolData = {
    UserPoolId: 'us-east-2_SolgJb1su',
    ClientId: '3dk36tnec1ue5qiiiqnql7fdjf',
};
const userPool = new CognitoUserPool(poolData);

const HTTP_STATUS = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
}

const axiosInstance = axios.create({
    baseURL: "https://9ffoua37l6.execute-api.us-east-2.amazonaws.com",
    timeout: 5000
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token === null) {
        return logout();
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;
            const access_token = await refreshAccessToken();

            if (access_token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                axios.defaults.headers.common['Content-Type'] = 'application/json';
                axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
                axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET';
                return axiosInstance(originalRequest);
            }
        }

        if (error.response?.status === HTTP_STATUS.FORBIDDEN) {
            return Promise.reject("403 Forbidden");
        }

        return Promise.reject(error.response?.data.error || error);
    });

const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const email = localStorage.getItem('email');
        const cognitoRefreshToken = new CognitoRefreshToken({ RefreshToken: refreshToken });

        const user = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        const newToken = await new Promise((resolve) => {
            user.refreshSession(cognitoRefreshToken, async (error, session) => {
                if (error) {
                    resolve();
                } else {
                    const newRefreshToken = session.getRefreshToken().getToken();
                    localStorage.setItem('refreshToken', newRefreshToken);

                    const updatedToken = session.getIdToken().getJwtToken();
                    localStorage.setItem('accessToken', updatedToken);
                    resolve(updatedToken);
                }
            });
        });

        return newToken;
    } catch (error) {
        logout();
    }
};


export default axiosInstance;