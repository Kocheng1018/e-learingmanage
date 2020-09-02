<template lang="pug">
#QuestionListCard
  h1(v-if="question.type === '0'") 問題類型: 單選
  h1(v-else-if="question.type === '1'") 問題類型: 多選
  h1(v-else) 問題類型: 填空
  h1 問題內容 {{ question.content }}
  h2 選項:  
  .selects
    .select(v-for="(item, index) in question.select") {{ index + 1 }}. {{ item }}
  h2 答案:
  .answers 
    .answer(v-for="(item, index) in question.answer") {{ item }} 
</template>
<script>
export default {
	name: "QuestionListCard",
	props: {
		question: {
			type: Object,
			default: () => {
				return {
					content: "範例",
					answer: ["問題一"],
					select: ["問題一", "問題二", "問題三", "問題四"],
					type: "0",
					sort: 0,
				};
			}
		},
	}
};
</script>
<style lang="scss" scoped>
#QuestionListCard{
  border-style: solid;
  border-color: rgb(200, 220, 220);
  border-radius: 2rem;
  padding: 25px 20px;
  margin: 10px 0px;
  background-color: azure;
  display: flex;
  flex-direction: column;
  .selects{
    display: flex;
    flex-direction: row;
    .select{
      font-size: 16px;
      margin: 2px;
      padding: 3px;
      border-style: solid;
      border-radius: 10px;
      border-color: orange;
    }
  }
  .answers{
    .answer{
      font-size: 16px;
      margin: 2px;
      padding: 3px;
      color: red;
    }
  }
}
</style>
