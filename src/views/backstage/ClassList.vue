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
            addClass: false,
            newClassData: {
                title: '',
                content: '',
                imgUrl: ''
            },
            newClassRule: {
                title: [
                    { required: true, message: '請輸入主題名稱', tigger: 'blur' }
                ],
                content: [
                    { required: true, message: '請輸入主題簡介', tigger: 'blur' }
                ]

            }
        };
    },
    methods: {
        LessonPage(classID){
            this.$router.push(`classlist/${classID}`)
        },
        addNewClass(){
            console.log('??');
            this.$refs.addNewClass.validate((req) => {
                if(req) {
                    this.$message.success("/??");
                }
            })
        },
        upload(event){
            const file = event.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.imageloader);
            reader.readAsDataURL(file);
        },
        imageloader(event){
            this.newClassData.imgUrl = event.target.result;
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
                Form(ref='addNewClass' :model='newClassData' :rules='newClassRule')
                    FormItem(prop='title' label='請輸入主題名稱')
                        Input(v-model='newClassData.title')
                    FormItem(prop='content' label='請輸入主題簡介')
                        Input(v-model='newClassData.content')
                input(type='file' accept='image/gif, image/png, image/jpg, image/jpeg' @change='upload')
                img(v-if='newClassData.imgUrl' :src='newClassData.imgUrl' width='300')


            .card(v-for="(item, index) in classList" :key=`item.classCode`)
                ClassCard(:title='item.classTtile' :code='item.classCode' :topic='item.topicCount' :time='item.time' :progressRate='item.progressRate' :img='item.img' @click.native='LessonPage(item.classCode)')
</template>
<style lang='scss' scoped>
body {
    height: 100%;
}
.allclass{
    height: 100%;
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