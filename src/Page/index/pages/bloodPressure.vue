<template>
    <div class="page-view">
        <my-head-one :name="`${util.dateFormat('','年月日')}`" @ckLeft="closePage"  @ckRight="openPage('historyBloodPressure')" :type="3"></my-head-one>
        <div :class="{'ring-1':stateIng,'ring-1_':!stateIng}">           
            <div class="ring-view">
                <div class="ring-view-image">
                    <img v-show="stateIng" src="../../../assets/image/bloodPressure1.gif">
                    <img v-show="!stateIng" src="../../../assets/image/bloodPressure1.png">
                </div>
                <div class="ring-view-1">{{value}}</div>
                <div class="ring-view-2">{{lang.bloodTip1}}</div> 
            </div>           
        </div>
        <van-cell value="" is-link @click="openPage('bloodPressure_jz')">
            <template #title>
                <van-tag style="background-color: transparent;">
                <img  class="mubiaoset" src="../../../assets/image/set1.png">
                </van-tag>
                <span class="custom-title">{{lang.bloodTip2}}</span>
            </template>
        </van-cell>
        <div class="heart-view"  v-for="(item,key,index) in dataList" :key="index">
            <div class="heart-view-1">{{key}}</div>
            <div class="heart-view-code">
                <div class="heart-view-2"  v-for="(it,i) in item" :key="i">
                    <div>
                        <span class="heart-view-span-1">{{it.diastolicPressure}}/{{it.systolicPressure}}</span>
                        <span class="heart-view-span-2">{{lang.bloodTip1}}</span>
                    </div>
                    <span class="heart-view-span-3">{{it.createTime.slice(11,16)}}</span>
                </div>
            </div>           
        </div>
         <div v-if="Object.keys(dataList).length==0" class="heart-view"> <van-empty :description="lang.shujunull"  :image="errorImage" /> </div>
        <div class="view-fixed">
            <div class="view-fixed-but-1"  @click="add()">{{lang.bloodTip3}} </div>           
        </div>
    </div>
</template>
<script>
export default {
    components:{},
    data() {
        return {
           stateIng:false,
           resultList:[],
           dataList:{},
           diastolicPressure:"00",
           systolicPressure:"00",
           value:"--",
           currentPage:1,
        }
    },
    methods: { 
        getDayData(data) { // 获取今日 测量的最新数据
            this.Http(this.api["BloodPressureDay"], {
                currentPage: this.currentPage,
                dateString:data
            }).then(res => {
                if (res.data.code == "000") {
                    this.resultList = res.data.result.list
                    this.dataList = {}
                    if(this.resultList.length>0){
                        this.dataList[this.util.dateFormat("","月日")] = this.resultList                 
                        this.value = this.resultList[0].diastolicPressure+"/"+this.resultList[0].systolicPressure
                    }
                }
            });
        },
        add(){
            this.value = "--";
            this.$toast.loading({
                duration: 3, // 持续展示 toast
                forbidClick: true,
                message: this.lang.wdTip8,
            });
            this.stateIng = true
            window.pushApp.bloodPressureSingle.func()
            
        },  
    },created(){
       
    },mounted () {   
        this.getDayData(this.util.dateFormat("","YYYY-MM-DD"))
        let that =  this
        window.pushApp.bloodPressureSingle.callback = (data)=>{
             console.log("血压测量结果 : " + data)
            if(data.indexOf(",")!=-1){
                that.diastolicPressure = data.split(",")[0]
                that.systolicPressure = data.split(",")[1]
                that.value = data.split(",")[0] + "/" + data.split(",")[1]
                //刷新数据
                this.getDayData(this.util.dateFormat("","YYYY-MM-DD"))
                // that.Http(that.api["BloodPressureSave"], 
                // [{
                //         "createTime": that.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
                //         "diastolicPressure":data.split(",")[0],
                //         "systolicPressure":data.split(",")[1],    
                //     }]
                // ).then(res => {
                //     that.$toast.clear()
                //     that.stateIng = false
                //     if(res.data.code == "000"){
                //         that.getDayData(that.util.dateFormat("","YYYY-MM-DD"))
                //     }
                // })
            }else{
                that.stateIng = false
                that.$dialog.alert({
                    title: data,
                    message: "数据格式 'diastolicPressure,systolicPressure' 如 '120,60' ",
                })
            }
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.ring-1{
    width:4.92rem;
    height:4.92rem;
    background:url("../../../assets/image/bloodPressure.gif");
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ring-1_{
    width:4.92rem;
    height:4.92rem;
    background:url("../../../assets/image/bloodPressure_.png");
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
    width: 0.63rem;
}
.ring-view-1{
    color:#151515;
    font-size:0.75rem;
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
    height: 0.95rem;
}
.heart-view{
    width:100%;
    height:calc(100% - 8.07rem);
    border-top: 0.18rem solid  #E6E6E6;
    box-sizing:border-box;
}
.heart-view-code{
    height:calc(100% - 0.82rem);
    width:100%;
    overflow-y:scroll;
}
.van-cell:not(:last-child)::after{
    border-bottom: 0px solid #ebedf0;
}
.heart-view-1{
    padding: 0 16px 0.09rem 16px;    
    line-height: 0.73rem;
    color:#252525;
    font-size:0.38rem;
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
    width:100% ;
    text-align:center;
    height:1rem;
    line-height:1rem; 
}  
</style>