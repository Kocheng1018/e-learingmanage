<template lang="pug">
.backstage
    .topbar
        TitleBar
    .view        
        router-view
</template>
<script>
import TitleBar from '../components/TitleBar.vue'
export default {
    name: 'Backstage',
    components: {
        TitleBar
    },
	data(){
		return {
			data1: "ssdf"
		}
	}
}
</script>
<style lang="scss" scoped>
.topbar{
    position: fixed;
    width: 100%;
    background-color: white;
    top: 0px;
    right: 0px;
    left: 0px;
    z-index: 10;
}
.view {
    margin-top: 90px;
}
</style>
