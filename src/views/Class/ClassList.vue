<template lang="pug">
.allclass
  Modal(v-model='addClass' title='新增課程')
    Form(ref='addClassData' :model='addClassData' :rules="addClassRule")
      FormItem(prop='topic' label='請輸入課程名稱')
        Input(v-model='addClassData.topic')
      FormItem(prop='intro' label='請輸入課程簡介')
        Input(v-model='addClassData.intro' type="textarea")
      FormItem(prop='type' label="課程是否公開")
        br
        RadioGroup(v-model='addClassData.type')
          Radio(label='1') 公開
          Radio(label='0') 非公開
      FormItem(label="請上傳課程封面")
      input(type='file' accept='image/gif, image/png, image/jpg, image/jpeg' @change="addImage")
    img(:src="imgData.addPreview" width='300')
    div(slot='footer')
      Button(type='default' @click='cancel') 取消
      |
      Button(type='primary' @click='addNewClass') 建立
  Modal(v-model="editClass" title="修改課程內容")
    Form(ref='editClassData' :model='editClassData')
      FormItem(prop='topic' label='課程名稱')
        Input(v-model='editClassData.topic')
      FormItem(prop='intro' label='課程簡介')
        Input(v-model='editClassData.intro' type="textarea")
    input(type='file' accept='image/gif, image/png, image/jpg, image/jpeg' @change="editImage")
    img(:src="imgData.editPreview" width='300')
    div(slot='footer')
      Button(type='default' @click='cancel') 取消
      |
      Button(type='primary' @click='updClassData') 更新
  Card(@click.native='addClass = true').addcard 新增課程
  .cardList
    ClassCard(v-for="(item, index) in classList" :key=`item.classCode` :classDetail='item' @enterClass="LessonPage(item.classId)" @deleClass="delClass" @editClass="editClassModal")
</template>
<script>
import defaultClass from "@/assets/defaultClass.png";
import ClassCard from "@/components/ClassCard.vue";
import { addClass, getTeacherClass, delClass, updClass, uploadImg } from "@/apis/course.js";

export default {
  name: `classList`,
  components: {
    ClassCard
  },
  mounted() {
    this.getClassList();
  },
  data() {
    return {
      defaultClass,
			classList: [],
			editClass: false,
      addClass: false,
      loading: true,
      addClassRule: {
        topic: [{ required: true, message: "請輸入標題", trigger: "blur" }],
        intro: [{ required: true, message: "請輸入簡介", trigger: "blur" }],
        type: [
          { required: true, message: "請選擇公開/不公開", trigger: "blur" }
        ]
      },
      imgData: {
        add: new FormData(),
        addPreview: "",
        edit: new FormData(),
        editPreview: ""
      },
      addClassData: {
        topic: "",
        // base64
        imgUrl: "",
        intro: "",
        type: 0,
        teacherId: ""
			},
			editClassData: {
				classId: "",
				topic: "",
				imgUrl: "",
				intro: "",
			}
    };
  },
  methods: {
    getClassList() {
      this.$Spin.show();
      getTeacherClass()
        .then(res => {
          if(res.data.status.code === 0){
            if (res.data.data.length === 0) {
              this.$Message.success("您目前沒有課程喔 請新增課程");
            }
            this.classList = res.data.data;
          }else{
            if(res.data.status.code === 21201){
              this.$Message.error("認證錯誤 請重新登入");
              this.$router.push("/signin");
            }
          }
        })
        .then(() => {
          this.$Spin.hide();
        })
        .catch(err => {
          this.$Message.error(`error: ${err}`);
        });
    },
    LessonPage(classID) {
      localStorage.setItem("nowClassID", "");
      localStorage.setItem("nowClassID", classID);
      this.$router.push(`/backstage/classlist/${classID}`);
    },
    addNewClass() {
      this.$refs.addClassData.validate( async valid => {
        if (valid) {
          let url = "";
          if(this.imgData.add.has("file")){
            let res = await uploadImg(this.imgData.add)
            if(res.data.status.code === 0){
              url = res.data.data.url;
            }
            await this.ApiAddClass(url);
          }else{
            this.ApiAddClass("");
          }
          this.addClass = false;
        }
      });
    },
    ApiAddClass(url){
      addClass({
        topic: this.addClassData.topic,
        imgUrl: url,
        intro: this.addClassData.intro,
        isPublic: parseInt(this.addClassData.type),
        teacherId: localStorage.getItem("teacherId")
      }).then(res => {
        if (res.data.status.code === 0) {
          this.getClassList();
          this.addClassData.topic = "";
          this.addClassData.imgUrl = "";
          this.addClassData.intro = "";
          this.addClassData.type = 0;
          this.$Message.success("新增成功");
        }
      }).then(
        this.imgData.add.delete("file")
      );
    },
    addImage(event) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.imgData.addPreview = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        this.imgData.add.delete("file");
        this.imgData.add.append("file", event.target.files[0]);
      }
    },
    editImage(event) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.imgData.editPreview = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        this.imgData.edit.delete("file");
        this.imgData.edit.append("file", event.target.files[0]);
      }
    },
    cancel() {
      this.$refs.addClassData.resetFields();
      this.addClass = false;
      this.editClass = false;
		},
		editClassModal(d){
			this.editClassData.classId = d.classId;
			this.editClassData.topic = d.topic;
			this.editClassData.imgUrl = d.imgUrl;
			this.editClassData.intro = d.intro;
			this.editClass = true;
		},
		async updClassData(){
      let url = "";
      if(this.imgData.edit.has("file")){
        let res = await uploadImg(this.imgData.edit)
        if(res.data.status.code === 0){
          url = res.data.data.url;
        }
      }
			let req = await updClass(this.editClassData.classId, {
				topic: this.editClassData.topic,
				imgUrl: url,
				intro: this.editClassData.intro
      })
      if (req.data.status.code === 0){
        this.$Message.success("更新成功");
        this.getClassList();
        this.editClassData.topic = "";
        this.editClassData.intro = "";
        this.imgData.edit.delete("file");
        this.editClass = false;
      }
		},
    delClass(classId) {
      delClass(classId).then(req => {
        if (req.data.status.code === 0) {
          this.$Message.success("刪除成功");
          this.getClassList();
        }else if(req.data.status.code === 21406){
          this.$Message.error("開啟的課程不可以刪除喔！！");
        } else{
          this.$Message.error("刪除失敗 請重新再試");
          this.getClassList();
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
body {
  height: 100%;
}
.allclass {
  height: 100%;
}
.cardList {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.addcard {
  background-color: brown;
  color: white;
  margin-left: 70%;
  max-width: 200px;
}
</style>
