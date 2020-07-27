<script>
export default {
    name: `LessonQA`,
    components: {

    },
    props: {
        question: {
            type: Array,
            default: null
        }

    },
    data(){
        return {

        }
    }
}
</script>
<template lang="pug">
    #QA 
        .QATitle(v-if='this.question === null')
            h1 no questionID error
        div(v-else)
            Card(v-for='(question, index) in this.question' :key='question.questionID') {{ question.content }}
</template>
<style lang="scss" scoped>
#QA{
    margin: 5px;
}

</style>