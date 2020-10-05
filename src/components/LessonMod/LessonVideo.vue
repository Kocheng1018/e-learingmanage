<template lang="pug">
.LessonVideo
	Button.updBtn(type="primary" @click="updSection") 更新課程
	.title
		h1 標題:
		Input(placeholder="請輸入標題" v-model="sectionData.title" size="large")
	.video(v-if="sectionData.type === 1")
		.urlset
			Input(clearable @on-change="updateUrl" placeholder="更新Youtube網址" v-model='newUrl')
			//- Button(type=`success` @click='updateUrl') 測試
		iframe(:src="setUrl(this.sectionData.url)" frameborder="0" allowfullscreen)
	.content(v-else)
		Input(v-model="sectionData.url" type="textarea" placeholder="請輸入文本" :autosize="true")
</template>
<script>
export default {
	name: "LessonVideo",
	props: {
		sectionData: {
			type: Object,
			default: () => {
				return {
					sectionId: "",
					title: "",
					type: "",
					url: ""
				};
			}
		}
	},
	data() {
		return {
			newUrl: ""
		};
	},
	methods: {
		updSection(){
			let section = {
				sectionId: this.sectionData.sectionId,
				title: this.sectionData.title,
				url: this.sectionData.url,
				type: this.sectionData.type
			};
			this.$emit("updSection", section);
		},
		setUrl(videoCode) {
			return `https://www.youtube.com/embed/${videoCode}`;
		},
		updateUrl() {
			if (this.newUrl === "") {
				this.$Message.error("請貼入網址");
			} else {
				this.newUrl = this.newUrl.trim();
				let start = this.newUrl.indexOf("v=");
				let last = this.newUrl.indexOf("&");
				if (start === -1) {
					this.$Message["error"]({
						background: true,
						content: "找不到影片！請確認網址是否正確"
					});
					this.newUrl = this.sectionData.url;
				} else {
					if (last === -1) {
						this.newUrl = this.newUrl.slice(start + 2);
					} else {
						this.newUrl = this.newUrl.slice(start + 2, last);
					}
				}
				this.sectionData.url = this.newUrl;
				this.newUrl = "";
			}
		},
	}
};
</script>
<style lang="scss" scoped>
.LessonVideo {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-bottom: 10px;
	.updBtn{
		margin-left: auto;
	}
	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: auto;
		h1 {
			min-width: 100px;
		}
	}
	.video {
		width: 100%;
		iframe {
			width: 70%;
			min-height: 400px;
		}
		.urlset {
			display: flex;
			align-items: center;
			width: 50%;
			margin: 1em auto;
			// button {
			// 	margin-left: 10px;
			// }
		}
	}
	.content {
		margin: 10px auto;
		width: 70%;
		min-height: auto;
	}
	button {
		margin: 5px;
	}
}
</style>