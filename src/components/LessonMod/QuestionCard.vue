<template lang="pug">
    #QA 
        .qa
            Form(ref="qacard" :model="questionData")
                FormItem(prop="type" label="問題類型")
                    RadioGroup(v-model="questionData.type")
                        Radio(label="0") 單選
                        Radio(label="1") 多選
                        Radio(label="2") 填空
                FormItem(prop="content" label="請輸入問題")
                    Input(v-model="questionData.content" type="textarea")
                .oneAns(v-if="questionData.type == 0")
                    FormItem(prop="select" label="輸入問題選項：")
                        .insertText
                            Input(v-model="ansText")
                            Button(type="default" @click="addChoose") 新增
                    FormItem(prop="radio" label="選項（已選擇的是正確答案！）")
                    RadioGroup(v-model="radioAns")
                        Radio(v-for="(item, index) in questionData.select" :key="index" :label="item" border) {{ item }}
                            Button(size="small" type="error" icon="md-close" shape="circle" @click="removeSelect(index)")
                .multAns(v-if="questionData.type == 1")
                    FormItem(prop="select" label="輸入問題選項：")
                        .insertText
                            Input(v-model="ansText")
                            Button(type="default" @click="addChoose") 新增
                    FormItem(prop="checkbox" label="選項（已選擇的是正確答案！）")
                    CheckboxGroup(v-model="checkboxAns")
                        Checkbox(v-for="(item, index) in questionData.select" :key="index" :label="item" border) {{ item }} 
                            Button(size="small" type="error" icon="md-close" shape="circle" @click="removeSelect(index)")
                .fillIn(v-if="questionData == 2")
                Divider
                .footer
                    Button(type="error" @click="deleteQA") 刪除
                    Button(type="primary" @click="saveQA") 儲存
</template>
<script>
export default {
    name: `QuestionCard`,
    props: {
        index: {
            type: Number,
            default: null
        }
    },
    data(){
        return {
            isEdit: false,
            questionData:{
                content: "",
                answer: [],
                select: ["j","jyujyuj"],
                type: "1",
                sort: this.index
            },
            ansText: "",
            radioAns: "",
            checkboxAns: []
       }
    },
    methods:{
        addChoose(){
            if(this.ansText == ""){
                this.$Message.error("請輸入選項文字");
            }else{
                this.questionData.select.push(this.ansText);
                this.ansText = "";
            }
        },
        removeSelect(index){
            this.questionData.select.splice(index, 1);
        },
        saveQA(){
            this.$emit("saveQA", this.questionData.type);
        },
        deleteQA(){
            this.$emit("deleteQA", this.questionData.sort);
        }
    }
}
</script>
<style lang="scss" scoped>
#QA{
    border-style: solid;
    border-color: red;
    padding: 5px;
    margin: 10px 0px;
    .insertText{
        display: flex;
        flex-direction: row;
    }
    .footer {
        display: flex;
        justify-content: flex-end;
        Button{
            margin: 0px 5px;
        }
    }
}
</style>