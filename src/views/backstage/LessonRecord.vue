<template lang="pug">
#LessonRecord
  h1 請選擇你的課程章節
  .searchArea
    Select(v-model="selected" size="large")
      Option(v-for="item in selects" :key="item.sectionId" :value="item.sectionId") {{ item.title }}    
    Button(v-show="!status.qaCard" @click.native="closeQuestion" type="default" icon="md-arrow-round-back" size="large") 返回題目列表
  .sectionArea
    RecordQA(v-if="status.qaCard" :questionData="questionCardData" @onSelect="openQuestion")
    RecordStu(v-else :questionId="selectedQuestion")
</template>
<style lang="scss" scoped>
#LessonRecord {
  display: flex;
  align-items: center;
  flex-direction: column;
  .searchArea {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    width: 40%;
    Button {
      margin: 5px 10px;
    }
  }
  .sectionArea {
    width: 60%;
  }
}
</style>
<script>
import RecordQA from "@/components/LessonMod/Record/RecordQaCard";
import RecordStu from "@/components/LessonMod/Record/RecordStudentList"
import { getSectionList, getAllQuestion } from "@/apis/course";
export default {
  name: "LessonRecord",
  components: {
    RecordQA,
    RecordStu
  },
  data(){
    return {
      status: {
        qaCard: true
      },
      classId: "",
      selected: "",
      selectedQuestion: "",
      selects: [
        {
          sectionId: 404,
          title: "目前沒有資料喔"
        }
      ],
      questionCardData: [],
      studentAnsList: []
    }
  },
  watch: {
    async selected(){
      await this.ApiGetAllQuestion();
    }
  },
  mounted(){
    this.classId = this.$route.params.classID;
    this.ApiGetSelectData();
  },
  methods: {
    ApiGetSelectData(){
      getSectionList(this.classId)
        .then(res => {
          if (res.data.status.code === 0){
            this.selects = [];
            this.selects = res.data.data.data;
          }
        })
    },
    ApiGetAllQuestion(){
      getAllQuestion(this.selected)
        .then(res => {
          if (res.data.status.code === 0){
            this.questionCardData = [];
            this.questionCardData = res.data.data;
          }
          this.status.qaCard = true;
        })
    },
    openQuestion(index){
      this.status.qaCard = false;
      this.selectedQuestion = this.questionCardData[index].questionId;
    },
    closeQuestion(){
      this.status.qaCard = true;
      this.selectedQuestion = "";
    }
  }
}
</script>