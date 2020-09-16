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

// 取得section資料
export const getSection = classId => req("get", `/section/${classId}`);

/** 新增class
 * @param { string } topic 主題名稱
 * @param { string } imgUrl base64
 * @param { string } intro 簡介
 * @param { number } type (0/1 公開/非公開)
 * @param { string } teacherId 教師Id  
 */
export const addClass = param => req("post", `/class`, param);

/** 新增section
 * @param { object } section 
 *    @param { String } title
 *    @param { String } url
 *    @param { Number } type
 * @param { ObjectArray } question
 *    @param { String } content
 *    @param { Array } answer
 *    @param { Array } select
 *    @param { Number } type
 *    @param { Number } sort
 * @param { number } isSort
 * @param { String } classId
 */
export const addSection = param => req("post", `/section`, param);

/** 更新question
 * @param { String } sectionId
 * @param { String } classId
 * @param { ObjectArray } question
 *    @param { String } content
 *    @param { Array } answer
 *    @param { Array } select
 *    @param { Number } type
 *    @param { Number } sort
 */
export const updQuestion = param => req("put", `/question`, param);

// 刪除class 
export const delClass = classId => req("delete", `/class/${classId}`);

// 刪除section
export const delSection = sectionId => req("delete", `/section/${sectionId}`);