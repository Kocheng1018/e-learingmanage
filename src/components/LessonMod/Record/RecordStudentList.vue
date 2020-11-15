<template lang="pug">
#RecordStudentList
  .gobackBtn
    Button(@click.native="goback" type="text" icon="md-arrow-round-back" size="large") 返回
  p(v-if="records.length <= 0") 目前尚無學生作答
  table.tableStyle(v-else)
    tr
      th 正確/錯誤
      th 姓名
      th 他的答案
      th 時間
    tr(v-for="(item, index) in records" :key="index")
      th 
        Icon(v-if="item.records.isTrue === 1" type="md-checkmark" color="green" size="30")
        Icon(v-else type="md-close" color="red" size="30")
      th 
        p {{ item.userName }}
      th 
        p {{ changeAns(item.records.selects) }}
      th 
        p {{ changeDate(item.examAt) }}
        p {{ changeTime(item.examAt) }}
</template>
<style lang="scss" scoped>
.tableStyle{
  width: 100%;
  font-size: 20px;
}
.gobackBtn {
  display: flex;
  justify-content: flex-start;
}
</style>
<script>
import { getUserRecords } from "@/apis/course";
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
      records: []
    }
  },
  mounted(){
    if(this.questionId !== ""){
      this.ApiGetUserRecords();
    }
  },
  methods: {
    ApiGetUserRecords(){
      getUserRecords(this.questionId)
        .then(res => {
          if (res.data.status.code === 0){
            this.records = [];
            this.records = res.data.data;
          }
        })
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
      let a = answer.map(x => parseInt(x) + 1);
      return a.join();
    },
    goback(){
    this.$emit("goBack");
    }
  }
}
</script>