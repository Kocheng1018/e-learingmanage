<template lang="pug">
#RecordQaCard
  Card.qaCard(v-for="(item, index) in questionData" :key="index" @click.native="getInfo(index)")
    p.title(slot="title") {{ item.content }}
    .cardArea
      .rate
        i-circle(:percent="percentCount(item.correct, item.total)" stroke-color="#5cb85c")
          span 答對率：{{ percentCount(item.correct, item.total) }}%
      .content
        p(v-show="item.answer.length === 0") 問答題
        p(v-show="item.answer.length === 1") 單選題
        p(v-show="item.answer.length >= 2") 多選題
        p.line
        p 作答人數 {{ item.total }} 人
        p 答對人數 {{ item.correct }} 人
      .area
</template>
<style lang="scss" scoped>
.qaCard{
  margin: 10px auto;
  max-width: 450px;
  min-width: 300px;
  .cardArea {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .content {
      font-size: 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 120px;
      .line {
        border: 1px;
        border-style: solid;
        margin: 5px;
        width: 100%;
      }
    }
  }
}
</style>
<script>
export default {
  name: "RecordQaCard",
  props: {
    questionData: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      percent: 100
// answer: []
// content: "問題3(填空)沒答案"

// questionId: "5f856363522271575237cfe1"
// total: 0
    }
  },
  methods: {
    getInfo(index){
      this.$emit("onSelect", index)
    },
    changeAns(question){
      return Number(question) + 1;
    },
    percentCount(correct, total) {
      const present = (correct / total) * 100;
      if (isNaN(present)) {
        return 0;
      }
      return parseInt(present);
    }
  }
}
</script>