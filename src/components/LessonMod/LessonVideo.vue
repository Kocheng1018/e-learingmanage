<template lang="pug">
.LessonVideo
	.setingArea
		.lineArea(v-if="lineIsBind === 1")
			img(:src="LineIcon" width="32" height="32")
			Button(@click="modalStatus.lineRemind = true") 課程提醒
			Button(@click="modalStatus.lineMsg = true") 發送訊息
		.editArea
			Button(v-if="!isEdit" icon="md-create" @click="openEdit") 編輯內容
			Poptip(confirm title="確定要刪除這個章節嗎？" ok-text="確定" cancel-text="取消" @on-ok="delSection" @on-cancel="")
				Button(type="text")
					Icon(type="md-trash" size="24")
	.title
		h1 標題:
		Input.content(v-if="isEdit" placeholder="請輸入標題" v-model="sectionData.title" size="large")
		h2(v-else) {{ sectionData.title }}
	.video(v-if="sectionData.type === 1")
		.urlset
			Input(v-if="isEdit" clearable @on-change="updateUrl" placeholder="更新Youtube網址" v-model='newUrl')
		iframe(:src="setUrl(this.sectionData.url)" frameborder="0" allowfullscreen)
	.content(v-else)
		Input(v-if="isEdit" v-model="sectionData.url" row="10" type="textarea" placeholder="請輸入文本" :autosize="{ minRows: 5, maxRows: 10 }")
		Input(v-else readonly=true v-model="sectionData.url" row="10" type="textarea" :autosize="{ minRows: 10, maxRows: 10 }")
	.comit
		Button.updBtn(v-if="isEdit" type="warning" long @click="cancelEdit") 取消
		Button.updBtn(v-if="isEdit" type="success" long @click="updSection") 更新
	LineRemindModal(v-model="modalStatus.lineRemind" :secIndex="index")
	LineMsgModal(v-model="modalStatus.lineMsg")
</template>
<script>
import LineRemindModal from "@/components/LessonMod/Line/LineRemindModal";
import LineMsgModal from "@/components/LessonMod/Line/LineMsgModal";
import LineIcon from "@/assets/LINE_APP.png";
export default {
	name: "LessonVideo",
	components: {
		LineRemindModal,
		LineMsgModal
	},
	props: {
		sectionData: {
			type: Object,
			default: () => {
				return {
					sectionId: "",
					title: "",
					type: "",
					url: "",
				};
			},
		},
		index: {
			type: Number,
			default: () => -1,
		},
		lineIsBind: {
			type: Number,
			default: () => 0
		}
	},
	data() {
		return {
			modalStatus: {
				lineRemind: false,
				lineMsg: false
			},
			LineIcon,
			isEdit: false,
			newUrl: "",
			copyData: {},
		};
	},
	methods: {
		delSection() {
			this.$emit("delSection");
		},
		openEdit() {
			this.copyData = {};
			this.copyData = {
				sectionId: this.sectionData.sectionId,
				title: this.sectionData.title,
				url: this.sectionData.url,
				type: this.sectionData.type,
			};
			this.isEdit = true;
		},
		cancelEdit() {
			this.sectionData.sectionId = this.copyData.sectionId;
			this.sectionData.title = this.copyData.title;
			this.sectionData.url = this.copyData.url;
			this.sectionData.type = this.copyData.type;
			this.isEdit = false;
		},
		updSection() {
			let section = {
				sectionId: this.sectionData.sectionId,
				title: this.sectionData.title,
				url: this.sectionData.url,
				type: this.sectionData.type,
			};
			this.$emit("updSection", section);
			this.copyData = {};
			this.isEdit = false;
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
					this.$Message.error("找不到影片！請確認網址是否正確");
					// this.newUrl = this.sectionData.url;
					this.newUrl = "";
					return;
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
	},
};
</script>
<style lang="scss" scoped>
.LessonVideo {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-bottom: 10px;
	.setingArea {
		display: flex;
		flex-direction: row;
		width: 80%;
		justify-content: flex-end;
		.lineArea {
			padding: 3px;
			border: 2px;
			border-style: solid;
			border-color: green;
			border-radius: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;
		}
		.editArea {
			flex: 2;
			text-align: right;
			padding: 3px;
		}
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
		.content {
			font-size: 40px;
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
	.comit {
		display: flex;
		flex-direction: row;
		button {
			flex: 1;
			margin: 10px;
		}
		width: 80%;
	}
}
</style>
