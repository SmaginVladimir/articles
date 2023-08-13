import axios from "axios";

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const INSTANCE = axios.create();

INSTANCE.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            return INSTANCE.post(API_BASE_URL + '/auth/refresh', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then(res => {
                localStorage.setItem('access_token', res.data.access_token);
                error.config.headers.authorization = `Bearer ${res.data.access_token}`;
                return INSTANCE.request(error.config);
            })
        }
    }
);