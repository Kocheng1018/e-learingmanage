<script>
import TitleBar from '../components/TitleBar.vue'
export default {
    name: 'Backstage',
    components: {
        TitleBar
    }
}
</script>
<template lang="pug">
#backstage
    TitleBar
    router-view
    
</template>
<style lang='scss' scoped>

</style>