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
            img(:src='logo')
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
