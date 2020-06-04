<template lang="pug">
  #app
    router-view
</template>

<script>
import SignIn from './views/memberSystem/SignIn';

export default {
    name: 'app',
    components: {
        SignIn
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
