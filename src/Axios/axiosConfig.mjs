import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
};

const refreshToken = async () => {
    try {
        await api.post(`${process.env.REACT_APP_DEV_URL}auth/refresh`);
    } catch (err) {
        console.error('Refresh token request failed', err);
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        // window.location.href = '/login';
        return Promise.reject(err);
    }
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (!isRefreshing) {
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    const newAccessToken = await refreshToken();
                    isRefreshing = false;
                    onRefreshed(newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (err) {
                    isRefreshing = false;
                    return Promise.reject(err);
                }
            }

            const retryOriginalRequest = new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(api(originalRequest));
                });
            });

            return retryOriginalRequest;
        }

        return Promise.reject(error);
    }
);

export default api;
