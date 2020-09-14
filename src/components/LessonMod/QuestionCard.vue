<template lang="pug">
    #QA 
        .qa
            Form(ref="qacard" :model="QAinside")
                FormItem(prop="type" label="問題類型")
                    RadioGroup(v-model="QAinside.type")
                        Radio(label="0") 單選
                        Radio(label="1") 多選
                        Radio(label="2") 填空
                FormItem(prop="content" label="請輸入問題")
                    Input(v-model="QAinside.content" type="textarea")
                .oneAns(v-if="QAinside.type == '0'")
                    FormItem(prop="select" label="輸入問題選項：")
                        .insertText
                            Input(v-model="ansText")
                            Button.addText(type="default" @click="addChoose") 新增
                    FormItem(prop="radio" label="選項（已選擇的是正確答案！）")
                    RadioGroup(v-model="radioAns")
                        Radio.select(v-for="(item, index) in QAinside.select" :key="index" :label="item" border) {{ item }}
                            Button.delStyle(size="small" type="text" icon="md-close" shape="circle" alt="刪除" @click="removeSelect(index)")
                .multAns(v-if="QAinside.type == '1'")
                    FormItem(prop="select" label="輸入問題選項：")
                        .insertText
                            Input(v-model="ansText")
                            Button.addText(type="default" @click="addChoose") 新增
                    FormItem(prop="checkbox" label="選項（已選擇的是正確答案！）")
                    CheckboxGroup(v-model="QAinside.answer")
                        Checkbox.select(v-for="(item, index) in QAinside.select" :key="index" :label="item" border) {{ item }} 
                            Button(size="small" type="text" icon="md-close" shape="circle" @click="removeSelect(index)")
                .fillIn(v-if="QAinside == 2")
                Divider
                .footer
                    Button(type="error" @click="deleteQA") 刪除
                    Button(type="primary" @click="saveQA") 儲存
</template>
<script>
export default {
    name: `QuestionCard`,
    props: {
        QAinside: {
            type: Object,
            default: () => {
                return{
                    content: "",
                    answer: [],
                    select: [],
                    type: "1",
                    sort: 0
                }
            }
        }
    },
    data(){
        return {
            ansText: "",
            radioAns: "",
       }
    },
    methods:{
        addChoose(){
            if(this.ansText == ""){
                this.$Message.error("請輸入選項文字");
            }else{
                this.QAinside.select.push(this.ansText);
                this.ansText = "";
            }
        },
        removeSelect(index){
            this.QAinside.select.splice(index, 1);
        },
        saveQA(){
            if(this.QAinside.type === "0") {
                this.QAinside.answer = [];
                this.QAinside.answer.push(this.radioAns);
            }
            this.$emit("save", this.QAinside);
        },
        deleteQA(){
            this.$emit("delete", this.QAinside.sort);
        }
    }
}
</script>
<style lang="scss" scoped>
#QA{
    border-style: solid;
    border-color: rgb(200, 220, 220);
    border-radius: 2rem;
    padding: 25px 20px;
    margin: 10px 0px;
    background-color: azure;
    .select {
        background-color: white;
        margin-bottom: 10px;
        min-height: 30px;
        padding-right: 0px;
        .delStyle{
            color: red;
        }
    }
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
    .addText{
        margin-left: 5px;
    }
}
</style>