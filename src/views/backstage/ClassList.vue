<script>
import defaultClass from '@/assets/defaultClass.png';
import ClassCard from '@/components/ClassCard.vue';

export default {
    name:`classList`,
    components: {
        ClassCard
    },
    data() {
        return {
            defaultClass,
            classList: [
                {
                    classTtile: `數位行銷`,
                    classCode: `0000`,
                    topicCount: `10`,
                    time: `20`,
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `1`,
                    topicCount: `5`,
                    time: `9`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                },
                {
                    classTtile: `數位行銷`,
                    classCode: `3500`,
                    topicCount: `10`,
                    time: `20`,
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `1201`,
                    topicCount: `5`,
                    time: `9`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                },
                {
                    classTtile: `數位行銷`,
                    classCode: `0740`,
                    topicCount: `10`,
                    time: `20`,
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `8701`,
                    topicCount: `5`,
                    time: `9`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                },
                {
                    classTtile: `數位行銷`,
                    classCode: `6700`,
                    topicCount: `10`,
                    time: `20`,
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `0781`,
                    topicCount: `5`,
                    time: `9`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                },{
                    classTtile: `數位行銷`,
                    classCode: `0340`,
                    topicCount: `10`,
                    time: `20`,
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `0091`,
                    topicCount: `5`,
                    time: `9`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                },
                {
                    classTtile: `數位行銷`,
                    classCode: `1000`,
                    topicCount: `10`,
                    time: `20`,
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `5001`,
                    topicCount: `5`,
                    time: `9`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                },
                {
                    classTtile: `數位行銷`,
                    classCode: `0070`,
                    topicCount: `10`,
                    time: `20`,
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `6001`,
                    topicCount: `5`,
                    time: `9`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                },
                {
                    classTtile: `數位行銷`,
                    classCode: `0050`,
                    topicCount: `10`,
                    time: `20`,
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `0021`,
                    topicCount: `5`,
                    time: `9`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                }

            ]
        };
    },
    methods: {
        LessonPage(classID){
            this.$router.push(`classlist/${classID}`)
        }
    }
}
</script>
<template lang="pug">
     .allclass
        .classRange(v-for="(item, index) in classList" :key=`item.classCode`)
            .card
                ClassCard(:title='item.classTtile' :code='item.classCode' :topic='item.topicCount' :time='item.time' :progressRate='item.progressRate' :img='item.img' @click.native='LessonPage(item.classCode)')

       
</template>
<style lang='scss' scoped>
.allclass{
    background-color: rgb(250, 250, 250);
}
    .classRange {
        display: inline-block;
    }
    .card {
            margin: 10px;
        }
</style>