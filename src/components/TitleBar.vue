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
    }
    
}
</script>
<template lang="pug">
#TitleBar
    .bar
        .logo
            img(:src='logo')
        .menu
            Menu(mode='horizontal' )
                MenuItem(name='1') 目前課程
                MenuItem(name='2') ???
        .createClass
            .Icon
                Icon(type='md-add' size='32')
            .content 新增

</template>
<style lang="scss" scoped>
.bar{
    position: relative;
    top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    .logo {
        background-color: rosybrown;
        flex: 10;
        img{
            max-width: 64px;
        }
    }
    .menu {
        background-color: red;
        flex: 100;
    }
    .createClass {
        background-color: aqua;
        flex: 25;
        max-width: 150px;
        display: flex;
        .Icon {
            text-align: right;
            margin: auto;
            flex: 1;
        }
        .content {
            flex: 1;
            margin: auto;
            text-align: left;
        }

    }
}
</style>