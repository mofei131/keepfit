<template>
    <van-overlay :show="showState" @click="showState = false">
        <div class="wrapper" @click.stop>
            <div class="widows">
                <div class="list-li">
                    <div @click="select('日',1)" :class="{'action':index_==1}">{{lang.day}}</div>
                    <div @click="select('周',2)" :class="{'action':index_==2}">{{lang.week}}</div>
                    <div @click="select('月',3)" :class="{'action':index_==3}">{{lang.month}}</div>                       
                </div>
            </div>
        </div>
    </van-overlay>
</template>
<script>
export default {
    components:{},
    data() {
        return {
           showState:false,
           index_:""       
        }
    },
    props:["index"],
    methods: { 
        select(str,index){          
            this.close()
            this.index_ = index
            this.$emit("select",index)
        },
        open(){
            this.showState = true
        },
        close(){
            this.showState = false
        },
    },created(){
       
    },mounted () {     
        this.index_ = this.index
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.list-li {
  width: 1.2rem !important;
  transform: translate(0, 0) !important;
  left: calc(100% - 1.6rem) !important;
}
</style>