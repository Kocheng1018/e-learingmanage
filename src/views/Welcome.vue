<script>
import logo from '@/assets/logo.png';
export default {
    name: 'Welcome',
    components: {

    },
    data() {
        return{
            logo
        }
    }
}
</script>

<template lang="pug">
    #Welcome.Welcome
        .aa
            //- img(:src='logo')
            h1 管理後台
            router-view
</template>

<style lang='scss' scoped>
    .Welcome {
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
        min-height: 550px;
    }
    
</style>
