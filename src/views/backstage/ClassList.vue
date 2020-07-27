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
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `1`,
                    topicCount: `5`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                },
                {
                    classTtile: `數位行銷`,
                    classCode: `3500`,
                    topicCount: `10`,
                    progressRate: `20`,
                    img: ``
                },
                {
                    classTtile: `線上開店`,
                    classCode: `1201`,
                    topicCount: `5`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                },
                {
                    classTtile: `線上開店`,
                    classCode: `1205`,
                    topicCount: `5`,
                    progressRate: `100`,
                    img:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`
                }
            ],
            addClass: false
        };
    },
    methods: {
        LessonPage(classID){
            this.$router.push(`classlist/${classID}`)
        },
        addNewClass(){
            console.log('??');
        },
        cancel(){

        }
    }
}
</script>
<template lang="pug">
     .allclass
        .classRange
            Card(@click.native='addClass = true').addcard 新增主題
            Modal(v-model='addClass' title='新增主題' @on-ok='addNewClass' @on-cancel='cancel')
                p ffff
                p ggg
            .card(v-for="(item, index) in classList" :key=`item.classCode`)
                ClassCard(:title='item.classTtile' :code='item.classCode' :topic='item.topicCount' :time='item.time' :progressRate='item.progressRate' :img='item.img' @click.native='LessonPage(item.classCode)')
</template>
<style lang='scss' scoped>
body {
    height: 100%;
}
.allclass{
    height: 100%;
    background-color: rgb(250, 250, 250);
}
.card {
    display: inline-block;
        margin: 10px;
    }
.addcard{
    background-color: brown;
    color: white;
    margin-left: 70%;
    max-width: 200px;
}
</style>