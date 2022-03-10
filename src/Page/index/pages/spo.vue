<template>
    <div class="page-view">
        <my-head-one :name="`${util.dateFormat('','年月日')}`" @ckLeft="closePage" @ckRight="openPage('historySpo')" :type="3"></my-head-one>
        <div :class="{'ring-1':stateIng,'ring-1_':!stateIng}">
            <div class="ring-2">
                <div class="ring-view">
                    <div class="ring-view-image">
                        <img v-show="stateIng" src="../../../assets/image/spo1.gif">
                        <img v-show="!stateIng" src="../../../assets/image/spo1_.png">
                    </div>
                    <div class="ring-view-1">{{value}}</div>
                    <div class="ring-view-2">{{lang.spoTip1}}</div> 
                </div>
            </div>
        </div>   
        <div class="page-view-1">
            <div class="cart-1">
               <div class="cart-1-a"><span>{{maxSaturate}}</span>{{lang.spoTip3}}</div>
               <div class="cart-1-b">{{lang.spoTip2}}</div>
            </div>
            <div class="cart-2"></div>
            <div class="cart-3">
                <div class="cart-1-a"><span>{{minSaturate}}</span>{{lang.spoTip3}}</div>
               <div class="cart-1-b">{{lang.spoTip4}}</div>
            </div>
        </div>     
        <div class="heart-view" v-for="(item,key,index) in dataList" :key="index" >
            <div class="heart-view-1">{{key}}</div>
            <div class="heart-v">
                <div class="heart-view-2" v-for="(it,i) in item" :key="i">
                    <div>
                        <span class="heart-view-span-1">{{it.saturate}}</span>
                        <span class="heart-view-span-2">{{lang.spoTip1}}</span>
                    </div>
                    <span class="heart-view-span-3">{{it.createTime.slice(11,16)}}</span>
                </div>      
            </div>     
        </div>
         <div v-if="dataList&&Object.keys(dataList).length==0" class="heart-view"> <van-empty description="暂 无 数 据 生 成"  :image="errorImage" /></div>
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
           dataList:null,   
           maxSaturate:"--",
           minSaturate:"--",
           value:"--",
           currentPage:1,
        }
    },
    methods: { 
		
		
		// {
		// 			   "03-09":
		// 			   [
		// 				   {"saturate":100,"createTime":"2022-03-09"},
		// 				   {"saturate":100,"createTime":"2022-03-09"},
		// 				],
		// 			}
		
        getDayData(data) { // 获取今日 测量的最新数据
		// this.setData(100);
            this.Http(this.api["BloodOxygenDay"], {
                currentPage: this.currentPage,
                dateString:data
            }).then(res => {
                if (res.data.code == "000") {
                    this.maxSaturate = res.data.result.obj.maxSaturate||"--"
                    this.minSaturate = res.data.result.obj.minSaturate||"--"
                    this.resultList = res.data.result.list
                    if(this.resultList.length>0){
						this.dataList = new Object()
                        this.dataList[this.util.dateFormat("","月日")] = this.resultList                 
                        this.value = this.resultList[0].saturate
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
            
            /*
            this.Http(this.api["BloodOxygenSave"], 
               [{
                    "createTime": this.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
                    "saturate":Number( "9" + (Math.random().toFixed(1)*10))
                }]
            ).then(res => {
                this.$toast.clear()
                if(res.data.code == "000")
                 this.getDayData(this.util.dateFormat("","YYYY-MM-DD"))
            })*/
            window.pushApp.spoSingle.func()
            
        },
        ckRight(){
           this.$router.push({ path: "/historySpo" });
        },
		setData(num){
			var arrayIndex = this.util.dateFormat("","月日");
			var list = [];
			console.log(this.dataList)
			if(this.dataList == null) this.dataList = new Object();
			if(this.dataList != null && this.dataList.hasOwnProperty(arrayIndex)) {
				list = this.dataList[arrayIndex];
			}
			list.unshift({ 
				"createTime": this.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
				"saturate":num
			})
			
			var maxSaturate = this.maxSaturate == '--' ? 0 : this.maxSaturate;
			var minSaturate = this.minSaturate == '--' ? 9999 : this.minSaturate;
			
			for(var i in list) {
				var item = list[i];
				console.log("xxx",item.saturate)
				console.log("xxx1",this.maxSaturate)
				
				if(parseInt(item.saturate) > maxSaturate) {
					this.maxSaturate = item.saturate;
				}
				if(parseInt(item.saturate) < minSaturate) {
					this.minSaturate = item.saturate;
				}
			}
			console.log(333);
			this.dataList[arrayIndex] = list;
			this.value = list[list.length-1].saturate;
			
		}
		
    },created(){
       
    },mounted () {   
		// this.setData(110);
        this.getDayData(this.util.dateFormat("","YYYY-MM-DD"))     
		
		
		
        let that =  this        
        window.pushApp.spoSingle.callback = (data)=>{   
			// that.dataList = data;
            console.log("血痒测量结果 : " + data)      
            // that.getDayData(that.util.dateFormat("","YYYY-MM-DD"))     
			that.setData(data);
            // that.Http(that.api["BloodOxygenSave"], 
            //    [{
            //         "createTime": that.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
            //         "saturate":data
            //     }]
            // ).then(res => {
            //     that.$toast.clear()
            //     that.stateIng = false
            //     if(res.data.code == "000"){
            //         that.getDayData(that.util.dateFormat("","YYYY-MM-DD"))
            //     }
            // })
        }       
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.ring-1{
    width:4.92rem;
    height:4.92rem;
    background:url("../../../assets/image/spo.gif");
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ring-1_{
    width:4.92rem;
    height:4.92rem;
    background:url("../../../assets/image/spo_.png");
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
    width: 0.49rem;
}
.ring-view{
    position: relative;
    top: -0.1rem;
}
.ring-view-1{
    color:#151515;
    font-size:0.8rem;
    text-align:center;
    line-height: 0.9rem;
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
.heart-v{
    height: calc(100% - 0.82rem);
    overflow-y: auto;
}
.van-cell{
    border-top: 0rem solid #E5E5E5 !important; 
    margin: 10px 0;
}
.heart-view{
    width:100%;
    border-top: 0.18rem solid  #E6E6E6;
    height:calc(100% - 8.87rem);
    box-sizing:border-box;
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
.page-view-1{
    height:1.75rem;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
}
.cart-2{
    width:0.02rem;
    height:calc(100% - 0.4rem);
    background:linear-gradient(0deg,rgba(153,153,153,0) 0%,rgba(153,153,153,1) 14%,rgba(153,153,153,1) 76%,rgba(153,153,153,0) 100%);
}
.cart-1 , .cart-3{
    width:calc(50% - 0.01rem);
    text-align:center;
}
.cart-1-a{
    color:#666666;
    font-size:0.26rem;
}
.cart-1-a span{
    color:#343434;
    font-size:0.76rem;
    padding:0 0.07rem;
}
.cart-1-b{
    color:#343434;
    font-size:0.27rem;
}
</style>