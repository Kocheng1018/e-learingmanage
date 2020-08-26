import req from './https.js';

/** 註冊
 * @param { string } account
 * @param { string } password
 * @param { string } department
 * @param { string } name
 */
export const signUp = params => req('post', '/management/signup', params);

/**  登入
 * @param { string } account
 * @param { string } password
 */ 
export const signIn = params => req('post', '/management/login', params);

/** 取得老師class資料
 * @returns { ObjectArray } [{
 * @returns { String } classId
 * @returns { String } topic
 * @returns { String(base64) } imgUrl
 * @returns { number } type
 * @returns { number } isOpen 0/1 關閉/開啟
 * @returns { String } intro
 * @returns { number } createAt
 * @returns { number } SectionNum
 * @returns { number } type (0/1 公開/非公開)
 * }]
 */
export const getTeacherClass = (id) => req("get", `/class/${id}/teacher`);

/** 新增class
 * @param { string } topic 主題名稱
 * @param { string } imgUrl base64
 * @param { string } intro 簡介
 * @param { number } type (0/1 公開/非公開)
 * @param { string } teacherId 教師Id  
 */
export const addClass = param => req("post", `/class`, param);
