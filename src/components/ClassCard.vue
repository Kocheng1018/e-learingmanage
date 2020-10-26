<template lang="pug">
Card.cardInfo
	.delBtn
		Poptip.poptext(confirm title="確定刪除此課程嗎？" ok-text="確定" cancel-text="取消" @on-ok="delClass" @on-cancel="")
			Icon(type="ios-close" size="30")
	.imgframe
		img(v-if='this.classDetail.imgUrl != "" ' :src="this.classDetail.imgUrl" )
		img(v-else :src="defaultClass") 
	.detail
		.title {{ this.classDetail.topic }}
		p 課程數：{{ this.classDetail.sectionNum }} 個
		p 教師名稱： {{ this.classDetail.teacherName }}
		p 開放狀態： {{ this.classDetail.isPublic == 0 ? "私密" : "公開" }}
		p 是否啟動： {{ this.classDetail.isOpen == 0 ? "關閉中" : "開啟中" }}
		p(style="text-align: left") 簡介：
		p.intro {{ this.classDetail.intro }}
	.enter
		Button.btn(type="error" @click="editClass") 修改課程
		Button.btn(type="info" @click="enterClass") 進入課程
</template>
<style lang="scss" scoped>
.cardInfo{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 300px;
	height: 470px;
	flex-wrap: wrap;
	margin: 5px 10px;
	.delBtn{
		text-align: right;
		flex: 1;
	}
	.imgframe{
		flex: 1;
		height: 110px;
		line-height: 110px;
		img {
			max-height: 100%;
			vertical-align: middle;
		}
	}
	.detail{
		flex: 1;
		text-align: left;
		.title{
			font-size: 22px;
			font-weight: bold;
			margin: 5px auto;
			text-align: center;
		}
		.intro{
			flex: 1;
			width: 90%;
			height: 100px;
			margin: auto;
			padding: 5px;
			display: -webkit-box;
			-webkit-line-clamp: 4; //行數
			-webkit-box-orient: vertical;
			white-space: normal;
		}
	}
	.enter{
		flex: 1;
		.btn{
			margin: 10px 5px;
		}
	}
}
</style>
<script>
import defaultClass from "@/assets/defaultClass.png";
export default {
  name: `ClassCard`,
  data() {
    return {
      defaultClass
    };
  },
  props: {
    classDetail: {
      type: Object,
      default: null
    }
  },
  methods: {
    editClass() {
      this.$emit("editClass", this.classDetail);
    },
    enterClass() {
      this.$emit("enterClass");
    },
    delClass() {
      this.$emit("deleClass", this.classDetail.classId);
    }
  }
};
</script>
