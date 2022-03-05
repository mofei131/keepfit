<template>
    <div class="page-view">
        <my-head-one :name="`${util.dateFormat('','年月日')}`" @ckLeft="closePage" @ckRight="openPage('historyHeartRate')" :type='3'></my-head-one>
        <div :class="{'ring-1':stateIng,'ring-1_':!stateIng}">
            <div class="ring-view">
                <div class="ring-view-image">
                    <img v-show="stateIng" src="../../../assets/image/heartRate1.gif">
                    <img v-show="!stateIng" src="../../../assets/image/heartRate1_.png">
                </div>
                <div class="ring-view-1">{{value}}</div>
                <div class="ring-view-2">{{lang.sequence}}/{{lang.minutes}}</div> 
            </div>
        </div>
        <!-- <van-cell value="" is-link @click="openPage('setUp')">
            <template #title>
                <van-tag style="background-color: transparent;">
                <img  class="mubiaoset" src="../../../assets/image/set.png">
                </van-tag>
                <span class="custom-title">{{lang.heatTip1}}</span>
            </template>
        </van-cell> -->
        <div class="heart-view" v-for="(item,key,index) in dataList" :key="index">
            <div class="heart-view-1">{{key}}</div>
            <div class="heart-v">
                <div class="heart-view-2"  v-for="(it,i) in item" :key="i">
                    <div>
                        <span class="heart-view-span-1">{{it.frequency}}</span>
                        <span class="heart-view-span-2">{{lang.sequence}}/{{lang.minutes}}</span>
                    </div>
                    <span class="heart-view-span-3">{{it.createTime.slice(11,16)}}</span>
                </div>    
            </div>
        </div>
        <div v-if="Object.keys(dataList).length==0" class="heart-view"> 
            <van-empty :description="lang.shujunull"  :image="errorImage" /> </div>
        <div class="view-fixed">
            <div class="view-fixed-but-1" @click="add(1)">{{lang.heatTip3}} </div>
            <div class="view-fixed-line"></div>
            <div class="view-fixed-but-2" @click="add(2)">{{lang.heatTip4}} </div>
        </div>
    </div>
</template>
<script>

export default {
    name:"refurbish",
    components:{},
    data() {
        return {
            stateIng:false,
            resultList:[],
            dataList:{},
            value:"--",
            currentPage:1,
        }
    },
    methods: {       
        getDayData(data) { // 获取今日 测量的最新数据
        let that = this
            this.Http(this.api["HeartRateDay"], {
                currentPage: this.currentPage,
                dateString:data
            }).then(res => {
                if (res.data.code == "000") {
                    that.resultList = res.data.result.list
                    that.dataList = {}
                    if(that.resultList.length>0){
                        that.dataList[that.util.dateFormat("","月日")] = that.resultList    
                        that.value = that.resultList[0].frequency
                    }
                }
            });
        }, 
        add(index){
            this.value = "--"
            this.$toast.loading({
                duration: 3, // 持续展示 toast
                forbidClick: true,
                message: this.lang.wdTip8,
            });
            this.stateIng = true
            if(index==1){// 心率单次测量
                window.pushApp.heartRateSingle.func()
            }else{ // 心率连续测量
                window.pushApp.heartRateContinuation.func()
            }
        }
    },created(){
       
    },mounted () {  
        console.log('节点')
        console.log(this.util.dateFormat("","YYYY-MM-DD HH:mm:ss"))
        this.getDayData(this.util.dateFormat("","YYYY-MM-DD")) 
        let that =  this    
        window.pushApp.heartRateSingle.callback = (data)=>{
            that.value = data
            alert('接口调用之前')
            console.log("单次测量结果 : " + data)     
            // that.Http(that.api["HeartRateSave"], 
            //    [{
            //         "createTime": that.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
            //         "frequency":data
            //     }]
            // ).then(res => {
            //     alert('接口调用之后')
            //     that.$toast.clear()
            //     that.stateIng = false
            //     if(res.data.code == "000"){
            //         that.getDayData(that.util.dateFormat("","YYYY-MM-DD"))
            //     }
            // })
            // return -1
            this.getDayData(this.util.dateFormat("","YYYY-MM-DD")) 
            return data
        }

        window.pushApp.heartRateContinuation.callback = (data)=>{    
            that.value = data
            console.log("连续测量结果 : " + data)        
            // that.Http(that.api["HeartRateSave"], 
            //    [{
            //         "createTime": that.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
            //         "frequency":data               
            //     }]
            // ).then(res => {
            //     that.$toast.clear()
            //     that.stateIng = false
            //     if(res.data.code == "000"){
            //         that.getDayData(that.util.dateFormat("","YYYY-MM-DD"))
            //     }
            // })
             this.getDayData(this.util.dateFormat("","YYYY-MM-DD")) 
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.ring-1{
    width:4.92rem;
    height:4.92rem;
    background:url("../../../assets/image/heartRate.gif");
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ring-1_{
    width:4.92rem;
    height:4.92rem;
    background:url("../../../assets/image/heartRate_.png");
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ring-view-image{    
    box-sizing: border-box;
    text-align: center;
}
.ring-view-image img{
    width: 0.93rem;
}
.ring-view-1{
    color:#151515;
    font-size:0.8rem;
    text-align:center;
}
.ring-view-2{
    color:#808080;
    font-size:0.35rem;
    text-align:center;
}
.mubiaoset{
    width:0.53rem;
    margin-right: 0.2rem;
}
.van-cell{
    border-top: 0rem solid #E5E5E5 !important; 
    box-sizing: border-box;
    height: 1rem;
}
.heart-view{
    width:100%;
    box-sizing: border-box;
    height:calc(100% - 8.12rem);
    border-top: 0.18rem solid  #E6E6E6;
}
.van-cell:not(:last-child)::after{
    border-bottom: 0px solid #ebedf0;
}
.heart-view-1{
    padding: 0 16px 0.09rem 16px;
    line-height: 0.73rem;
    color:#252525;
    font-size:0.38rem;
    box-sizing: border-box;
}
.heart-v{
    height: calc(100% - 0.82rem);
    overflow-y: auto;
}
.heart-view-2{
    margin: 4px 16px 0 16px;
    line-height: 0.73rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom :1px solid #E5E5E5;
}
.heart-view-span-1{
    color:#252525;
    font-size:0.71rem;
}
.heart-view-span-2{
    color:#808080;
    font-size:0.27rem;
    margin-left:5px;
}
.heart-view-span-3{
    color:#808080;
    font-size:0.33rem;
}
.view-fixed{
    border-top: 0.025rem solid #a3a3a3;
    height: 1rem;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.view-fixed-but-1{
    width:calc(50% - 0.01rem);
    text-align:center;
    height:1rem;
    line-height:1rem; 
}   
.view-fixed-line{
    width:0.02rem;
    height:0.9rem;
    background:linear-gradient(0deg,rgba(255,255,255,1) 0%,rgba(163,163,163,1) 17%,rgba(163,163,163,1) 76%,rgba(255,255,255,1) 97%);
    text-align:center;
}
.view-fixed-but-2{
   width:calc(50% - 0.01rem);
   text-align:center;
   height:1rem;
   line-height:1rem; 
}
</style>