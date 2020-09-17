<script>
import logo from '@/assets/logo.png'
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
    position: relative;
    vertical-align: left;
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
    .createClass{
        display: flex;
        justify-content: center;
        justify-items: center;
        // background-color: salmon;
        float: left;
        height: 70px;
        width: 10%;
        Button{
            margin: auto;
        }
    }
}
// .bar{
//     position: relative;
//     height: 70px;
//     left:0px;
//     display: inline-flex;
//     .logo {
//         // background-color: rosybrown;
//         flex: 10;
//         img{
//             max-width: 64px;
//         }
//     }
//     .menu {
//         // background-color: red;
//         flex: 70;
//     }
//     .createClass {
//         background-color: aqua;
//         max-width: 150px;
//         flex: 20;
//         .createBtn {
//             margin: auto;
//             max-width: 150px;
//             display: flex;
//         }
//         .Icon {
//             text-align: right;
//             margin: auto;
//             flex: 1;
//         }
//         .content {
//             flex: 1;
//             margin: auto;
//             text-align: left;
//         }

//     }
// }
</style>