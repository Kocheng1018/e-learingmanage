<template lang="pug">
  #app
    router-view
</template>

<script>
import Welcome from './views/Welcome.vue';

export default {
    name: 'app',
    components: {
        Welcome
    }
};
</script>

<style>
#app, html, body{
    font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* background-color: rgb(250, 250,250); */
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
}
</style>
