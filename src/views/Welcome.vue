<script>
import logo from "@/assets/logo.png";
import mainIcon from "@/assets/elearningIcon.png";
export default {
  name: "Welcome",
  components: {},
  data() {
    return {
			logo,
			mainIcon
    };
  }
};
</script>

<template lang="pug">
#Welcome.Welcome
	h1 學海無涯-管理後台
	img.icon(:src="mainIcon")
	router-view
</template>

<style lang='scss' scoped>
.Welcome {
	.icon{
		max-height: 250px;
		margin: 0px auto;
	}
  height: 100%;
	background-color: rgba(252, 237, 220, 0.979);
}
</style>
