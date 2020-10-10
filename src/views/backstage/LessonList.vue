<template lang="pug">
#lessonlist
	.topicList
		.classSetBtn
			p 邀請碼：{{ classInvite }}
			p 發佈狀態：
			p 公開 / 私密：
			p line綁定狀態 
			Button(type="info" @click="modalStatus.lineConnect = true") 開始line綁定
		Card(@click.native="modalStatus.addsection = true").addLesson.cardborder 新增章節
		Card.cardborder( v-for='(lesson, index) in lessons' :key='lesson.lessonID' @click.native='selectTopic(index)') 
			div {{ lesson.title }}
	.topicScreen
		div(v-if='lessons.length !== 0')
			.videoScreen
				LessonVideo(:sectionData="lessons[this.selectLesson]" @updSection='updSection')
			.questionScreen
				.btnList
					Poptip(confirm title="提醒" content="確定要刪除這個章節嗎？" ok-text="確定" cancel-text="取消" @on-ok="delSection" @on-cancel="")
						Button.delLessonBtn(type="error") 刪除整個章節
					Button.addLessonBtn(type="primary" @click="modalStatus.editQuestion = true") 編輯問題
				.lessonQA
					QuestionListCard.item(v-for="(item, index) in lessons[selectLesson].question" :key="index" :question="item")
		div(v-else)
			h1 點選右邊新增章節

	//-===========================================line 綁定modal==================================================================== 
	Modal(title="line綁定" v-model="modalStatus.lineConnect" width="40%")


	//-==========================================編輯問題modal============================================================= 
	Modal(v-if="lessons.length !== 0" title="編輯問題" v-model="modalStatus.editQuestion" class-name="verCenterModel" width="60%")
		.editQuestionArea
			h1 問題數：{{ lessons[selectLesson].question.length }}/5
			Button(type='primary' icon="md-add" @click="editAddQuestion") 新增問題
		.questionList
			QuestionCard(v-for="(item, index) in lessons[selectLesson].question" :key="index" :QAinside="item" @save="saveEditQA" @delete="deleteEditQA")
		div(slot="footer")
			Button(type="default" @click="modalStatus.editQuestion = false") 取消
			|
			Button(type="primary" @click="updateQuestion") 更新
	//- ======================================新增章節內容Modal================================================================== 
	Modal(title="新增章節" v-model="modalStatus.addsection" class-name="verCenterModel" width="60%")
		.stepFrank
			.setps
				Steps(:current="modalStatus.addstep")
					step(title="設定新的章節資料")
					step(title="新增問題")
					step(title="確認資料")
			.step1(v-if="this.modalStatus.addstep == 0")
					Form(ref="addsection" :model="addsectionData")
						FormItem(prop="title" label="章節標題")
							Input(v-model="addsectionData.title")
						FormItem(prop="type" label="請選擇內容：")
							RadioGroup(v-model="addsectionData.type")
								Radio(label="0") 文章
								Radio(label="1") 影片
							FormItem(v-if="addsectionData.type == 0" prop="url" label="請輸入內容")
								Input(v-model="addsectionData.url" type="textarea")
							FormItem(v-else prop="url" label="請輸入網址")
								Input(v-model="addsectionData.url")
							FormItem(prop="index" label="請選擇章節位置")
								RadioGroup(v-model="addsectionData.index")
									Radio(label="0") 第一個
									Radio(label="-1") 最後一個
									Radio(label="-2") 其他
								Select(v-if="addsectionData.index == -2" v-model="addsectionData.selectNum")
									Option(v-for="(item, index) in lessons" :value="index" :key="index") {{ item.lessonTitle }} 之後
			.step2(v-else-if="this.modalStatus.addstep == 1")
				.addQuestionArea
					h1 問題數：{{ addsectionData.questionData.length }}/5
					Button(type='primary' icon="md-add" @click="addNewQuestion") 新增問題
				.questionList
					QuestionCard(v-for="(item, index) in addsectionData.questionData" :key="index" :QAinside="item" @save="saveQA" @delete="deleteQA")
			.step3(v-else-if="this.modalStatus.addstep == 2")
				.addSectionList
					h1 標題: {{ addsectionData.title }}
					h1(v-if="addsectionData.type === '0'") 網址: {{ addsectionData.url }}
					h1(v-else) 文章: {{ addsectionData.url }}
					h1(v-if="addsectionData.index === '0'") 位置: 第一個
					h1(v-else-if="addsectionData.index === '-1'") 位置: 最後一個
					h1(v-else) 位置: 在 {{ lessons[addsectionData.selectNum].title }} 
				Divider
					.addQuestionList
				QuestionListCard(v-for="(item, index) in addsectionData.questionData" :key="index" :question="item")
		div(slot="footer")
			Button(type="default" @click="previous") 上一步
			|
			Button(v-if="" type="primary" @click='next') 下一步
