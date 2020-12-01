<template lang="pug">
#QuestionListCard
  Form
    FormItem(label="問題類型: ")
      p.content(v-if="question.type == 0") 單選
      p.content(v-else-if="question.type == 1") 多選
      p.content(v-else) 問答
    FormItem(label="問題內容: ")
      p.content {{ question.content }}
    FormItem(label="選項: " v-if="question.type != 2")
      .selects
        .select(v-for="(item, index) in question.select" :key="index") {{ item }}
    FormItem(label="答案: " v-if="question.type != 2")
      .answers
        .answer(v-for="(item, index) in question.answer" :key="index") {{ recover(index) }}
</template>
<script>
export default {
	name: "QuestionListCard",
	props: {
		question: {
			type: Object,
			default: () => {
				return {
					content: "", // 範例
					answer: [],	// "1"
					select: [], // "問題一", "問題二", "問題三", "問題四"
					type: 0,
					sort: 0,
				};
			},
		},
	},
	data() {
		return {};
	},
	methods: {
		recover(i) {
			let a = parseInt(this.question.answer[i]);
			return this.question.select[a];
		},
	},
};
</script>
<style lang="scss" scoped>
.content {
	text-align: left;
	font-size: 18px;
}
#QuestionListCard {
	width: 100%;
	border-style: solid;
	border-color: rgb(200, 220, 220);
	border-radius: 2rem;
	padding: 20px 20px;
	margin: 10px;
	background-color: azure;
	display: flex;
	flex-direction: column;
	.selects {
		display: flex;
		flex-wrap: wrap;
		.select {
			min-width: 80px;
			font-size: 16px;
			margin: 2px 5px;
			padding: 3px 10px;
			border-style: solid;
			border-radius: 10px;
			border-color: gray;
			background-color: white;
		}
	}
	.answers {
		display: flex;
		flex-wrap: wrap;
		.answer {
			min-width: 80px;
			font-size: 16px;
			margin: 2px 5px;
			padding: 3px 10px;
			border-style: solid;
			border-radius: 10px;
			border-color: green;
			background-color: white;
		}
	}
}
</style>
