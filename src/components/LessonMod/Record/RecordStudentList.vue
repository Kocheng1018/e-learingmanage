<template lang="pug">
#RecordStudentList
  .gobackBtn
    Button(@click.native="goback" type="text" icon="md-arrow-round-back" size="large") 返回
  p(v-if="records.length <= 0") 目前尚無學生作答
  List(v-else size="large")
    ListItem.studentItem(v-for="(item, index) in records") 
      Icon(v-if="item.records.isTrue === 1" type="md-checkmark" color="green" size="30")
      Icon(v-else type="md-close" color="red" size="30")
      .name {{ item.userName }}
      .ans {{ changeAns(item.records.selects) }}
      //- .ans dfhgjhgfrrtyjfhgfdtyjhyfgfdfghgfdrghbvcfgvcfgvcfgvgfdfhgfdfghgfdfghjhgfdrfghjhytrrtyhgfdertgvcdghvcdvb
      .timestamp
        .date {{ changeDate(item.examAt) }}
        .time {{ changeTime(item.examAt) }}
</template>
<style lang="scss" scoped>
.studentItem {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  .name {

  }
  .ans{
    max-width: 300px;
    word-wrap: break-word;
  }
  .stamptime{
    .date{

   }
    .time{
      font-size: 20px;
    }
  }
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
      getUserRecords("5f856332522271575237cfd9")
        .then(res => {
          if (res.data.status.code === 0){
            this.records = [];
            this.records = res.data.data;
          }
        })
    },
    changeDate(timestamp){
      let date = new Date();
      date.setTime(timestamp);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    changeTime(time){
      let date = new Date();
      date.setTime(time);
      return `${date.getHours()}:${date.getMinutes()}`;
    },
    changeAns(answer){
      return answer.join();
    },
    goback(){
    this.$emit("goBack");
    }
  }
}
</script>