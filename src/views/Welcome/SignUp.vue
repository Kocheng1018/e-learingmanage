<template lang="pug">
#SignUp.signup
  Card.signinCard
    h1 註冊
    Form(ref="signUp" :rules="rules" :model="signUp")
      FormItem(label="帳號", prop="account")
        Input(type="email", placeholder="請輸入帳號", v-model="signUp.account")
      FormItem(label="密碼", prop="password")
        Input(type="password", placeholder="請輸入密碼", v-model="signUp.password")
      FormItem(label="姓名", prop="name")
        Input(type="text", placeholder="請輸入姓名", v-model="signUp.name")
      FormItem(label="所屬單位 部門 公司(選填)", prop="department")
        Input(type="text", v-model="signUp.department")
      FormItem
        Button(type="primary", @click="register()") 註冊
        Button(type="primary", @click.native="toSingIn()") 返回登入
</template>
<script>
import { signUp } from "@/apis/course.js";
export default {
  name: "SignUp",
  data() {
    return {
      signUp: {
        account: "",
        password: "",
        name: "",
				department: ""
      },
      rules: {
        account: [{ required: true, message: "請輸入帳號", trigger: "blur" }],
        password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
        name: [{ required: true, message: "請輸入姓名以便做課程導師名", trigger: "blur" }]
      }
    };
  },
  methods: {
    toSingIn() {
      this.$router.push({
        path: "signin"
      });
    },    
    register() {
      this.$refs.signUp.validate(async valid => {
        if(valid) {
          let param = {
            account: this.signUp.account,
            password: this.signUp.password,
            department: this.signUp.department,
            name: this.signUp.name
          }
          await this.ApisignUp(param);
        }
      });
    },
    async ApisignUp(params){
      const res = await signUp(params);
      if(res.data.status.code === 21107) {
        this.$Message.error("帳號重複，請換個帳號或是前往登入");
        return;
      }
      if (res.data.status.code === 0) {
					this.$Message.success("註冊成功");
					this.toSingIn();
				} else {
          this.$Message.error("註冊失敗 請檢查資料後再作嘗試");
        }
    }
  }
};
</script>
<style lang='scss' scoped>
.signup {
  display: flex;
  align-items: center;
  justify-content: center;
}
.signinCard {
  width: 600px;
  button {
    margin: 10px;
  }
}
</style>
