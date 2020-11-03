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
        Button(v-if="classInfo.isOpen === 0", type="info", @click="openClass") 發佈課程
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
    Button.cardborder(type="success" icon="md-add" @click="modalStatus.addsection = true") 新增章節
    Card.cardborder(
      dis-hover=true
      v-for="(lesson, index) in lessons",
      :key="lesson.lessonID",
      @click.native="selectTopic(index)"
      :class="{ selected : selectLesson === index }"
    ) 
      div {{ lesson.title }}
  .topicScreen
    div(v-if="lessons.length !== 0")
      h1 {{ classTopic }}
      Divider
      .videoScreen
        LessonVideo(
          :sectionData="lessons[this.selectLesson]",
          :lineIsBind="classInfo.isBind",
          :isOpen="classInfo.isOpen"
          @updSection="updSection" @delSection="delSection" :index="selectLesson"
        )
      .questionScreen
        .btnList
          Button(
            icon="md-create"
            @click="openEditQa"
          ) 編輯問題
        .lessonQA
          QuestionListCard.item(
            v-for="(item, index) in lessons[selectLesson].question",
            :key="index",
            :question="item"
          )
    div(v-else)
      h1 點選左邊新增章節按鈕
  //-===========================================line 綁定modal==================================================================== 
  BindLineModal(v-model="modalStatus.lineConnect" @reload="getClassInviteData")
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
  AddSectionModal(v-model="modalStatus.addsection" :lessonList="lessons" @reload="getSection")
</template>
<script>
import LessonVideo from "@/components/LessonMod/LessonVideo.vue";
import QuestionCard from "@/components/LessonMod/QuestionCard.vue";
import QuestionListCard from "@/components/LessonMod/QuestionListCard";
import AddSectionModal from "@/components/LessonMod/AddSectionModal";
import BindLineModal from "@/components/LessonMod/Line/BindLineModal";
import {
  delSection,
  getSection,
  updQuestion,
  updSection,
  getInviteCode,
  changePublic,
  changeOpen
} from "@/apis/course.js";

export default {
  name: "LessonList",
  components: {
    LessonVideo,
    QuestionCard,
    QuestionListCard,
    AddSectionModal,
    BindLineModal
  },
  data() {
    return {
      modalStatus: {
        lineConnect: false,
        editQuestion: false,
        addsection: false,
      },
      classInfo: {
        invite: "",
        isOpen: -1,
        isPublic: -1,
        isBind: -1
      },
      classTopic: "",
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
          this.lessons = req.data.data.sections;
          this.classTopic = req.data.data.topic
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
    messageControl(type, msg) {
      switch (type) {
        case 0:
          this.$Message.error(msg);
          break;
        case 1:
          this.$Message.success(msg);
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
.selected{
  border: 2px;
  border-style: solid;
  border-color: black;
  background-color: #2db7f5;
  color: black;
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
    width: 200px;
    margin: 10px auto;
    min-height: 55px;
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
      width: 100%;
      text-align: right;  
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
