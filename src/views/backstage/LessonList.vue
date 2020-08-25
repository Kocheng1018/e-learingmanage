<template lang="pug">
    #lessonlist
        Modal(title="新增章節" v-model="modalStatus.addsection" class-name="verCenterModel")
            .setps
                Steps(:current="addStep")
                    step(title="設定新的章節資料")
                    step(title="新增問題")
                    step(title="確認資料")
            .step1(v-if="modalStatus.addstep == 0")
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
            div(slot="footer")
                Button(type="info" @click="previous") 上一步
                Button(type="primary" @click='next') 下一步
        .topicList 
            Card(@click.native="modalStatus.addsection = true").addLesson.cardborder 新增主題
            Card.cardborder(v-for='(lesson, index) in lessons' :key='lesson.lessonID' @click.native='selectTopic(index)') 
                div {{ lesson.lessonTitle }}
        .topicScreen
            div(v-if='this.selectLesson != null')
                .videoScreen 
                    LessonVideo(:url='this.lessons[this.selectLesson].lessonUrl' @newUrl='updateNewUrl($event, this.selectLesson)')
                .questionScreen
                    Card.addLessonBtn(v-if="lessons[selectLesson].question.length < 5") 新增章節
                    .lessonQA
                        LessonQA.itemQA(v-for='(item, index) in lessons[selectLesson].question' :key='index' :question='item')
            div(v-else)
                h1 請點選左邊課程進入詳細內容

</template>
<script>
import LessonVideo from '@/components/LessonMod/LessonVideo.vue';
import LessonQA from '@/components/LessonMod/LessonQA.vue';
export default {
    name: 'LessonList',
    components:{
        LessonVideo,
        LessonQA
    },
    data(){
        return {
            modalStatus: {
                addsection: true,
                addstep: 0
            },
            addsectionData: {
                title: "",
                url: "",
                type: "0",
                index: "0",
                selectNum: "0"
            },
            firstOpen: '1',
            selectLesson: 0,
            lessons: [
                {
                    lessonID: `12454`,
                    lessonTitle: `課程標題1`,
                    lessonUrl: `ZPn7OsUZaug`,
                    question: []
                },
                {
                    lessonID: `124553`,
                    lessonTitle: `課程標題2`,
                    lessonUrl: `YzTGA_lR2AM`,
                    question: []
                }
            ]
        }
    },
    methods: {
        addNewLesson(){
            alert('addNewLesson');
        },
        updateNewUrl(newUrl, index){
            this.lessons[index].lessonUrl = newUrl;
            console.log(this.lessons[index].lessonUrl);
        },
        selectTopic(index){
            this.selectLesson = index;
            console.log(this.selectLesson)
        },
        next(){
            this.modalStatus.addstep == 2 ? alert("send data") : this.modalStatus.addstep += 1;
        },
            previous(){
                this.modalStatus.addstep == 0 ? this.modalStatus.addstep == 0 :this.modalStatus.addStep -= 1;
        },
    }
}
</script>
<style lang="scss" scoped>
#lessonlist{
    padding: 0px 5% 0px 5%;
    display: flex;
    justify-content: center;
}
.steps{
    margin: 10px;
}
.topicList{
    flex: 2;
    max-width: 250px;
    border-style: solid;
    border-color: red;
    margin: 10px;
    .cardborder {
        margin: 10px;
    }
    .addLesson{
        color: white;
        background-color:brown;
    }
}
.topicScreen{
    display: flex;
    flex-direction: column;
    flex: 7;
    .videoScreen{
        flex: 7;
    }
    .questionScreen{
        .addLessonBtn{
            color: white;
            background-color: brown;
        }
        .lessonQA{
            display: flex;
            flex-direction: row;
            justify-content: center;
            .itemQA{
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
.verCenterModel{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
