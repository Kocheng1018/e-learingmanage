
<template lang="pug">
.backstage
    OutsideHeader
    .view        
        router-view
    Footer
</template>
<script>
import OutsideHeader from '@/components/OutsideHeader.vue';
import Footer from '@/components/Footer.vue';
export default {
    name: 'Class',
    components: {
        OutsideHeader,
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
.view {
    margin-top: 0px;
    min-height: 900px;
    padding-top: 90px;
    background-color:#f0f5ff;
}
Footer {
    height: 500px;
}
</style>
