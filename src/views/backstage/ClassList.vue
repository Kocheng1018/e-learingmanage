<template lang="pug">
.allclass
  Card(@click.native='addClass = true').addcard 新增主題
  Modal(v-model="editClass" title="修改課程內容")
    Form(ref='editClassData' :model='editClassData')
      FormItem(prop='topic' label='主題名稱')
        Input(v-model='editClassData.topic')
      FormItem(prop='intro' label='主題簡介')
        Input(v-model='editClassData.intro' type="textarea")
    input(type='file' accept='image/gif, image/png, image/jpg, image/jpeg' @change='editImage')
    img(:src="editClassData.imgUrl" width='300')
    div(slot='footer')
      Button(type='default' @click='cancel') 取消
      |
      Button(type='primary' @click='updClassData') 更新
  Modal(v-model='addClass' title='新增主題')
    Form(ref='addClassData' :model='addClassData' :rules="addClassRule")
      FormItem(prop='topic' label='請輸入主題名稱')
        Input(v-model='addClassData.topic')
      FormItem(prop='intro' label='請輸入主題簡介')
        Input(v-model='addClassData.intro' type="textarea")
      FormItem(prop='type' label="課程是否公開")
        br
        RadioGroup(v-model='addClassData.type')
          Radio(label='1') 公開
          Radio(label='0') 非公開
    input(type='file' accept='image/gif, image/png, image/jpg, image/jpeg' @change='upload')
    img(:src="addClassData.imgUrl" width='300')
    div(slot='footer')
      Button(type='default' @click='cancel') 取消
      |
      Button(type='primary' @click='addNewClass') 建立
  .card(v-for="(item, index) in classList" :key=`item.classCode`)
    ClassCard(:classDetail='item' @enterClass="LessonPage(item.classId)" @deleClass="delClass" @editClass="editClassModal")
</template>
<script>
import defaultClass from "@/assets/defaultClass.png";
import ClassCard from "@/components/ClassCard.vue";
import { addClass, getTeacherClass, delClass, updClass } from "@/apis/course.js";

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
        .catch(err => {
          this.$Message.error(`error: ${err}`);
        });
    },
    LessonPage(classID) {
      this.$router.push(`classlist/${classID}`);
    },
    addNewClass() {
      this.$refs.addClassData.validate(valid => {
        if (valid) {
          addClass({
            topic: this.addClassData.topic,
            imgUrl: this.addClassData.imgUrl,
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
          });
          this.addClass = false;
        }
      });
    },
    upload(event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.addClassData.imgUrl = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    editImage(event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.editClassData.imgUrl = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
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
		updClassData(){
			updClass(this.editClassData.classId, {
				topic: this.editClassData.topic,
				imgUrl: this.editClassData.imgUrl,
				intro: this.editClassData.intro
			})
				.then(req => {
					if (req.data.status.code === 0){
						this.$Message.success("更新成功");
						this.getClassList();
						this.editClass = false;
					}
				})
				.catch(err => {
					this.$Message.error(`err: ${ err }`)
				})
		},
    delClass(classId) {
      delClass(classId).then(req => {
        if (req.data.status.code === 0) {
          this.$Message.success("刪除成功");
          this.getClassList();
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
.card {
  display: inline-block;
  margin: 10px;
}
.addcard {
  background-color: brown;
  color: white;
  margin-left: 70%;
  max-width: 200px;
}
</style>
