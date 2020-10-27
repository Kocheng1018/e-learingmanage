<template lang="pug">
#lessonlist
  .topicList
    .classInfoArea(
      v-if="classInfo.isOpen !== -1 && classInfo !== -1 && classInfo.isBind !== -1"
    )
      p 邀請碼：{{ classInfo.invite }}
      p 發佈狀態：{{ classInfo.isOpen === 1 ? '已發佈' : '尚未發佈' }}
      p 公開 / 私密：	{{ classInfo.isPublic === 1 ? '公開' : '私密' }}
      p line綁定狀態： {{ classInfo.isBind === 1 ? '已綁定' : '尚未綁定' }}
      .classInfoBtn
        Button(v-if="classInfo.isOpen === 0", type="info", @click="openClass") 發布課程
        Button(
          v-if="classInfo.isOpen === 0",
          type="info",
          @click="changePublic"
        ) 更改成{{ classInfo.isPublic === 1 ? '私密' : '公開' }}狀態
        Button(
          v-if="classInfo.isBind === 0",
          type="info",
          @click="modalStatus.lineConnect = true"
        ) 開始line綁定
    Card.addLesson.cardborder(@click.native="modalStatus.addsection = true") 新增章節
    Card.cardborder(
      v-for="(lesson, index) in lessons",
      :key="lesson.lessonID",
      @click.native="selectTopic(index)"
    ) 
      div {{ lesson.title }}
  .topicScreen
    div(v-if="lessons.length !== 0")
      .videoScreen
        LessonVideo(
          :sectionData="lessons[this.selectLesson]",
          @updSection="updSection"
        )
      .questionScreen
        .btnList
          Poptip(
            confirm,
            title="提醒",
            content="確定要刪除這個章節嗎？",
            ok-text="確定",
            cancel-text="取消",
            @on-ok="delSection",
            @on-cancel=""
          )
            Button.delLessonBtn(type="error") 刪除整個章節
          Button.addLessonBtn(
            type="primary",
            @click="openEditQa"
          ) 編輯問題
        .lessonQA
          QuestionListCard.item(
            v-for="(item, index) in lessons[selectLesson].question",
            :key="index",
            :question="item"
          )
    div(v-else)
      h1 點選右邊新增章節
  //-===========================================line 綁定modal==================================================================== 
  Modal(title="line綁定", v-model="modalStatus.lineConnect", width="50%")
    .stepFrank
      .steps
        Steps(:current="modalStatus.bindLineStep")
          Step(title="找尋你的Line群組")
          Step(title="請輸入綁定碼")
          Step(title="完成")
      .step1(v-if="modalStatus.bindLineStep === 0")
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
      .stepVercode(v-if="modalStatus.bindLineStep === 1")
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
      .stepImg(v-if="modalStatus.bindLineStep === 2")
        img(:src="Success")
    div(slot="footer")
      Button(type="default", @click="lineCancel") 取消
      |
      Button(type="primary", @click="lineGroupStep") 下一步
  //- ==========================================編輯問題modal============================================================= 
  Modal.verCenterModel(
    v-if="lessons.length !== 0",
    title="編輯問題",
    v-model="modalStatus.editQuestion",
    width="60%"
  )
    QuestionCard(ref="editQuestion")
    div(slot="footer")
      Button(type="default", @click="cancelDrawer") 取消
      |
      Button(type="primary", @click="updateQuestion") 更新
  //- ======================================新增章節內容Modal================================================================== 
  Modal.verCenterModel(
    title="新增章節",
    v-model="modalStatus.addsection",
    width="60%"
  )
    .stepFrank
      .setps
        Steps(:current="modalStatus.addstep")
          step(title="設定新的章節資料")
          step(title="新增問題")
          step(title="確認資料")
      .step1(v-show="this.modalStatus.addstep == 0")
        Form(ref="addsection", :model="addsectionData")
          FormItem(prop="title", label="章節標題")
            Input(v-model="addsectionData.title")
          FormItem(prop="type", label="請選擇內容：")
            RadioGroup(v-model="addsectionData.type")
              Radio(label="0") 文章
              Radio(label="1") 影片
            FormItem(
              v-if="addsectionData.type == 0",
              prop="url",
              label="請輸入內容"
            )
              Input(v-model="addsectionData.url", type="textarea")
            FormItem(v-else, prop="url", label="請輸入網址")
              Input(v-model="addsectionData.url")
            FormItem(prop="index", label="請選擇章節位置")
              RadioGroup(v-model="addsectionData.index")
                Radio(label="0") 第一個
                Radio(label="-1") 最後一個
                Radio(label="-2") 其他
              Select(
                v-if="addsectionData.index == -2",
                v-model="addsectionData.selectNum"
              )
                Option(
                  v-for="(item, index) in lessons",
                  :value="index",
                  :key="index"
                ) {{ item.lessonTitle }} 之後
      .step2(v-show="this.modalStatus.addstep == 1")
        QuestionCard(ref="addQestionCard")
      .step3(v-show="this.modalStatus.addstep == 2")
        .addSectionList
          h1 標題: {{ addsectionData.title }}
          h1(v-if="addsectionData.type === '0'") 網址: {{ addsectionData.url }}
          h1(v-else) 文章: {{ addsectionData.url }}
          h1(v-if="addsectionData.index === '0'") 位置: 第一個
          h1(v-else-if="addsectionData.index === '-1'") 位置: 最後一個
          h1(v-else) 位置: 在 {{ lessons[addsectionData.selectNum].title }}
        Divider
      .addQuestionList
        QuestionListCard(
          v-for="(item, index) in addsectionData.questionData",
          :key="index",
          :question="item"
        )
    div(slot="footer")
      Button(type="default", @click="previous") 上一步
      |
      Button(type="primary", @click="next") 下一步
