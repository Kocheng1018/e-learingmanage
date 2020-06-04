<template lang="pug">
    #SingIn.SignIn
        TitleBar
        h1 signinpage
        ul
            li(v-for="(post, index) in posts") {{ post }}
</template>
<script>
import TitleBar from "@/components/TitleBar.vue";
import { postData } from '@/apis/course.js';

export default {
    name: "SignIn",
    components: {
        TitleBar
    },
    data() {
        return {
            posts: []
        };
    },
    mounted() {
        // axios
        //     .get('https://jsonplaceholder.typicode.com/posts')
        //     .then((res) => {
        //         this.posts = res.data;
        //     })

        // getDatta().then((res) => {
        //     this.posts = res.data;
        // })

        postData({
            title: 'foo',
            userId: 1,
            body: 'bar'
        }).then(res => {
            this.posts = res.data;
        });
    }
};
</script>

<style scoped>
.aaa {
    text-align: left;
}
</style>
