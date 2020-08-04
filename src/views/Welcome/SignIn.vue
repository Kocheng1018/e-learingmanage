<script>
import { signIn } from '@/apis/course.js';
export default {
    name: "SignIn",
    components: {
        
    },
    data() {
        return {
            signIn: {
                account: '',
                passwd: ''
            },
            ruleInline: {
                    account: [
                        { required: true, message: '請輸入帳號', trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true, message: '請輸入密碼', trigger: 'blur' }
                    ]
                }


        };
    },
    methods: {
        toSignUP() {
            this.$router.push('signup');
        },
        loginStage(rules) {
            if (this.signIn.account == 1){
                this.$router.push('/backstage/classlist');
            }
            this.$refs[rules].validate((req) => {
                if (req) {
                    signIn({
                        account: signIn.account,
                        password: signIn.passwd
                    }).then((req) => {
                        console.log(req.status);
                        if (req.status === 200){
                            this.$Message.success('登入成功');
                        }else{
                            this.$Message.error('登入失敗 請確認帳號密碼是否正確');
                        }
                    })
                }else {
                    this.$Message.error("請輸入帳號或密碼");
                }
            });
        }
    }
};
</script>
<template lang="pug">
    #SingIn.signin
        Card.signinCard
            h1 登入
            Form(ref='signIn' :model='signIn' :rules='ruleInline')
                FormItem(label='Account' prop='account')
                    Input(type='text' placeholder='請輸入帳號' v-model='signIn.account')
                FormItem(label='Password' prop='passwd')
                    Input(type='password' placeholder='請輸入密碼' v-model='signIn.passwd')
                FormItem
                    Button(type='primary' @click="loginStage('signIn')") 登入
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
