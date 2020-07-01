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
.backstage
    .topbar
        TitleBar
    .view        
        router-view
    
</template>
<style lang='scss' scoped>

.topbar{
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0px;
    z-index: 10;
}

.view {
    margin-top: 70px;
}

</style>