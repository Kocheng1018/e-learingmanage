<template lang="pug">
Card.card
	.delBtn
		Poptip.poptext(confirm placement="top-start" title="提醒" content="確定要刪除此課程嗎？" ok-text="確定" cancel-text="取消" @on-ok="delClass" @on-cancel="")
			Icon(type="ios-close" size="30")
	.imgframe
		img(v-if='this.classDetail.imgUrl != "" ' :src="this.classDetail.imgUrl" )
		img(v-else :src="defaultClass") 
	.title {{ this.classDetail.topic }}
	.detail
		| 簡介： {{ this.classDetail.intro }}
		br
		| 課程數：{{ this.classDetail.sectionNum }} 個
		br
		| 教師名稱： {{ this.classDetail.teacherName }}
		br
		| 開放狀態： {{ this.classDetail.isPublic == 0 ? "私密" : "開啟" }}
		br
		| 是否啟動： {{ this.classDetail.isOpen == 0 ? "關閉中" : "開啟中" }}
	.enter
		Button(type="error" @click="editClass") 修改課程
		Button(type="info" @click="enterClass") 進入課程
</template>
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
<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: center;
  width: 225px;
  .delBtn {
    text-align: right;
    .poptext {
      text-align: justify;
    }
  }
  .imgframe {
    min-height: 150px;
    width: 150px;
    margin: auto;
    img {
      float: right;
      max-width: 150px;
      max-width: 150px;
    }
  }
  .title {
    text-align: left;
    font-size: 28px;
  }
  .detail {
    text-align: left;
  }
  .enter {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
  }
}
</style>