<template lang="pug">
Modal(title="line綁定", v-model="visible", width="50%" @on-visible-change="onChange")
  .stepFrank
    .steps
      Steps(:current="bindLineStep")
        Step(title="找尋你的Line群組")
        Step(title="請輸入綁定碼")
        Step(title="完成")
    .step1(v-if="bindLineStep === 0")
      Form
        h3 請將機器人加入到您的群組（QRcode）
        img(:src="LineQRcode", width="200px")
        FormItem(label="請輸入你的群組名稱")
          Input(
            placeholder="群組名稱",
            v-model="line.search",
            @on-change="searchLineGroup"
          )
        Divider {{ line.searchResult.length !== 0 ? '群組列表' : '查無LINE群組' }}
        List(size="large")
          ListItem(v-for="(item, index) in line.searchResult", :key="index")
            ListItemMeta(:avatar="item.pictureUrl", :title="item.groupName")
            template(slot="action")
              Button(type="success", @click="groupSelect(item)") 選擇
        div(v-if="line.imgUrl !== ''")
          Divider 已選擇的群組
          h3 群組： {{ line.name }}
          img(:src="line.imgUrl", width="20%")
    .stepVercode(v-if="bindLineStep === 1")
      h3 機器人已經將綁定碼傳到群組 請在下面輸入綁定碼
      .lineInfo
        .info
          Avatar(shape="square", :src="line.imgUrl", size="large")
          p {{ line.name }}
        Input(
          placeholder="請輸入驗證碼",
          style="max-width: 240px",
          v-model="line.code"
        )
      Button.resendVer(type="error", @click="resendCode") 重發綁定碼
    .stepImg(v-if="bindLineStep === 2")
      img(:src="Success")
  div(slot="footer")
    Button(type="default", @click="lineCancel") 取消
    |
    Button(type="primary", @click="lineGroupStep") {{ nextText }}
</template>
<script>
import LineQRcode from "@/assets/LineQRcode.png";
import Success from "@/assets/success.gif";
import { sendLineId, bindCheck, getLineInfo } from "@/apis/course.js"
export default {
  name: "BindLineModal",
  props: {
    value: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    value(val){
      this.visible = val;
    }
  },
  computed: {
    nextText(){
      return this.bindLineStep === 2 ? "完成" : "下一步"
    }
  },
  data() {
    return {
      visible: this.value,
      LineQRcode,
      Success,
      bindLineStep: 0,
      line: {
        groupId: "",
        name: "",
        imgUrl: "",
        search: "",
        code: "",
        searchResult: []
      },
    }
  },
  methods: {
    onChange(val){
      this.visible = val;
      this.$emit("input", val);
    },
    lineGroupStep() {
      switch (this.bindLineStep) {
        case 0:
          if (this.line.groupId !== "") {
            sendLineId(this.line.groupId)
              .then(res => {
                if (res.data.status.code === 0) {
                  this.bindLineStep += 1;
                } else {
                  this.$Message.error("line step2 error");
                }
              })
              .catch(err => {
                this.$Message.error(`err: ${err}`);
              });
          } else {
            this.$Message.error("請選擇群組");
          }
          break;
        case 1:
          if (this.line.code !== "" && this.line.code.length === 6) {
            bindCheck({
              code: this.line.code,
              classId: this.$route.params.classID
            })
              .then(res => {
                if (res.data.status.code === 0) {
                  this.bindLineStep += 1;
                }else if(res.data.status.code === 21106){
                  this.$Message.error(`認證碼錯誤！請重新確認您的驗證碼！`);
                  this.line.code = "";
                }else {
                  this.$Message.error(`code: ${res.data.status.code}`);
                }
              })
              .catch(err => {
                this.$Message.error(`err: ${err}`);
              });
          } else {
            this.$Message.error("認證碼錯誤！！ 請重新輸入或重發驗證碼後輸入");
            this.line.code = "";
          }
          break;
        case 2:
          this.lineCancel();
          this.$emit("reload");
          break;
      }
    },
    async lineCancel() {
      await this.onChange(false);
      this.bindLineStep = 0;
      this.line = {
        groupId: "",
        name: "",
        imgUrl: "",
        search: "",
        code: "",
        searchResult: []
      };
    },
    resendCode() {
      sendLineId(this.line.groupId)
        .then(res => {
          if (res.data.status.code === 0) {
            this.$Message.success("發送成功 請查看line並輸入綁定碼");
          } else {
            this.$Message.error("line step2 error");
          }
        })
        .catch(err => {
          this.$Message.error(`err: ${err}`);
        });
    },
    searchLineGroup() {
      this.line.searchResult = [];
      this.line.groupId = "";
      this.line.name = "";
      this.line.imgUrl = "";
      if (this.line.search === "") return;
      getLineInfo(this.line.search).then(res => {
        if (res.data.status.code === 0) {
          this.line.searchResult = res.data.data;
        } else {
          this.$Message.error(`backend Line step1 error`)
        }
      });
    },
    groupSelect(group) {
      this.line.groupId = group.groupId;
      this.line.name = group.groupName;
      this.line.imgUrl = group.pictureUrl;
    },
  }
}
</script>
<style lang="scss" scoped>
.stepFrank {
  margin: 20px;
  .step2 {
    margin-top: 10px;
  }
  .step3 {
    display: flex;
    flex-direction: column;
    .addSectionList {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex: 1;
    }
    .addQuestionList {
      flex: 2;
    }
  }
  .stepVercode {
    margin: auto;
    margin-top: 10px;
    .lineInfo {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .Info {
        margin: 5px;
      }
    }
    .resendVer {
      margin: 5px;
    }
  }
  .stepImg {
    margin: auto;
  }
}
</style>
