<script>
import defaultClass from '@/assets/defaultClass.png';
export default {
    name: `ClassCard`,
    data(){
        return {
            defaultClass
        };
    },
    props: {
        title: {
            type: String,
            default: () => ``
        },
        code: {
            type: String,
            default: () => ``
        },
        topic: {
            type: String,
            default: () => ``
        },
        time: {
            type: String,
            default: () => ``
        },
        progressRate: {
            type: String,
            default: () => ``
        },
        img: {
            type: String,
            default: () => ``
        }
    }
}
</script>
<template lang="pug">
    Card.card
            .imgframe
                img(v-if='this.img != "" ' :src="this.img" )
                img(v-else :src="defaultClass") 
            .title {{this.title}} 
            .detail
                | 主題：{{this.topic}}
                br
                | 時間（小時）：{{this.time}}
</template>
<style lang="scss" scoped>
.card{
    display: flex;
    justify-content: center;
    width: 200px;
    height: 300px;
    .imgframe {
        height: 150px;
        width: 150px;
        img{
            float: right;
            max-width: 150px;
            max-width: 150px;
        }
        
    }
    .title{
        text-align: left;
        font-size: 28px;
    }
    .detail{
        text-align: left;
    }
}
</style>