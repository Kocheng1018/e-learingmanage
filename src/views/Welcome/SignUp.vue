<template lang="pug">
#SignUp.signup
  Card.signinCard
    h1 註冊
    Form(:ref="signUp")
      FormItem(label="Account", prop="account")
        Input(type="email", placeholder="請輸入帳號", v-model="signUp.account")
      FormItem(label="Password", prop="password")
        Input(type="password", placeholder="請輸入密碼", v-model="signUp.password")
      FormItem(label="姓名", prop="name")
        Input(type="text", placeholder="請輸入姓名", v-model="signUp.name")
      FormItem(label="所屬單位 部門 公司(選填)", prop="department")
        Input(type="text", v-model="signUp.department")
      FormItem
        Button(type="primary", @click="register()") 註冊
        Button(type="primary", @click.native="toSingIn()") 返回登入
</template>

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
      signUp({
        account: this.signUp.account,
        password: this.signUp.password,
        department: this.signUp.department,
        name: this.signUp.name
      }).then(req => {
				if (req.data.status.code === 0) {
					this.$Message.success("註冊成功");
					this.toSingIn();
				}
      });
    }
  }
};
</script>
