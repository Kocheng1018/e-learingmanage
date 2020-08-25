<script>
export default {
    name: `LessonQA`,
    components: {

    },
    props: {
        question: {
            type: Object,
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
        Card() {{ question.content }}
</template>
<style lang="scss" scoped>

</style>