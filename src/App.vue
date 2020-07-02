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
#app {
    font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
