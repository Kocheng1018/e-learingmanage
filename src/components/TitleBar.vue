<template lang="pug">
.bar
	.img
		img(:src="logo")
	.menu
		Menu(mode="horizontal", @on-select="change", active-name="2")
			MenuItem(name="1") 返回至全部課程
			MenuItem(name="2") 當前課程
			MenuItem(name="3") 課程紀錄
</template>
<style lang="scss" scoped>
.bar {
	.img {
		background-color: white;
		float: left;
		width: 20%;
		img {
			height: 70px;
		}
	}
	.menu {
		float: left;
		width: 70%;
		height: 70px;
	}
}
</style>
<script>
import logo from "@/assets/elearningIcon.png";
export default {
	name: "TitleBar",
	data() {
		return {
			logo
		};
	},
	methods: {
		change(name) {
			switch (name) {
				case `1`:
					this.topath(`/class`);
					break;
				case `2`:
					this.topath(`/backstage/classlist/${localStorage.getItem("nowClassID")}`)
					break;
				case `3`:
					// let classID = localStorage.getItem("nowClassID");
					this.topath(`/backstage/classrecord/${localStorage.getItem("nowClassID")}`);
					break;
				default:
			}
		},
		topath(path) {
			this.$router.push({ path });
		}
	}
};
</script>