<script>
import defaultClass from '@/assets/defaultClass.png';
import ClassCard from '@/components/ClassCard.vue';
import { addClass, getTeacherClass } from '@/apis/course.js';

export default {
    name:`classList`,
    components: {
        ClassCard
    },
    mounted(){
        
    },
    data() {
        return {
            defaultClass,
            classList: [
                {
                    classId: '111',
                    topic: '???',
                    imgUrl:`https://cdn01.dcfever.com/articles/news/2020/04/200410_sparrow_02.jpg`,
                    type: 0,
                    isOpen: 0,
                    createAt: 132434333,
                    sectionNum: 3 
                },
                {
                    classId: '14411',
                    topic: '?df??',
                    imgUrl:``,
                    type: 0,
                    isOpen: 0,
                    createAt: 132434333,
                    sectionNum: 3 
                }
            ],
            addClass: false,
            loading: true,
            addClassRule: {
                topic: [
                    { required: true, message: "請輸入標題", trigger: "blur" }
                ],
                intro: [
                    { required: true, message: "請輸入簡介", trigger: "blur" }
                ],
                type: [
                    { required: true, message: "請選擇公開/不公開", trigger: "blur" }
                ]
                
            },
            addClassData: {
                topic: '',
                // base64
                imgUrl: '',
                intro: '',
                type: 0,
                teacherId: '' 
            },
        };
    },
    methods: {
        getClassList(){
            getTeacherClass()
                .then((res) => {
                    console.log(res.data.data);
                }).catch((err) => {
                    this.$Message.error(`error: ${err}`)
                })
        },
        LessonPage(classID){
            this.$router.push(`classlist/${classID}`)
        },
        addNewClass(){
            this.$refs.addClassData.validate((valid) => {
                if(valid){
                    console.log(this.addClassData);
                    addClass({
                        topic: this.addClassData.topic,
                        imgUrl: this.addClassData.imgUrl,
                        intro: this.addClassData.intro,
                        type: this.type,
                        teacherId: localStorage.getItem('teacherId')
                    })
                        .then((res) => {
                            console.log(res);
                        })
                    this.addClass = false;
                }
            })
            
        },
        upload(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.addClassData.imgUrl = e.target.result;
                    // console.log(this.addClassData.imgUrl);
                }
                reader.readAsDataURL(input.files[0]);
                // console.log(String(imageBase));
            }
        },
        cancel(){
            this.$refs.addClassData.resetFields();
            this.addClass = false;

        }

    }
}
</script>
<template lang="pug">
     .allclass
        .classRange
            Card(@click.native='addClass = true').addcard 新增主題
            Modal(v-model='addClass' title='新增主題')
                Form(ref='addClassData' :model='addClassData' :rules="addClassRule")
                    FormItem(prop='topic' label='請輸入主題名稱')
                        Input(v-model='addClassData.topic')
                    FormItem(prop='intro' label='請輸入主題簡介')
                        Input(v-model='addClassData.intro')
                    FormItem(prop='type' label="課程是否公開")
                        br
                        RadioGroup(v-model='addClassData.type')
                            Radio(label='0') 公開
                            Radio(label='1') 非公開
                input(type='file' accept='image/gif, image/png, image/jpg, image/jpeg' @change='upload')
                img(:src="addClassData.imgUrl" width='300')
                div(slot='footer')
                    Button(type='default' @click='cancel') 取消
                    |
                    Button(type='primary' @click='addNewClass') 建立
            .card(v-for="(item, index) in classList" :key=`item.classCode`)
                ClassCard(:classDetail='item' @click.native='LessonPage(item.class)')
               
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