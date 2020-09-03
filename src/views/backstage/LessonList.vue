<template lang="pug">
    #lessonlist
        Modal(title="新增章節" v-model="modalStatus.addsection" class-name="verCenterModel" width="70%")
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
                        h1(v-else) 位置: 在 {{ lessons[addsectionData.selectNum].lessonTitle }} 
                    Divider
                    .addQuestionList
                        QuestionListCard(v-for="(item, index) in addsectionData.questionData" :key="index" :question="item")
            div(slot="footer")
                Button(type="default" @click="previous") 上一步
                |
                Button(v-if="" type="primary" @click='next') 下一步
        .topicList 
            Card(@click.native="modalStatus.addsection = true").addLesson.cardborder 新增主題
            Card.cardborder(v-for='(lesson, index) in lessons' :key='lesson.lessonID' @click.native='selectTopic(index)') 
                div {{ lesson.lessonTitle }}
        .topicScreen
            div(v-if='lessons.length != 0')
                    .videoScreen 
                        LessonVideo(:url='this.lessons[this.selectLesson].lessonUrl' @newUrl='updateNewUrl($event, this.selectLesson)')
                    .questionScreen
                        .lessonQA
                            Card(v-for="(item, index) in lessons[selectLesson].question" :key="index") {{ item.content }}
                        Card.addLessonBtn(v-if="lessons[selectLesson].question.length < 5") 編輯問題
            div(v-else)
                h1 請點選左邊課程進入詳細內容
                h1 或點選新增主題
</template>
<script>
import LessonVideo from "@/components/LessonMod/LessonVideo.vue"
import QuestionCard from "@/components/LessonMod/QuestionCard.vue"
import QuestionListCard from "@/components/LessonMod/QuestionListCard"
import { addSection } from "@/apis/course.js"

export default {
	name: "LessonList",
	components: {
		LessonVideo,
		QuestionCard,
		QuestionListCard,
	},
	data() {
		return {
			modalStatus: {
				addsection: false,
				addstep: 0,
			},
			addsectionData: {
				title: "title",
				url: "url",
				type: "0",
				index: "-2",
				selectNum: "0",
				questionData: [
					// {
					// 	content: "範例",
					// 	answer: ["問題一"],
					// 	select: ["問題一", "問題二", "問題三", "問題四"],
					// 	type: "0",
					// 	sort: 0,
					// },
					// {
					// 	content: "範例",
					// 	answer: ["問題一"],
					// 	select: ["問題一", "問題二", "問題三", "問題四"],
					// 	type: "0",
					// 	sort: 0,
					// },
					// {
					// 	content: "範",
					// 	answer: ["問題一"],
					// 	select: ["問題一", "問題二", "問題三", "問題四"],
					// 	type: "0",
					// 	sort: 0,
					// },
					// {
					// 	content: "例",
					// 	answer: ["問題一"],
					// 	select: ["問題一", "問題二", "問題三", "問題四"],
					// 	type: "0", 
					// 	sort: 0,
					// },
				],
			},
			firstOpen: "1",
			selectLesson: 0,
			lessons: [
				{
					lessonID: `124553`,
					lessonTitle: `課程標題2`,
					lessonUrl: `YzTGA_lR2AM`,
					question: [{content: "???" }, { content: "!!!" }],
				},
			],
		};
	},
	methods: {
        addSection() {
            let classId = this.$route.params.classID
            let sectionIndex = () => {
                if(this.addsectionData.index === "-2"){
                    return parseInt(this.addsectionData.selectNum) + 1
                }else{
                    return parseInt(this.addsectionData.index)
                }
            }
            let addSectionParam = {
                classId: classId,
                isSort: sectionIndex(),
                section: {
                    title: this.addsectionData.title,
                    url: this.addsectionData.url,
                    type: parseInt(this.addsectionData.type)
                },
                question: this.addsectionData.questionData
            }
            addSectionParam.question.forEach((el) => {
                el.type = parseInt(el.type)
            })
            // console.log(addSectionParam);
            addSection(addSectionParam)
                .then((res) => {
                    console.log(res)
                    this.messageControl(1, "儲存成功")
                })
                .catch((err) => {
                    console.log(err)
                    this.messageControl(0, "儲存失敗")
                })

        },
		messageControl(type, msg) {
			switch (type) {
				case 0:
					this.$Message.error(msg)
					break
				case 1:
					this.$Message.success(msg)
					break
			}
		},
		updateNewUrl(newUrl, index) {
			this.lessons[index].lessonUrl = newUrl
		},
		selectTopic(index) {
			this.selectLesson = index
		},
		addNewQuestion() {
			let sort = this.addsectionData.questionData.length
			if (sort < 5) {
				let timeStamp = new Date().getTime();
				console.log(timeStamp);
				this.addsectionData.questionData.push({
					content: "",
					answer: [],
					select: [],
					type: "0",
					sort: timeStamp,
				});
			} else {
				this.messageControl(0, "問題最多五個");
			}
		},
		next() {
            switch (this.modalStatus.addstep) {
                case 0:
                    this.modalStatus.addstep += 1
                    break

                case 1:
                    this.addsectionData.questionData.length < 1
                    ? this.messageControl(0, "最少需要一個問題")
                    : this.modalStatus.addstep += 1
                    break

                case 2:
                    alert("send data");
                    this.addSection();
                    break
            }
		},
		previous() {
			this.modalStatus.addstep == 0
				? (this.modalStatus.addstep = 0)
				: (this.modalStatus.addstep -= 1)
		},
		saveQA(questionData) {
			const rule = (el) => el.sort === questionData.sort;
			this.addsectionData.questionData.splice(
				this.addsectionData.questionData.findIndex(rule),
				1,
				questionData
			);
			this.messageControl(1, "儲存成功")
		},
		deleteQA(sort) {
			const rule = (el) => el.sort === sort;
			// let index = this.addsectionData.questionData.findIndex(rule);
			this.addsectionData.questionData.splice(
				this.addsectionData.questionData.findIndex(rule),
				1
			);
			this.messageControl(1, "刪除成功")
		},
	},
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
		.addLessonBtn {
			color: white;
			background-color: brown;
		}
		.lessonQA {
			display: flex;
			flex-direction: row;
			justify-content: center;
			.itemQA {
				margin: 10px;
			}
		}
		display: flex;
		margin: 0px 200px;
		justify-content: center;
		justify-items: center;
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
