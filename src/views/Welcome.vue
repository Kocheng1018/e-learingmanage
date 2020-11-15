<script>
import logo from "@/assets/logo.png";
import mainIcon from "@/assets/elearningIcon.png";
import Footer from '@/components/Footer.vue';
import OutsideHeader from '@/components/OutsideHeader.vue';
export default {
  name: "Welcome",
  components: {
		Footer,
		OutsideHeader
	},
  data() {
    return {
			logo,
			mainIcon,
			
    };
  }
};
</script>

<template lang="pug">
#Welcome.Welcome
	OutsideHeader
	.content
		h1 學海無涯-管理後台
		img.icon(:src="mainIcon")
		router-view
	Footer
</template>

<style lang='scss' scoped>
.Welcome {
	.content{
		min-height: 900px;
		background-color: #f0f5ff;
	}
	.icon{
		max-height: 60px;
		margin: 0px auto;
	}
  height: 100%;
  
}
Footer{
	height: 500px;
}
</style>
