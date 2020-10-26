<template lang="pug">
#QA
  .editQuestionArea
    h1 問題數：{{ allQuestions.length }}/5
    Button(type="primary", icon="md-add", @click="addQuestion") 新增問題
  .questionList
    .qaInfo(v-for="(item, index) in allQuestions", :key="index")
      .delBtn
        Icon(type="md-close", size="24", @click="deleteQA(index)")
      Form(@submit="", onSubmit="return false;")
        FormItem(prop="type", label="問題類型")
          RadioGroup(v-model="item.type")
            Radio(label="0") 單選
            Radio(label="1") 多選
            Radio(label="2") 填空
        FormItem(prop="content", label="請輸入問題")
          Input(v-model="item.content", type="textarea")
        .oneAns(v-if="item.type == `0`")
          FormItem(prop="select", label="輸入問題選項：")
            .insertText
              Input(
                v-model="ansText[index]",
                @on-enter="addChoose(index)",
                placeholder="Enter something...",
                clearable
              ) 
              Button.addText(type="default", @click="addChoose(index)") 新增
          FormItem(prop="radio", label="選項（已選擇的是正確答案！）")
          RadioGroup(v-model="item.answer[0]")
            Radio.select(
              v-for="(item, i) in item.select",
              :key="i",
              :label="item",
              border
            ) {{ item }}
              Button.delStyle(
                size="small",
                type="text",
                icon="md-close",
                shape="circle",
                alt="刪除",
                @click="removeSelect(i, index)"
              )
        .multAns(v-if="item.type == '1'")
          FormItem(prop="select", label="輸入問題選項：")
            .insertText
              Input(
                v-model="ansText[index]",
                @on-enter="addChoose(index)",
                placeholder='Enter something...',
                clearable
              )
              Button.addText(type="default", @click="addChoose(index)") 新增
          FormItem(prop="checkbox", label="選項（已選擇的是正確答案！）")
          CheckboxGroup(v-model="item.answer")
            Checkbox.select(
              v-for="(item, i) in item.select",
              :key="i",
              :label="item",
              border
            ) {{ item }}
              Button.delStyle(
                size="small",
                type="text",
                icon="md-close",
                shape="circle",
                @click="removeSelect(i, index)"
              )
</template>
<script>
// [
//   {
//     questionId: "",
//     classId: "",
//     sectionId: "",
//     content: "",
//     answer: ["", "", ""],
//     select: ["", "", ""],
//     type: "1",
//     sort: 
//   }
// ];
export default {
  name: `QuestionCard`,
  props: {
    questions: {
      type: Array,
      default: () => {
        let a = [
          {
            questionId: "",
            classId: "",
            sectionId: "",
            content: "",
            answer: ["", "", ""],
            select: ["", "", ""],
            type: "1",
            sort: "1"
          }
        ];
        return a
      }
    }
  },
  data() {
    return {
      allQuestions: this.questions,
      ansText: [null, null, null, null, null],
    };
  },
  // watch:{
  //   questions: () => {
  //     console.log("?")
  //     this.allQuestions.forEach(el => {
  //       el.type = el.type.toString();
  //       el.answer.forEach((item) => {
  //         let num = parseInt(item);
  //         item = el.select[num];
  //       })
  //     });
  //   }
  // },
  mounted() {
    this.allQuestions.forEach(el => {
      el.type = el.type.toString();
      el.answer.forEach((item) => {
        let num = parseInt(item);
        item = el.select[num];
      })
    });
  },
  methods: {
    refInitData(d){
      this.allQuestions = d;
      this.allQuestions.forEach(el => {
        el.type = el.type.toString();
        el.answer.forEach((item) => {
          let num = parseInt(item);
          item = el.select[num];
        })
      });
    },
    // 回傳資料
    refReturnData() {
      // 處理答案換算index
      this.allQuestions.forEach( qa => {
        let ans = [];
        for(let i = 0; i < qa.select.length; i++) {
          for(let j = 0; j < qa.answer.length; j++){
            if (qa.answer[j] === qa.select[i]){
              // qa.answer[j] = i.toString();
              ans.push(i.toString());
              break;
            }
          }
        }
        // qa.answer = ans;
        qa.answer = Object.assign([], ans);
      })
      return this.allQuestions;
    },
    //新增選項tag
    addChoose(index) {
      if (this.isEmpty(this.ansText[index])) {
        this.$Message.error("請輸入選項文字");
        return;
      }
      const findTag = this.allQuestions[index].select.find(tag => tag === this.ansText[index]);
      if (findTag) {
        this.$Message.error("請勿輸入重複選項");
        this.ansText[index] = null;
        return;
      }
      this.allQuestions[index].select.push(this.ansText[index]);
      this.ansText[index] = null;
    },
    addQuestion() {
      let sort = this.allQuestions.length;
      if (sort < 5) {
        let timeStamp = new Date().getTime();
        this.allQuestions.push({
          content: "",
          answer: [],
          select: [],
          type: "0",
          sort: timeStamp
        });
      } else {
        this.$Message.error("最多五個問題");
      }
    },
    removeSelect(selIndex, qaIndex) {
      this.allQuestions[qaIndex].select.splice(selIndex, 1);
    },
    deleteQA(index) {
      const rule = el => el.sort === index;
      this.allQuestions.splice(this.allQuestions.findIndex(rule), 1);
      this.$Message.success("刪除成功");
    },
    isEmpty(value) {
      if (value == null) return true;
      if (value == "")
      if (typeof value === "string") return !value.length;
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
.qaInfo {
  border-style: solid;
  border-color: rgb(200, 220, 220);
  border-radius: 2rem;
  padding: 25px 20px;
  margin: 10px 0px;
  background-color: azure;
  .delBtn {
    text-align: right;
  }
  .select {
    background-color: white;
    margin-bottom: 10px;
    min-height: 30px;
    padding-right: 0px;
    .delStyle {
      color: red;
    }
  }
  .insertText {
    display: flex;
    flex-direction: row;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    button {
      margin: 0px 5px;
    }
  }
  .addText {
    margin-left: 5px;
  }
}
.editQuestionArea {
  display: flex;
  justify-content: space-between;
}
</style>