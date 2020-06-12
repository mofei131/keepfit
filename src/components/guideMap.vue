<template>
    <div class="windows-view" v-show="state">
        <div class="line-border-1"></div>
        <div class="text-1">点击这里选择日期</div>   
        <div class="line-border-2"></div>   
        <div class="text-2">点击这里日月周数据</div>    
        <div class="line-border-3"></div>   
        <div class="text-3">点击这里日月周数据</div>    
        <div class="text-4" >
            <p>左右滑动查看不同功能</p>
            <div @click="ck">我知道啦</div>
        </div>
    </div>
</template>
<script>
export default {
    components:{},
    data() {
        return {
           state:true,
        }
    },
    methods: { 
        ck(){
            this.state = false;
            localStorage.userIndex=1;
        }
    },created(){
       
    },mounted () {     
        
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.windows-view{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:rgba(0,0,0,0.5);
}
.line-border-1{
    width:1px;
    height:0.85rem;
    border-right:2px dashed #fff;
    position: absolute;
    left: 50%;
    top: 0.9rem;
}
.line-border-2{
    width:1px;
    height:2.5rem;
    border-right:2px dashed #fff;
    position: absolute;
    right : 0.7rem;
    top: 0.8rem;
}
.line-border-3{
    width:1px;
    height:1.2rem;
    border-right:2px dashed #fff;
    position: absolute;
    right :50%;
    top: 5.9rem;
}
.text-1,.text-3,.text-2,.text-4{
    color:#fff;
    font-size:0.4rem;
    display:inline-block;
}
.text-1{        
    position: absolute;
    left: calc(50% - 1.5rem);
    top: 1.8rem;
}
.text-2{        
    position: absolute;
    right : 20px;
    top: 3.4rem;
}
.text-3{        
    position: absolute;
    left: calc(50% - 1.75rem);
    top: 7.1rem;
}
.text-4{
    text-align:center;
    position: absolute;
    left: calc(50% - 1.75rem);
    bottom : 0.3rem;
}
.text-4 div{
    border: 1px solid #fff;
    border-radius:15px;
    line-height:0.85rem;
    margin:0.4rem 0; 
}
</style>