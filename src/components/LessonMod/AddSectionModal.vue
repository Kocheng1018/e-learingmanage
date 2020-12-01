<template lang="pug">
Modal.verCenterModel(
    title="新增章節",
    v-model="visible",
    width="60%"
    @on-visible-change="onChange"
    :mask-closable="false"
  )
    .stepFrank
      .setps
        Steps(:current="addstep")
          step(title="設定新的章節資料")
          step(title="新增問題")
          step(title="確認資料")
      .step1(v-show="addstep == 0")
        Form(ref="addsection", :rules="rules" :model="addsectionData")
          FormItem(prop="title", label="章節標題")
            Input(v-model="addsectionData.title" maxlength=20)
          FormItem.radioList(prop="type", label="請選擇內容：")
            RadioGroup(v-model="addsectionData.type")
              Radio(label="0") 文章
              Radio(label="1") 影片
          FormItem.validSpace(
            v-if="addsectionData.type == 0",
            prop="url",
            label="請輸入內容"
          )
            Input(v-model="addsectionData.url", type="textarea")
          FormItem.validSpace(v-else, prop="url", label="請輸入網址")
            Input(v-model="addsectionData.url")
          FormItem.radioList(prop="index", label="請選擇章節位置")
            div(v-if="isOpen === 1")
              h4 因為課程已經發佈，所以只能增加在最後一個喔！
            div(v-else)
              RadioGroup(v-model="addsectionData.index")
                Radio(label="0") 第一個
                Radio(label="-1") 最後一個
                Radio(label="-2") 其他
              Select(
                v-if="addsectionData.index == -2",
                v-model="addsectionData.selectNum"
              )
                Option(
                  v-for="(item, index) in lessonList",
                  :value="index",
                  :key="index"
                ) {{ item.title }} 之後
      .step2(v-show="addstep == 1")
        QuestionCard(ref="addQestionCard")
      .step3(v-show="addstep == 2")
        .addSectionList
          h1 標題: {{ addsectionData.title }}
          .showUrl(v-if="addsectionData.type === '1'")
            h1 網址:
            a(:href="addsectionData.url" target="_blank") {{ addsectionData.url }}
          h1(v-else) 文章: {{ addsectionData.url }}
          h1(v-if="addsectionData.index === '0'") 位置: 第一個
          h1(v-else-if="addsectionData.index === '-1'") 位置: 最後一個
          h1(v-else) 位置: 在 {{ lessonList[addsectionData.selectNum].title }}
        Divider
        .addQuestionList
          QuestionListCard(
            v-for="(item, index) in addsectionData.questionData",
            :key="index",
            :question="item"
          )
    div(slot="footer")
      Button(v-if="addstep !== 0" type="default", @click="previous") 上一步
      |
      Button(type="primary", @click="next") 下一步
