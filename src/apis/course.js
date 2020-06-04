import req from './https.js';

export const postData = params => req('post', 'https://jsonplaceholder.typicode.com/posts', params);

export const getDatta = () => req('get', 'https://jsonplaceholder.typicode.com/posts');