</template>
<script>
import LessonVideo from "@/components/LessonMod/LessonVideo.vue";
import QuestionCard from "@/components/LessonMod/QuestionCard.vue";
import QuestionListCard from "@/components/LessonMod/QuestionListCard";
import Success from "@/assets/success.gif";
import LineQRcode from "@/assets/LineQRcode.png";
import {
  addSection,
  delSection,
  getSection,
  updQuestion,
  updSection,
  getInviteCode,
  getLineInfo,
  sendLineId,
  bindCheck,
  changePublic,
  changeOpen
} from "@/apis/course.js";

export default {
  name: "LessonList",
  components: {
    LessonVideo,
    QuestionCard,
    QuestionListCard
  },
  data() {
    return {
      LineQRcode,
      Success,
      modalStatus: {
        lineConnect: false,
        editQuestion: false,
        addsection: false,
        addstep: 0,
        bindLineStep: 0
      },
      addsectionData: {
        title: "",
        url: "",
        type: "0",
        index: "-1",
        selectNum: "0",
        questionData: []
      },
      classInfo: {
        invite: "",
        isOpen: -1,
        isPublic: -1,
        isBind: -1
      },
      line: {
        groupId: "",
        name: "",
        imgUrl: "",
        search: "",
        code: "",
        searchResult: []
      },
      firstOpen: "1",
      selectLesson: 0,
      lessons: []
      // lessons: [{
      // sectionId: "",
      // title: "請新增章節",
      // type: 0,
      // url: "",
      // question: []
      // }]
    };
  },
  mounted() {
    this.getSection();
    this.getClassInviteData();
  },
  methods: {
    openEditQa(){
      this.$refs.editQuestion.refInitData(this.lessons[this.selectLesson].question)
      this.modalStatus.editQuestion = true;
    },
    // ==========================LINE=======================
    resendCode() {
      sendLineId(this.line.groupId)
        .then(res => {
          if (res.data.status.code === 0) {
            this.messageControl(1, "發送成功 請查看line並輸入綁定碼");
          } else {
            this.messageControl(0, "line step2 error");
          }
        })
        .catch(err => {
          this.messageControl(0, `err: ${err}`);
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
          this.messageControl(0, "backend Line step1 error");
        }
      });
    },
    groupSelect(group) {
      this.line.groupId = group.groupId;
      this.line.name = group.groupName;
      this.line.imgUrl = group.pictureUrl;
    },
    lineGroupStep() {
      switch (this.modalStatus.bindLineStep) {
        case 0:
          if (this.line.groupId !== "") {
            sendLineId(this.line.groupId)
              .then(res => {
                if (res.data.status.code === 0) {
                  this.modalStatus.bindLineStep += 1;
                } else {
                  this.messageControl(0, "line step2 error");
                }
              })
              .catch(err => {
                this.messageControl(0, `err: ${err}`);
              });
          } else {
            this.messageControl(0, "請選擇群組");
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
                  this.modalStatus.bindLineStep += 1;
                } else {
                  this.messageControl(0, `code: ${res.data.status.code}`);
                }
              })
              .catch(err => {
                this.messageControl(0, `err: ${err}`);
              });
          } else {
            this.messageControl(
              0,
              "認證碼錯誤！！ 請重新輸入或重發驗證碼後輸入"
            );
          }
          break;
        case 2:
          this.lineCancel();
          break;
      }
    },
    lineCancel() {
      this.modalStatus.lineConnect = false;
      this.modalStatus.bindLineStep = 0;
      this.line = {
        groupId: "",
        name: "",
        imgUrl: "",
        search: "",
        code: "",
        searchResult: []
      };
    },
    // ==========================課程狀態====================
    getClassInviteData() {
      getInviteCode(this.$route.params.classID)
        .then(res => {
          if (res.data.status.code === 0) {
            this.classInfo.invite = res.data.data.invite;
            this.classInfo.isOpen = res.data.data.isOpen;
            this.classInfo.isBind = res.data.data.isBind;
            this.classInfo.isPublic = res.data.data.isPublic;
          } else {
            throw "code not 0";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePublic() {
      changePublic(this.$route.params.classID, {
        isPublic: this.classInfo.isPublic === 1 ? 0 : 1
      })
        .then(res => {
          if (res.data.status.code === 0) {
            this.messageControl(1, "更改成功");
          } else {
            this.messageControl(0, `更改失敗 ${res.data.status.code}`);
          }
          this.getClassInviteData();
        })
        .catch(err => {
          console.log(err);
          this.messageControl(0, `error: ${err}`);
        });
    },
    openClass() {
      this.$Modal.confirm({
        title: "確定要發佈課程？",
        content:
          "<p>發佈後將不能刪除章節及問題</p><p>且發佈後不能取消發佈</p><p>確定要發佈嗎？？</p>",
        cancelText: "取消",
        okText: "確定",
        onCancel: () => {},
        onOk: () => {
          console.log("???");
          changeOpen(this.$route.params.classID)
            .then(res => {
              if (res.data.status.code !== 0) {
                this.messageControl(0, "發佈失敗 請稍後再試");
              }
            })
            .catch(err => {
              this.messageControl(0, `error: ${err}`);
              console.log(err);
            });
          this.getClassInviteData();
        }
      });
    },
    // =====================================================
    updateQuestion() {
      let a = this.$refs.editQuestion.refReturnData();
      const updQA = {
        sectionId: this.lessons[this.selectLesson].sectionId,
        classId: this.$route.params.classID,
        question: a
      };
      console.log(updQA);
      updQA.question.forEach(item => {
        item.type = parseInt(item.type);
      });
      updQuestion(updQA)
        .then(req => {
          if (req.data.status.code === 0) {
            this.modalStatus.editQuestion = false;
            this.$Message.success("編輯成功");
          } else {
            this.$Message.error("編輯失敗 請稍後再試");
          }
        })
        .catch(err => {
          this.messageControl(0, `err: ${err}`);
        });
    },
    getSection() {
      let classId = this.$route.params.classID;
      getSection(classId).then(req => {
        if (req.data.status.code === 0) {
          if (req.data.data.length === 0) {
            this.messageControl(0, "目前沒有章節資料喔");
          }
          this.lessons = req.data.data;
        }
      });
    },
    delSection() {
      delSection(this.lessons[this.selectLesson].sectionId).then(req => {
        if (req.data.status.code === 0) {
          this.messageControl(1, "刪除成功");
          this.selectLesson = 0;
          this.getSection();
        }
      });
    },
    addSection() {
      let classId = this.$route.params.classID;
      let sectionIndex = () => {
        if (this.addsectionData.index === "-2") {
          return parseInt(this.addsectionData.selectNum) + 1;
        } else {
          return parseInt(this.addsectionData.index);
        }
      };
      let addSectionParam = {
        classId: classId,
        isSort: sectionIndex(),
        section: {
          title: this.addsectionData.title,
          url: this.addsectionData.url,
          type: parseInt(this.addsectionData.type)
        },
        question: this.addsectionData.questionData
      };
      addSectionParam.question.forEach(el => {
        el.type = parseInt(el.type);
      });
      addSection(addSectionParam)
        .then(() => {
          this.messageControl(1, "儲存成功");
          this.modalStatus.addsection = false;
          this.addsectionData.title = "";
          this.addsectionData.url = "";
          this.modalStatus.addstep = 0;
          this.getSection();
        })
        .catch(() => {
          this.messageControl(0, "儲存失敗");
        });
    },
    messageControl(type, msg) {
      switch (type) {
        case 0:
          this.$Message.error(msg);
          // this.messageControl(0, msg)
          break;
        case 1:
          this.$Message.success(msg);
          // this.messageControl(1, msg)
          break;
      }
    },
    updSection(sectionData) {
      updSection(sectionData.sectionId, {
        title: sectionData.title,
        url: sectionData.url,
        type: sectionData.type
      })
        .then(req => {
          if (req.data.status.code === 0) {
            this.messageControl(1, "儲存成功");
          }
        })
        .catch(err => {
          this.messageControl(0, `err: ${err}`);
        });
    },
    selectTopic(index) {
      this.selectLesson = index;
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
        this.messageControl(0, "問題最多五個");
      }
    },
    next() {
      switch (this.modalStatus.addstep) {
        case 0:
          this.modalStatus.addstep += 1;
          break;
        case 1:
          this.addsectionData.questionData = Object.assign([], this.$refs.addQestionCard.refReturnData());
          this.addsectionData.questionData.length < 1
            ? this.$Message.error("最少需要一個問題")
            : this.modalStatus.addstep += 1;
          break;
        case 2:
          this.addSection();
          break;
      }
    },
    previous() {
      switch (this.modalStatus.addstep) {
        case 0:
          this.modalStatus.addstep = 0;
          break;
        case 1:
          this.modalStatus.addstep -= 1;
          break;
        case 2:
          this.$refs.addQestionCard.refInitData(this.addsectionData.questionData);
          this.modalStatus.addstep -= 1;
          break;
      }
    },
    saveEditQA(questionData) {
      const rule = el => el.sort === questionData.sort;
      this.lessons[this.selectLesson].question.splice(
        this.lessons[this.selectLesson].question.findIndex(rule),
        1,
        questionData
      );
      this.messageControl(1, "儲存成功");
    },
    deleteEditQA(sort) {
      const rule = el => el.sort === sort;
      this.lessons[this.selectLesson].question.splice(
        this.lessons[this.selectLesson].question.findIndex(rule),
        1
      );
      this.messageControl(1, "刪除成功");
    },
    saveQA(questionData) {
      const rule = el => el.sort === questionData.sort;
      this.addsectionData.questionData.splice(
        this.addsectionData.questionData.findIndex(rule),
        1,
        questionData
      );
      this.messageControl(1, "儲存成功");
    },
    cancelDrawer() {
      this.modalStatus.editQuestion = false;
      this.getSection();
    }
  }
};
</script>
<style lang="scss" scoped>
#lessonlist {
  padding: 0px 5% 0px 5%;
  display: flex;
  justify-content: center;
}

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
.topicList {
  flex: 2;
  max-width: 250px;
  margin: 10px;
  .classInfoArea {
    .classInfoBtn {
      button {
        margin: 2px;
      }
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    text-align: left;
  }
  .cardborder {
    width: 180px;
    margin: 10px;
  }
  .addLesson {
    color: white;
    background-color: brown;
  }
}
.topicScreen {
  display: flex;
  flex-direction: column;
  flex: 7;
  .videoScreen {
    flex: 7;
  }
  .questionScreen {
    .btnList {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .addLessonBtn {
        max-width: 200px;
        min-width: 100px;
      }
      .delLessonBtn {
        max-width: 200px;
        min-width: 100px;
      }
    }
    .lessonQA {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
    }
    display: flex;
    margin: 0px 10%;
    flex-direction: column;
    flex: 3;
  }
}
.verCenterModel {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
