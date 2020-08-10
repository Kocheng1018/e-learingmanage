import req from './https.js';

export const postData = params => req('post', 'https://jsonplaceholder.typicode.com/posts', params);

export const getDatta = () => req('get', 'https://jsonplaceholder.typicode.com/posts');

/** 註冊
 * @param { string } account
 * @param { string } password
 * @param { string } department
 * @param { string } name
 *  
 */
export const signUp = params => req('post', '/adduser', params);

/**  登入
 * @param { string } account
 * @param { string } password
 * 
 */ 
export const signIn = params => req('post', '', params);

/** 取得老師class資料
 * @param { string } id teacherid 
 * 
 */
export const getTeacherClass = (tid, params) => req("get", `/class/${ tid }/teacher`, params);

/** 新增class
 * @param { string } topic 主題名稱
 * @param { string } imgUrl base64
 * @param { string } intro 簡介
 * @param { int } type (0/1 公開/非公開)
 * @param { string } teacherId  
 */
export const addClass = param => req("post", `/class`, param);