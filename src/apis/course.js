import req from './https.js';

export const postData = params => req('post', 'https://jsonplaceholder.typicode.com/posts', params);

export const getDatta = () => req('get', 'https://jsonplaceholder.typicode.com/posts');

export const signUp = params => req('post', '/adduser', params);
export const signIn = params => req('post', '', params);
export const testt = param =>req('post', '/user/signup', param);