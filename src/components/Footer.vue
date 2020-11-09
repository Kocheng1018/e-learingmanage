<template lang="pug">
Footer.layout-footer-center
  .left 
    ul.teaminformation
      li.teacher 指導教授 黃天騏
      li.copyright(href="http://htc.nutc.edu.tw/") © 2020 國立臺中科技大學資訊管理系
        a.link(href="http://htc.nutc.edu.tw/", color="yellow") 天將麒軍
      li 聯絡我們 0988-818350
      li ________________________
  .right
    ul.team
      ul.emaillist
        .email devil871018@gmail.com
        .email kltony9898@gmail.com
        .email d871212603@gmail.com
        .email a685288@gmail.com
      ul.team
        li.member 蕭雲洋
        li.member 曾子銘
        li.member 陳承祐
        li.member 劉佩穎
</template>
<script>
export default {

};
</script>
<style lang='scss' scoped>
.layout-footer-center {
  color: #f0f5ff;
  height: 200px;
  text-align: center;
  padding: 20px 200px 20px 200px;
  background-color: #003a8c;
}
.left {
  padding-top: 30px;
  float: left;
  height: 140px;
  width: 50%;
  .link {
    color: yellow;
  }
}
.right {
  border-left: 2px rgb(243, 253, 147) solid;
  padding-top: 30px;
  padding-left: 50px;
  float: right;
  height: 160px;
  width: 50%;
}
.teaminformation {
  text-align: left;
  list-style-type: none;
}
.team {
  list-style-type: none;
  float: left;
  font-size: 20px;
  font-weight: bolder;
  text-align: right;
  height: 100%;
  .member {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
  }
  .emaillist {
    float: right;
    text-align: left;
    font-size: 14px;
    margin-left: 20px;
  }
}
.title {
  text-align: left;
}
.membericon {
  float: left;
  border: 10px;
}
@media screen and (max-width: 990px) {
  .right {
    display: none;
  }
  .layout-footer-center {
    color: #f0f5ff;
    height: 20%;
    text-align: center;
    padding: 20px 40px 20px 40px;
    background-color: #003a8c;
  }
}
</style>