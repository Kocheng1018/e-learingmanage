import axios from 'axios';
// import router from '../router/index.js';
import { tip } from './utils.js'

const errorHandel = (status, msg) => {
    switch(status) {
        case 400:
            tip(msg);
            break;

        case 404:
            tip(msg);
            break;
        
        default:
            tip(msg);
            break;
    }
}
let instance = axios.create({
    baseURL: "/api",
	headers: { 
        "Access-Control-Allow-Origin": "*",
        "Authorization": localStorage.getItem("accessToken"),
		"Access-Control-Allow-Headers": "*",
		"Access-Control-Allow-Credentials": 'true'
	}
})

instance.interceptors.request.use((config) => {
//	let accessToken = localStorage.getItem("accessToken");
//    if (accessToken == null){
//        accessToken = "";
//    }
//    config.headers = { 
//        "Access-Control-Allow-Origin": "*",
//        "Authorization": accessToken,
//		"Access-Control-Allow-Headers": "Content-Type, X-Access-Token",
//		"Access-Control-Allow-Credentials": 'true'
//      };
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { response } = error;
    if (response) {
        errorHandel(response.status, response.data.error);
        return Promise.reject(error);
    } else {
        if (!window.navigator.onLine) {
            tip('網路問題 請重新連線');
        } else {
            return Promise.reject(error);
        }
    }
});

export default function (method, url, data=null) {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, JSON.stringify(data));
    }else if (method == 'get'){
        return instance.get(url, {params: data});
    }else if (method == 'delete') {
        return instance.delete(url, {params: data});
    }else if (method == 'put') {
        return instance.put(url, data);
    }else {
        console.error('未知method' + method);
        return false;
    }
}
