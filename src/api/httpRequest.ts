import axios, { AxiosResponse } from "axios";
import { store } from "./store/configureStore";

const authorizeAxios = axios.create({
    baseURL: 'https://swipedesi.ca/'
});

const headerAxios = axios.create({
    baseURL: 'https://swipedesi.ca/'
});

const responseBody = (response: AxiosResponse) => response.data ? response.data : response;

const handleErrorResponse = (error: any) => {
    if (error.code === "ERR_CANCELED") {
        return Promise.reject(error);
    }
    else if (error.response && error.response.status === 400) {
        alert(error.response.status)
        return error.response;
    }
    else if(error.response && error.response.status === 401){
        return error.response;
    }
    else if(error.response && error.response.status === 409){
        return error.response;
    }
    else {
        if (error.response && error.response.status === 401) {
            return error.response;
        } else {
            if (error.config && error.config.url) {
                return Promise.reject(error);
            } else {
                return Promise.reject(error);
            }
        }
    }
}

const handleResponse = (response: any) => {
    if (response.status === 200 ) {
        if (response.data.problem) {
            return response.data.problem.detail;
        } else if(response.data) {
            return response;
        }
        else{
            return "";
        }
        
    }
    else if(response.status === 404){
        return response;
    }
    else {
        return "";
    }
    // return response;
}

authorizeAxios.interceptors.response.use((response: any) => {
    return handleResponse(response);
}, (error) => {
    return handleErrorResponse(error);
});

authorizeAxios.interceptors.request.use((config: any) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = "*";
    return config;
});

headerAxios.interceptors.response.use((response: any) => {
    return handleResponse(response);
}, (error) => {
    return handleErrorResponse(error);
});

headerAxios.interceptors.request.use((config: any) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = "*";
    config.headers['Access-Control-Allow-Methods'] = "POST, GET, PUT, DELETE"
    config.headers['Access-Control-Allow-Headers'] = "Content-Type, X-Auth-Token, Origin, Authorization";
    return config;
});

export const authorizedRequests = {
    get: (url: string, params?: URLSearchParams) => authorizeAxios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => authorizeAxios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => authorizeAxios.put(url, body).then(responseBody),
    delete: (url: string) => authorizeAxios.delete(url).then(responseBody)
}

export const apiRequests = {
    get: (url: string, params?: URLSearchParams) => headerAxios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => headerAxios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => headerAxios.put(url, body).then(responseBody),
    delete: (url: string) => headerAxios.delete(url).then(responseBody)
}
