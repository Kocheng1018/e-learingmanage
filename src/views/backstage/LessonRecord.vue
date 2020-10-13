<template lang="pug">
#LessonRecord
  .searchArea
    h1 請選擇你的課程章節
    Select(v-model="selected" size="large")
      Option aaa
      Option aaa
      Option aaa
      Option aaa
      Option aaa
      Option aaa
      Option aaa
  .sectionArea
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
  name: "LessonRecord",
  data(){
    return {
      selected: ""
    }
  }
}
</script>