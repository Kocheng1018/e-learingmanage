<template lang="pug">
Modal(v-model="visible" title="課程提醒" @on-visible-change="onChange" @on-ok="setTime")
  .lineCard
    .title
      p 你可以設定通知 提醒同學做完這個章節的內容
    .setting
      RadioGroup(v-model="remindData.isNow")
        Radio(label="1")
          span 立即發送
        Radio(label="0")
          span 設定時間發送
    .datePicker
      DatePicker(v-if="remindData.isNow === '0'" @on-change="datachange" type="datetime" :options="todayAfter" format="yyyy-MM-dd HH:mm" placeholder="請選擇日期與時間")
</template>
<script>
import { remind } from "@/apis/course.js"
export default {
  name: "LineRemind",
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    secIndex: {
      type: Number,
      default: () => -1
    }
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    secIndex(val) {
      this.sectionIndex = val;
    }
  },
  data() {
    return {
      visible: this.value,
      sectionIndex: this.secIndex,
      classId: this.$route.params.classID,
      remindData: {
        time: "0",
        isNow: "0"
      },
      todayAfter: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },

    }
  },
  methods: {
    onChange(val){
      this.visible = val;
      this.$emit("input", val);
    },
    datachange(date){
      let timestamp = Date.parse(date);
      this.remindData.time = timestamp/1000;
    },
    async setTime(){
      let index = this.sectionIndex + 1;
      if(this.remindData.isNow == "1"){
        this.remindData.time = 0;
      }
      let params = {
        time: parseInt(this.remindData.time),
        isNow: parseInt(this.remindData.isNow)
      }
      let res = await remind(this.classId, index, params);
      if(res.data.status.code === 0){
        this.$Message.success("設定成功！");
        this.onChange(false);
      }else if(res.data.status.code === 9489){
        this.$Message.error("目前沒有學生參加此課程課堂");
      }else{
        this.$Message.error("設定失敗！" + res.data.status.code);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.lineCard{
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title{
    flex: 1;
    align-items: center;
  }
  .setting{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .datePicker{
    flex: 2;
  }
}
</style>