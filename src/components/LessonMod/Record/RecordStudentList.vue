<template lang="pug">
#RecordStudentList
  .title 題目 : {{ questionInfo.content }}
  Divider
  p(v-if="records.length <= 0") 目前尚無學生作答
  table.tableStyle(v-else)
    tr
      th 正確/錯誤
      th 姓名
      th 他的答案
      th 時間
    tr(v-for="(item, index) in records" :key="index" :class="backg(item.records.isTrue)")
      th 
        Icon(v-if="item.records.isTrue === 1" type="md-checkmark" color="green" size="30")
        Icon(v-else type="md-close" color="red" size="30")
      th 
        p {{ item.userName }}
      th 
        p {{ changeAns(item.records.selects) }}
        //- p(v-else) {{ item.records.selects[0] }}??
      th 
        p {{ changeDate(item.examAt) }}
        p {{ changeTime(item.examAt) }}
</template>
<style lang="scss" scoped>
.tableStyle{
  width: 100%;
  font-size: 20px;
  border: 0px;
  .green{
    background-color: hsl(120, 80%, 90%);
  }
  .red{
    background-color: hsl(0, 100%, 90%)
  }
}
.title{
  font-size: 20px;
  color: black;
}
</style>
<script>
import { getUserRecords, getQuestionInfo } from "@/apis/course";
export default {
  name: "RecordStudentList",
  props:{
    questionId: {
      type: String,
      default: ""
    }
  },
  data(){
    return {
      questionInfo: {},
      records: []
    }
  },

  async mounted(){
    if(this.questionId !== ""){
      this.ApiGetUserRecords();
      await this.ApiGetQuestionInfo();
    }
  },
  methods: {
    backg(isTrue) {
      if(isTrue == 1){
        return {
          green: true
        }
      }else{
        return {
          red: true
        }
      }
    },
    ApiGetUserRecords(){
      getUserRecords(this.questionId)
        .then(res => {
          if (res.data.status.code === 0){
            this.records = [];
            this.records = res.data.data;
          }
        })
    },
    async ApiGetQuestionInfo(){
      let res = await getQuestionInfo(this.questionId);
      if(res.data.status.code === 0){
        this.questionInfo = res.data.data;
      }
    },
    changeDate(timestamp){
      let date = new Date(timestamp * 1000);
      let d = date.getDate();
      let m = (date.getMonth() + 1);
      let y = date.getFullYear();
      if (String(m).length < 2)
        m = `0${m}`;
      if (String(d).length < 2)
        d = `0${d}`;
      return [y, m, d].join(" / ");
    },
    changeTime(time){
      let date = new Date();
      date.setTime(time * 1000);
      let h = date.getHours();
      let m = date.getMinutes();
      if(String(h).length < 2){
          h = "0" + h;
        }
      if(String(m).length < 2){
          m = "0" + m
        }
      return `${h}:${m}`;
    },
    changeAns(answer){
      if(this.questionInfo.type === 2) {
        return answer[0];
      }
      let re = [];
      answer.forEach(e => {
        let num = parseInt(e) 
        let a = this.questionInfo.select[num];
        re.push(a);
      });
      return re.join();
    },
  }
}
</script>