</template>
<script>
import QuestionCard from "@/components/LessonMod/QuestionCard.vue";
import QuestionListCard from "@/components/LessonMod/QuestionListCard"
import { addSection } from "@/apis/course.js";
export default {
 name: "AddSectionModal",
 components: {
   QuestionCard,
   QuestionListCard
 },
 props:{
   value: {
     type: Boolean,
     default: () => false
   },
   lessonList: {
     type: Array,
     default: () => []
   },
   isOpen: {
     type: Number,
     default: () => -1
   }
 },
 watch: {
   value(val){
     this.visible = val;
   },
   isOpen(val){
    if(val === 1){
      this.addsectionData.index = "-1"
    }
   }
 },
 data() {
  return{
    visible: this.value,   
    addstep: 0,
    addsectionData: {
      title: "",
      url: "",
      type: "0",
      index: "-1",
      selectNum: "0",
      questionData: []
    },
    rules: {
      title: [{ required: true, message: "請輸入章節名稱", tigger: "blur" }],
      type: [{ required: true, message: "請選擇類型", tigger: "blur" }],
      url: [{ required: true, message: "需要輸入內容或網址", tigger: "blur" }],
      index: [{ required: true, message: "請選擇章節位置", tigger: "blur" }]
   }
  }
 },
 methods: {
  onChange(val){
    this.visible = val;
    this.$emit("input", val);
    this.addsectionData = {};
    this.addsectionData = {
      title: "",
      url: "",
      type: "0",
      index: "-1",
      selectNum: "0",
      questionData: []
    };
    this.addstep = 0
  },
  async next() {
      switch (this.addstep) {
        case 0:
          await this.$refs.addsection.validate(valid => {
            if(!valid){
              return;
            }else{
              if (this.addsectionData.type === "1") { 
                const check = this.setUrl(this.addsectionData.url);
                if(check === false) {
                  return;
                }else {
                  this.addstep += 1;
                }
              }else{
                this.addstep += 1;
              }
            }
          })
          break;
        case 1:
          this.addsectionData.questionData = Object.assign([], this.$refs.addQestionCard.refReturnData());
          this.addsectionData.questionData.length < 1
            ? this.$Message.error("最少需要一個問題")
            : this.addstep += 1;
          break;
        case 2:
          this.addSections();
          break;
      }
    },
    previous() {
      switch (this.addstep) {
        case 0:
          this.addstep = 0;
          break;
        case 1:
          this.addstep -= 1;
          break;
        case 2:
          this.$refs.addQestionCard.refInitData(this.addsectionData.questionData);
          this.addstep -= 1;
          break;
      }
    },
    addSections() {
      let uri = "";
      let classId = this.$route.params.classID;
      let sectionIndex = () => {
        if (this.addsectionData.index === "-2") {
          return parseInt(this.addsectionData.selectNum) + 1;
        } else {
          return parseInt(this.addsectionData.index);
        }
      };
      if(this.addsectionData.type === "1"){
        uri = this.setUrl(this.addsectionData.url);
      }else{
        uri = this.addsectionData.url;
      }
      let addSectionParam = {
        classId: classId,
        isSort: sectionIndex(),
        section: {
          title: this.addsectionData.title,
          url: uri,
          type: parseInt(this.addsectionData.type)
        },
        question: this.addsectionData.questionData
      };
      addSectionParam.question.forEach(el => {
        el.type = parseInt(el.type);
      });
      this.ApiAddSection(addSectionParam)
      // addSection(addSectionParam)
      //   .then(() => {
      //     this.$Message.success("儲存成功");
      //     this.addsectionData.title = "";
      //     this.addsectionData.url = "";
      //     this.addstep = 0;
      //     this.addsectionData.questionData = [];
      //     this.$emit("reload");
      //   })
      //   .catch(() => {
      //     this.$Message.error("儲存失敗");
      //   });
      //   this.onChange(false);
    },
    async ApiAddSection(param) {
      let res = await addSection(param);
      if (res.data.status.code === 0) {
        this.$Message.success("儲存成功");
        this.addsectionData.title = "";
        this.addsectionData.url = "";
        this.addstep = 0;
        this.addsectionData.questionData = [];
        this.$emit("reload");
        this.onChange(false);
        this.$refs.addQestionCard.refReset();
      }else{
        this.$Message.error("儲存失敗");
      }
    },
    addNewQuestion() {
      let sort = this.addsectionData.questionData.length;
      if (sort < 5) {
        let timeStamp = new Date().getTime();
        this.addsectionData.questionData.push({
          content: "",
          answer: [],
          select: [],
          type: "0",
          sort: timeStamp
        });
      } else {
        this.$Message.error("問題最多五個");
      }
    },
    saveQA(questionData) {
      const rule = el => el.sort === questionData.sort;
      this.addsectionData.questionData.splice(
        this.addsectionData.questionData.findIndex(rule),
        1,
        questionData
      );
      this.$Message.success("儲存成功");
    },
    setUrl(videoCode) {
			let video = videoCode.trim();
			let start = video.indexOf("v=");
			let last = video.indexOf("&");
			if (start === -1) {
        this.$Message["error"]({
          background: true,
          content: "找不到影片！請確認網址是否正確"
        });
      } else {
        if (last === -1) {
          video = video.slice(start + 2);
        } else {
          video = video.slice(start + 2, last);
        }
        return video;
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>

.stepFrank {
  margin: 20px;
  .step1 {
    .validSpace {
      margin: 20px auto;
    }
    .radioList {
      text-align: left;
    }
  }
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
      .showUrl{
        font-size: 20px;
      }
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
.verCenterModel {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>