</template>
<script>
import LessonVideo from "@/components/LessonMod/LessonVideo.vue";
import QuestionCard from "@/components/LessonMod/QuestionCard.vue";
import QuestionListCard from "@/components/LessonMod/QuestionListCard";
import LineIcon from "@/assets/LINE_APP.png";
import {
	addSection,
	delSection,
	getSection,
	updQuestion,
	updSection,
	getInviteCode
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
			LineIcon,
			modalStatus: {
				lineConnect: false,
				editQuestion: false,
				addsection: false,
				addstep: 0
			},
			addsectionData: {
				title: "",
				url: "",
				type: "0",
				index: "-1",
				selectNum: "0",
				questionData: []
			},
			classInvite: "",
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
		// getInviteCode(this.$route.params.classID)
		// 	.then(res => {
		// 		if(res.data.status.code === 0){
		// 			this.classInvite = res.data.data.invite
		// 		}else{
		// 			throw "code not 0";
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	})
	},
	methods: {
		getClassInviteData() {
			getInviteCode(this.$route.params.classID)
				.then(res => {
					if(res.data.status.code === 0){
						this.classInvite = res.data.data.invite
					}else{
						throw "code not 0";
					}
				})
				.catch(err => {
					console.log(err);
				})
		},
		updateQuestion() {
			const updQA = {
				sectionId: this.lessons[this.selectLesson].sectionId,
				classId: this.$route.params.classID,
				question: this.lessons[this.selectLesson].question
			};
			updQuestion(updQA)
				.then(req => {
					if (req.data.status.code === 0) {
						this.messageControl(1, "編輯成功");
					} else {
						this.messageControl(0, "編輯失敗 請稍後再試");
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
		editAddQuestion() {
			let sort = this.lessons[this.selectLesson].question.length;
			if (sort < 5) {
				let timeStamp = new Date().getTime();
				this.lessons[this.selectLesson].question.push({
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
					this.addsectionData.questionData.length < 1
						? this.messageControl(0, "最少需要一個問題")
						: (this.modalStatus.addstep += 1);
					break;
				case 2:
					this.addSection();
					break;
			}
		},
		previous() {
			this.modalStatus.addstep == 0
				? (this.modalStatus.addstep = 0)
				: (this.modalStatus.addstep -= 1);
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
		deleteQA(sort) {
			const rule = el => el.sort === sort;
			this.addsectionData.questionData.splice(
				this.addsectionData.questionData.findIndex(rule),
				1
			);
			this.messageControl(1, "刪除成功");
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
.editQuestionArea {
	display: flex;
	justify-content: space-between;
}
.stepFrank {
	margin: 20px;
	.step2 {
		display: grid;
		grid-template-columns: 30% 40% 30%;
		grid-template-rows: auto auto;
		grid-auto-flow: column;
		.addQuestionArea {
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: row;
			grid-column: 1/4;
			grid-row: 1/2;
		}
		.questionList {
			grid-column: 1/4;
			grid-row: 2/3;
			padding: 10px 0px 10px 0px;
		}
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
}
.topicList {
	flex: 2;
	max-width: 250px;
	margin: 10px;
	.cardborder {
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
			max-width: 500px;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: space-around;
		}
		display: flex;
		margin: 0px 200px;
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
