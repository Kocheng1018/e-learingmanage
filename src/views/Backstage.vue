<template lang="pug">
.backstage
    .topbar
        TitleBar
    .view        
        router-view
    Footer
</template>
<script>
import TitleBar from '../components/TitleBar.vue';
import Footer from '../components/Footer.vue';

export default {
    name: 'Backstage',
    components: {
        TitleBar,
        Footer
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
    background-color:#f0f5ff;
    min-height: 900px;
    padding-top: 90px;
    padding-bottom: 50px;
}
</style>
