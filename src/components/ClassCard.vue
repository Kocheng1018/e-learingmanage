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
        classDetail: {
            type: Object,
            default: null
        }
    }
}
</script>
<template lang="pug">
    Card.card
            .imgframe
                img(v-if='this.classDetail.imgUrl != "" ' :src="this.classDetail.imgUrl" )
                img(v-else :src="defaultClass") 
            .title {{ this.classDetail.topic }} 
            .detail
                | 課程數：{{ this.classDetail.sectionNum }} 個
                br
                | 開放狀態： {{ this.classDetail.type == 0 ? "公開" : "非公開" }}
                br
                | 是否啟動： {{ this.classDetail.isOpen == 0 ? "關閉中" : "開啟中" }}
</template>
<style lang="scss" scoped>
.card{
    display: flex;
    justify-content: center;
    width: 200px;
    // height: 250px;
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