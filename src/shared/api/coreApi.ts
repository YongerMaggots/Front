import axios from 'axios';
type Token = string;

const getDomain = () => {
    return import.meta.env.VITE_DOMAIN || window.location.hostname;
};

export const PREFIX = getDomain();

export function createAxiosRequestInterceptor(getToken: () => Token) {
    axios.interceptors.request.use(function (config) {
        const token = getToken();
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
    });
}
