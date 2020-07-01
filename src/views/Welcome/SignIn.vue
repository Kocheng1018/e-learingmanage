<script>
export default {
    name: "SignIn",
    components: {
        
    },
    data() {
        return {
            signIn: {
                account: '',
                passwd: ''
            }
        };
    },
    methods: {
        toSignUP() {
            this.$router.push('signup')
        },
        loginStage() {
            this.$router.push(`/backstage`)
        }
    },
    mounted() {

    }
};
</script>
<template lang="pug">
    #SingIn.signin
        Card.signinCard
            h1 登入
            Form(:ref='signIn')
                FormItem(label='Account' prop='account')
                    Input(type='text' placeholder='請輸入帳號' v-model='signIn.account')
                FormItem(label='Password' prop='passwd')
                    Input(type='password' placeholder='請輸入密碼' v-model='signIn.passwd')
                FormItem
                    Button(type='primary' @click='loginStage') 登入
                    Button(type='primary' @click='toSignUP') 註冊

        
</template>

<style lang='scss' scoped>
.signin {
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
