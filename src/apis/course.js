// import { construct } from 'core-js/fn/reflect';
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
export const getTeacherClass = () => req("get", `/class/teacher`);

/** 更改class資料
 * @param { String } topic
 * @param { String } imgUrl
 * @param { String } intro 
 */
export const updClass = (classId, param) => req("put", `/class/info/${classId}`, param);

/** 取得課程邀請碼 開放狀態 開啟狀態 綁定狀態
 * 
 * @param { String } Id
 * @returns { String } invite
 */
export const getInviteCode = id => req("get", `/class/status/${ id }`);

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

/** 更新section資訊
 * @param { String } title
 * @param { String } url
 * @param { Number } type
 */
export const updSection = (sectionId, param) => req("put", `/section/${sectionId}`, param)

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

//===============更改課程狀態==============
export const changePublic = (id, params) => req("put", `/class/change/${id}`, params);

export const changeOpen = id => req("put", `/class/open/${id}`);


// ===========================紀錄==============================
// 取的課程所有課程
export const getSectionList = classId => req("get", `/section/${classId}/titlelist`);

// 取得章節所有問題
export const getAllQuestion = sectionId => req("get", `/question/all/${sectionId}`);

// 取得所有學生在問題中的考試答案
export const getUserRecords = qid => req("get", `/record/username/${qid}`);

// ===========================Line綁定===================================

// step1 抓取LINE 查詢的群組資料
export const getLineInfo = name => req("get", `/group/search/${name}`);

// step2 給LINE id 做綁定確認
export const sendLineId = id => req("post", `/group/bind/${id}`);

// step3 輸入確認碼確認綁定
/**
 * @param { String } code
 * @param { String } classId  
 */
export const bindCheck = params => req("post", `/group/checkbind`, params);

