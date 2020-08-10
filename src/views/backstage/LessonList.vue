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
            firstOpen: '1',
            selectLesson: 2,
            lessons: [
                {
                    lessonID: `12454`,
                    lessonTitle: `課程標題1`,
                    lessonUrl: `ZPn7OsUZaug`,
                    question: [ ]
                },
                {
                    lessonID: `124553`,
                    lessonTitle: `課程標題2`,
                    lessonUrl: `YzTGA_lR2AM`,
                    question: [ ]
                },
                {
                    lessonID: `12059`,
                    lessonTitle: `課程標題3`,
                    lessonUrl: `BiDE6_GUMDI`,
                    question: [ ]
                },
                {
                    lessonID: `12056`,
                    lessonTitle: `課程標題5`,
                    lessonUrl: `gnupOrSEikQ`,
                    question: [
                        {
                            questionID: `111`,
                            content: `問題內容`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['b'],
                            lessonID: `12056`
                        },
                        {
                            questionID: `112`,
                            content: `問題內容`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['d'],
                            lessonID: `12056`
                        },
                        {
                            questionID: `113`,
                            content: `問題內容`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['a'],
                            lessonID: `12056`
                        },
                        {
                            questionID: `114`,
                            content: `問題內容`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['a'],
                            lessonID: `12056`
                        },
                        {
                            questionID: `115`,
                            content: `問題內容5`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['c'],
                            lessonID: `12056`
                        }
                    ]
                },
                {
                    lessonID: `1232056`,
                    lessonTitle: `課程標題0`,
                    lessonUrl: `ZPn7OsUZaug`,
                    question: [ 
                        {
                            questionID: `111`,
                            content: `問題內容`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['b'],
                            lessonID: `1232056`
                        },
                        {
                            questionID: `112`,
                            content: `問題內容6`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['d'],
                            lessonID: `1232056`
                        },
                        {
                            questionID: `113`,
                            content: `問題內容`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['a'],
                            lessonID: `1232056`
                        },
                        {
                            questionID: `114`,
                            content: `問題內容4`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['a'],
                            lessonID: `1232056`
                        },
                        {
                            questionID: `115`,
                            content: `問題內容4`,
                            select: [ 'a', 'b', 'c', 'd'],
                            answer: ['c'],
                            lessonID: `1232056`
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        updateNewUrl(newUrl, index){
            this.lessons[index].lessonUrl = newUrl;
            console.log(this.lessons[index].lessonUrl);
        },
        selectTopic(index){
            this.selectLesson = index;
            console.log(this.selectLesson)
        },
    }
}
</script>
<template lang="pug">
    #lessonlist
        .topicList 
            Card.cardborder(v-for='(lesson, index) in lessons' :key='lesson.lessonID' @click.native='selectTopic(index)') 
                div {{ lesson.lessonTitle }}
        .topicScreen
            div(v-if='this.selectLesson != null')
                .videoScreen 
                    LessonVideo(:url='this.lessons[this.selectLesson].lessonUrl' @newUrl='updateNewUrl($event, this.selectLesson)')
                .questionScreen
                    div(v-if='lessons[selectLesson].question.length == 0')
                        Card
                            div 新增問題
                    div(v-else)
                        LessonQA.QAcard(:question='lessons[selectLesson].question')
            div(v-else)
                h1 請點選左邊課程進入詳細內容

</template>
<style lang="scss" scoped>
#lessonlist{
    padding: 0px 5% 0px 5%;
    display: flex;
    justify-content: center;
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
}
.topicScreen{
    display: flex;
    flex-direction: column;
    flex: 7;
    .videoScreen{
        flex: 7;
        
    }
    .questionScreen{
        display: flex;
        justify-content: center;
        justify-items: center;
        flex-direction: column;
        flex: 3;
    }
}

</style>