<template lang="pug">
.bar
    .img
        img(:src='logo')
    .menu
        Menu(mode='horizontal' @on-select='change' active-name='1')
            MenuItem(name='1') 目前課程
</template>
<style lang="scss" scoped>
.bar{
    .img {
        background-color: white;
        float: left;
        width: 20%;
        img{
            height: 70px;
        }
    }
    .menu {
        float: left;
        width: 70%;
        height: 70px;
    }
}
</style>
<script>
import logo from '@/assets/elearningIcon.png'
export default {
    name: 'TitleBar',
    components:{

    },
    data(){
        return {
            logo
        }
    },
    methods: {
        change(name){
            switch(name){
                case `1`:
                    this.topath(`/backstage/classlist`);
                    break;
                case `2`:
                    this.topath();
                    break;
                default:
            }
        },
        topath(path){
            this.$router.push({path});
        }
    }
}
</script>