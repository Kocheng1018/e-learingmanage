<template lang="pug">
#RecordQaCard
  Card.qaCard(v-for="(item, index) in questionData" :key="index" @click.native="getInfo(index)")
    p.title(slot="title") 第{{ index + 1 }}題 : {{ item.content }}
    .cardArea
      .rate
        i-circle(:percent="100" stroke-color="#5cb85c")
          span {{ percent[index].rate }}%
      .content
        p 解答
        p(v-if="item.answer.length === 0") 填空
        p(v-else-if="item.answer.length === 1") {{ item.answer[0] }}
        p(v-else v-for="ans in item.answer ") {{ ans }}
      .area
</template>
<style lang="scss" scoped>
.qaCard{
  margin: 10px auto;
  max-width: 500px;
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
// answer: []
// content: "問題3(填空)沒答案"
// correct: 0
// questionId: "5f856363522271575237cfe1"
// total: 0
    }
  },
  mounted(){
  },
  methods: {
    getInfo(index){
      this.$emit("onSelect", index)
    }
  }
}
</script>