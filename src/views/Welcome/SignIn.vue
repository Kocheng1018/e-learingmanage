<script>
import md5 from 'js-md5';
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
            this.$router.push('signup');
        },
        loginStage() {
            var hasPwd = md5(this.signIn.passwd);
            console.log(`${this.signIn.passwd} = ${hasPwd}`);
            this.$router.push({name: `backstage`});

        }
    }
};
</script>
<template lang="pug">
    #SingIn.signin
        Card.signinCard
            h1 登入
            Form(ref='signIn' :model='signIn' @submit.native.prevent="loginStage")
                FormItem(label='Account')
                    Input(type='text' placeholder='請輸入帳號' v-model='signIn.account')
                FormItem(label='Password')
                    Input(type='password' placeholder='請輸入密碼' v-model='signIn.passwd')
                FormItem
                    Button(type='primary' html-type='submit') 登入
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
