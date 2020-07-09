<script>
import LessonVideo from '@/components/LessonMod/LessonVideo.vue';
export default {
    name: 'LessonList',
    components:{
        LessonVideo
    },
    data(){
        return {
            firstOpen: '1',
            lessons: [
                {
                    lessonTitle: `課程標題1`,
                    lessonUrl: `ZPn7OsUZaug`,
                    question: [ ]
                },
                {
                    lessonTitle: `課程標題2`,
                    lessonUrl: `ZPn7OsUZaug`,
                    question: [ ]
                },
                {
                    lessonTitle: `課程標題3`,
                    lessonUrl: `ZPn7OsUZaug`,
                    question: [ ]
                }
            ]
        }
    },
    methods: {
        updateNewUrl(newUrl, index){
            console.log(newUrl);
            this.lessons[index].lessonUrl = newUrl;
        }
    }
}
</script>
<template lang="pug">
    #lessonlist
        .list
            .btnCollect
                Button(type='info') 新增
                //- div {{ firstOpen }}
                Select(v-model='firstOpen')
                    Option(v-for='(lesson, index) in lessons' :value='index + 1') {{ index }} - {{ lesson.lessonTitle }}
            Collapse(v-model='firstOpen' simple)
                Panel(v-for='(lesson, index) in lessons' :name='String(index + 1)') {{ lesson.lessonTitle }}
                    LessonVideo(slot='content' :url='lesson.lessonUrl' @newUrl='updateNewUrl($event, index)')


</template>
<style lang="scss" scoped>
#lessonlist{
    display: flex;
    justify-content: center;
    background-color: aqua;
}
.list{
    width: 80%;
    background-color: white;
    .btnCollect{
        display: flex;
        
    }
}

</style>