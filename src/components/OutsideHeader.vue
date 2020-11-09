<template lang="pug">
.bar
  .menu
    Menu(
      mode="horizontal",
      @on-select="change",
      active-name="1",
      :theme="theme1"
    )
      MenuItem(name="1")
        .img
          img(:src="logo")
      .logOut
        MenuItem(name="2") 登出
</template>
<style lang="scss" scoped>
.bar {
  .img {
    img {
      float: left;
      height: 60px;
      width: 80px;
    }
  }
  .menu {
    float: left;
    width: 100%;
    height: 70px;
    .logOut {
      float: right;
    }
  }
}
</style>
<script>
import logo from "@/assets/elearningIcon.png";
import { signOut } from "@/apis/course";
export default {
  name: "OutsideHeader",
  data() {
    return {
      logo,
      theme1: "primary"
    };
  },
  methods: {
    change(name) {
      switch (name) {
        case `2`:
          console.log("???");
          this.logOut();
          break;
        default:
      }
    },
    topath(path) {
      let originPath = this.$route.path;
      if(originPath !== path) this.$router.push({ path });
    },
    async logOut(){
      let res = await signOut();
      if (res.data.status.code === 0){
        this.$Message.success("登出成功！");
        localStorage.clear();
        this.topath("/");
      }else{
        this.$Message.error("登出失敗 code: " + res.data.status.code);
      }
    }
  }
};
</script>