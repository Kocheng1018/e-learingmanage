<script>
export default {
    name: "LessonVideo",
    components: {

    },
    props: {
        url: {
            type: String,
            default: () => {
                console.log('url not found');
            }
        }
    },
    data(){
        return{
            newUrl: ''
        }
    },
    methods: {
        setUrl(videoCode){
            return `https://www.youtube.com/embed/${videoCode}`;
        },
        updateUrl(){
            if(this.newUrl === ''){
                alert('請貼入網址');
            }else{
                this.newUrl = this.newUrl.trim();
                var start = this.newUrl.indexOf('v=');
                var last = this.newUrl.indexOf('&');
                if(start === -1){
                    this.$Message['error']({
                        background: true,
                        content: '找不到影片！請確認網址是否正確'
                    });
                    this.newUrl = this.url;
                }else{
                    if(last === -1){
                        this.newUrl = this.newUrl.slice(start + 2);
                    }else{
                        this.newUrl = this.newUrl.slice(start + 2, last);
                    }
                }
                this.$emit('newUrl', this.newUrl);
                this.url = this.newUrl;
                this.newUrl = '';
            }
        },
        alert(){
            alert('???');
        }
    }
}
</script>
<template lang="pug">
.LessonVideo
    .urlset
        Input(placeholder="更新Youtube網址" v-model='newUrl')
        Button(type=`success` @click='updateUrl') 測試
    iframe( :src="setUrl(this.url)" frameborder="0" allowfullscreen)
    //- Button(type='error' @click='alert') 刪除
</template>
<style lang="scss" scoped>
.LessonVideo{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-items: center;
    margin-bottom: 10px;
    iframe {
        width: 60%;
        min-height: 400px;
    }
    .urlset{
        display: flex;
        align-items: center;
        width: 50%;
        margin-top: 1em;
        margin-bottom: 1em;
        Button{
            margin-left: 10px;
        }
    }
    Button{
        margin: 5px;
    }
}
</style>