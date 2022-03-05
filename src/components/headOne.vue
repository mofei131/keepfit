<template>
    <div class="page-head">
        <div @click="ckLeft" style="box-sizing: border-box;
    padding: 5px 10px 0 2px;
    width: 25px;
    height: 30px;">
            <img class="head-left"  src="../assets/image/fanhui.png">
        </div>
        <div>
            <span v-if="type==1" class="head-name-day">{{name}}</span>
            <span v-if="type==2" class="head-name-week">{{name}}</span>
            <span v-if="type==3"  class="head-name-day">{{name}}</span>            
        </div>
        <div  @click="ckRight" style="padding: 0.513rem;">
            <img class="head-right" src="../assets/image/history.png">
        </div>
    </div>
</template>
<script>
export default {
    name:"my-head",
    data() {
        return {
            
        }
    },
    props:["name","type"],
    methods: { 
        ckLeft(){
            this.$emit("ckLeft")
        },
        ckRight(){
            this.$emit("ckRight")
        }
    },created(){
       
    },mounted () {     
            
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.page-head{
    height:1.2rem;  
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 0.513rem;
}
.head-left{
    width:0.45rem;
}
.head-right{
    width:0.37rem;
}
.head-name-day{
    font-size:0.33rem;
    color:#4D4D4D;
}
.head-name-week{
    font-size:0.33rem;
    color:#4D4D4D;
}
.head-conten{
    width:0.22rem;
    margin-left:0.18rem; 
}
</style>