<script>
export default {
    name: "SignUp",
    components: {
        
    },
    data() {
        return {
            signUp: {
                account: '',
                passwd: '',
                name: '',
                department: ''
            }
            
        };
    },
    methods: {
        toSingIn() {
            this.$router.push({
                path: 'signin'
            })
        },
        register() {
            console.log(this.signUp)
        }
    },
    mounted() {

    }
};
</script>

<template lang="pug">
    #SignUp.signup
        Card.signinCard
            h1 註冊
            Form(:ref='signUp' :rules='rules')
                FormItem(label='Account' prop='account')
                    Input(type='text' placeholder='請輸入帳號' v-model='signUp.account')
                FormItem(label='Password' prop='passwd')
                    Input(type='password' placeholder='請輸入密碼' v-model='signUp.passwd')
                FormItem(label='姓名' prop='name')
                    Input(type='text' placeholder='請輸入姓名' v-model='signUp.name')
                FormItem(label='所屬單位 部門 公司(選填)' prop='department')
                    Input(type='text' v-model='signUp.department')
                FormItem
                    Button(type='primary' @click='register()') 註冊
                    Button(type='primary' @click='toSingIn()') 返回登入
        
</template>

<style lang='scss' scoped>
.signup {
    display: flex;
    align-items: center;
    justify-content: center;
}
.signinCard {
    width: 600px;
    Button {
        margin: 10px;
    }
}
</style>
