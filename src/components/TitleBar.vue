<template lang="pug">
    Menu(mode="horizontal" :theme="theme" active-name="1")
        MenuItem(name="1")
            Icon(type="ios-paper")
            | {{ tex }} 
</template>
<script>
export default {
    name: 'TitleBar',
    data(){
        return {
            theme: 'dark',
            tex: `dashboard`   
        }
    }
    
}
</script>