<script>
export default {
    name: 'LessonList',
    components:{
        
    }
}
</script>
<template lang="pug">
    #lessonlist hjk
        div {{ this.$route.params.classID }}
</template>
<style lang="scss" scoped>
#lessonlist{
    background-color: aqua;
}
</style>