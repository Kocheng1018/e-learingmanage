<template lang="pug">
Modal(v-model="visible" title="課程提醒" @on-visible-change="onChange" @on-cancel="cancel" @on-ok="sendMsg")
  .lineCard
    .title
      p 有什麼話可以藉由機器人在群組跟大家說喔～
    .setting
      Input(type="textarea" v-model="content" placeholder="想說的話" :autosize="{minRows: 4, maxRows: 10}")
</template>
<script>
import { pushMsg } from "@/apis/course.js"
export default {
  name: "LineMsgModal",
  props: {
    value: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    value(val) {
      this.visible = val;
    }
  },
  data() {
    return {
      visible: this.value,
      classId: this.$route.params.classID,
      content: ""
    }
  },
  methods: {
    onChange(val){
      this.visible = val;
      this.$emit("input", val);
      this.content = "";
    },
    async sendMsg(){
      let param = {
        to: this.classId,
        messages: []
      }
      await param.messages.push({type: "text", text: this.content});
      let res = await pushMsg(param);
      if (res.data.status.code === 0){
        this.$Message.success("發送成功！");
        this.onChange(false);
      }else{
        this.$Message.error("失敗 錯誤碼: " + res.data.status.code);
        this.onChange(false);
      }
    },
    cancel(){
      this.content = "";
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
    margin: 5px auto;
  }
  .setting{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>