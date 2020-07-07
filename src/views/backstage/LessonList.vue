<script>
export default {
    name: 'LessonList',
    components:{
        
    },
    data(){
        return {
            lessons: [
                {
                    lessonTitle: `課程標題`,
                    lessonUrl: `qWSKxGBv3bE`,
                    question: [
                        {
                            quesContent: `question content`,
                            questions: [
                                {
                                    question1: `q1`
                                },
                                {
                                    question2: `q2`
                                },
                                {
                                    question3: `q3`
                                },
                                {
                                    question4: `q4`
                                },

                            ]
                        }
                    ],
                    answer: `q1`
                }
            ]
        }
    },
    methods: {
        setUrl(videoCode){
            return `https://www.youtube.com/embed/${videoCode}`;
        }
    }
}
</script>
<template lang="pug">
    #lessonlist
        .list
            iframe( :src="setUrl(lessons[0].lessonUrl)" frameborder="0" allowfullscreen)
            | {{ this.$route.params.classID }}

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
}
</style>