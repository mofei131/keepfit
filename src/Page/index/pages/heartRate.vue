<template>
    <div class="page-view">
        <my-head-one :name="`${util.dateFormat('','年月日')}`" @ckLeft="closePage" @ckRight="openPage('historyHeartRate')" :type=3></my-head-one>
        <div class="ring-1">
            <div class="ring-view">
                <div class="ring-view-image"><img src="../../../assets/image/heartRate1.gif"></div>
                <div class="ring-view-1">{{value}}</div>
                <div class="ring-view-2">{{lang.sequence}}/{{lang.minutes}}</div> 
            </div>
        </div>
        <van-cell value="" is-link @click="openPage('setUp')">
            <template #title>
                <van-tag style="background-color: transparent;">
                <img  class="mubiaoset" src="../../../assets/image/set.png">
                </van-tag>
                <span class="custom-title">{{lang.heatTip1}}</span>
            </template>
        </van-cell>
        <div class="heart-view" v-for="(item,key,index) in dataList" :key="index">
            <div class="heart-view-1">{{key}}</div>
            <div class="heart-v">
                <div class="heart-view-2"  v-for="(it,i) in item" :key="i">
                    <div>
                        <span class="heart-view-span-1">{{it.frequency}}</span>
                        <span class="heart-view-span-2">{{lang.sequence}}/{{lang.minutes}}</span>
                    </div>
                    <span class="heart-view-span-3">{{util.dateFormat(it.createTime,"HH:mm")}}</span>
                </div>    
            </div>
        </div>
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
            resultList:[],
            dataList:null,
            value:"--",
            currentPage:1,
        }
    },
    methods: {       
        getDayData(data) { // 获取今日 测量的最新数据
            this.Http(this.api["HeartRateDay"], {
                currentPage: this.currentPage,
                dateString:data
            }).then(res => {
                if (res.data.code == "000") {
                    this.resultList = res.data.result.list
                    this.dataList = new Object()
                    if(this.resultList.length>0){
                        this.dataList[this.util.dateFormat("","月日")] = this.resultList    

                        this.value = this.resultList[0].frequency
                    }
                }
            });
        }, 
        add(index){
            this.$toast.loading({
                duration: 3, // 持续展示 toast
                forbidClick: true,
                message: this.lang.wdTip8,
            });
            /*
            this.Http(this.api["HeartRateSave"], 
               [{
                    "createTime": this.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
                    "frequency":Number( "3" + (Math.random()*10).toFixed(1))                
                }]
            ).then(res => {
                this.$toast.clear()
                if(res.data.code == "000")
                this.getDayData(this.util.dateFormat("","YYYY-MM-DD"))
               
            })
            if(index==2){
                setTimeout(()=>{
                    this.add(1)
                },5000)
            }
            */
            if(index==1){// 心率单次测量
                window.pushApp.heartRateSingle.func()
            }else{ // 心率连续测量
                window.pushApp.heartRateContinuation.func()
            }
        }
    },created(){
       
    },mounted () {     
        this.getDayData(this.util.dateFormat("","YYYY-MM-DD")) 
        let that =  this
        window.pushApp.heartRateSingle.callback = (data)=>{
            that.$dialog.alert({
                title: '心率单次测量结果',
                message: data,
            })
        }
        window.pushApp.heartRateContinuation.callback = (data)=>{
            that.$dialog.alert({
                title: '心率连续测量结果',
                message: data,
            })
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