<template lang="pug">
.bar
  .menu
    Menu(
      mode="horizontal",
      @on-select="change",
      active-name="2",
      :theme="theme1"
    )
      //- MenuItem(name="1") 返回至全部課程
      MenuItem(name="1")
        .img
          img(:src="logo")
      MenuItem(name="2") 當前課程
      MenuItem(name="3") 課程紀錄
      Submenu(name="4")
        MenuGroup(title="使用")
          MenuItem(name="4-1") 亮
          MenuItem(name="4-2") 黑
          MenuItem(name="4-3") 藍色
</template>
<style lang="scss" scoped>
.bar {
  .img {
    float: left;
    img {
      height: 60px;
      width: 80px;
    }
  }
  .menu {
    float: left;
    width: 100%;
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
      logo,
      theme1: "primary"
    };
  },
  methods: {
    change(name) {
      switch (name) {
        case `1`:
          this.topath(`/class`);
          break;
        case `2`:
          this.topath(
            `/backstage/classlist/${localStorage.getItem("nowClassID")}`
          );
          break;
        case `3`:
          // let classID = localStorage.getItem("nowClassID");
          this.topath(
            `/backstage/classrecord/${localStorage.getItem("nowClassID")}`
          );
          break;
        case `4-1`:
          this.theme1 = (`light`);
          break;
        case `4-2`:
          this.theme1 = (`dark`);
          break;
        case `4-3`:
          this.theme1 = (`primary`);
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