<template>
  <div class="page-view">   
    <div class="page-head">
        <div @click="closePage" style="box-sizing: border-box;
            padding: 5px 10px 0 2px;
            width: 25px;
            height: 30px;">
            <img  class="head-left" src="../../../assets/image/fanhui.png">
        </div>
        <div>
            <span class="head-name-day">{{lang.zonglucheng}}</span>
        </div>  
        <div  style="padding: 0.513rem;">
        </div>   
    </div>
    <p style="text-align: center;font-weight: 450;font-size: 0.6rem;"><label>{{total}}</label></p>
    <p style="text-align: center;font-size: 0.3rem;color:#666666;line-height:35px;margin-bottom: 10px;"><label>{{lang.distanceUnit}}</label></p>
   

    <van-collapse @change="change" class="item-cell" v-model="activeName" accordion>
      <van-collapse-item 
        v-for="(items,key,index) in dataList"
        :key="index"
        :title="key"
        :name="key"
      >
        <div v-for="(itemV,key) in items" :key="key">
        <div class="item-code" v-if="[1,2,3].includes(itemV.type)" >
            <img class="img-item" v-if="itemV.type==1" src="../../../assets/image/type-1.png">
            <img class="img-item" v-if="itemV.type==2" src="../../../assets/image/type-2.png">
            <img class="img-item" v-if="itemV.type==3" src="../../../assets/image/type-3.png">
            <img class="img-item" v-if="itemV.type==4" src="../../../assets/image/type-4.png">
            <img class="img-item" v-if="itemV.type==5" src="../../../assets/image/type-5.png">
            <img class="img-item" v-if="itemV.type==6" src="../../../assets/image/type-6.png">
            <img class="img-item" v-if="itemV.type==7" src="../../../assets/image/type-7.png">
            <img class="img-item" v-if="itemV.type==8" src="../../../assets/image/type-8.png">
            <img class="img-item" v-if="itemV.type==9" src="../../../assets/image/type-9.png">
               <div class="item-view" style=" width:13%;">
                   <div class="label-1">{{itemV.distance}}</div>
                   <div class="label-2">{{lang.distanceUnit}}</div>
               </div>
               <div class="item-view" style=" width:18%;">
                   <div class="label-1">{{Math.ceil(itemV.duration/60)}}</div>
                   <div class="label-2">{{lang.motionTip6}}</div>
               </div>
               <div class="item-view" style=" width:16%;">
                   <div class="label-1">{{itemV.burnCalorie}}</div>
                   <div class="label-2">{{lang.heatQuantity}}</div>
               </div>
               <div class="item-view" style=" width:30%;">
                   <div class="label-1">{{itemV.minkm}}</div>
                   <div class="label-2">{{lang.motionTip7}}</div>
               </div>
               <div class="item-view" style=" width:16%;">
                   <div class="label-2"> {{getTimes_(itemV.createTime)}}</div>
                   <div class="label-1" style="color:#808080;font-weight: 400;">{{getTimes_1(itemV.createTime)}}</div>
               </div>
        </div>
        <div class="item-code" v-else >
            <img class="img-item" v-if="itemV.type==1" src="../../../assets/image/type-1.png">
            <img class="img-item" v-if="itemV.type==2" src="../../../assets/image/type-2.png">
            <img class="img-item" v-if="itemV.type==3" src="../../../assets/image/type-3.png">
            <img class="img-item" v-if="itemV.type==4" src="../../../assets/image/type-4.png">
            <img class="img-item" v-if="itemV.type==5" src="../../../assets/image/type-5.png">
            <img class="img-item" v-if="itemV.type==6" src="../../../assets/image/type-6.png">
            <img class="img-item" v-if="itemV.type==7" src="../../../assets/image/type-7.png">
            <img class="img-item" v-if="itemV.type==8" src="../../../assets/image/type-8.png">
            <img class="img-item" v-if="itemV.type==9" src="../../../assets/image/type-9.png">         
               <div class="item-view" style=" width:22%;">
                   <div class="label-1">{{Math.ceil(itemV.duration/60)}}</div>
                   <div class="label-2">{{lang.motionTip6}}</div>
               </div>
               <div class="item-view" style=" width:25%;padding-left: 35px;">
                   <div class="label-1">{{itemV.burnCalorie}}</div>
                   <div class="label-2">{{lang.heatQuantity}}</div>
               </div>
               <div class="item-view" style=" width:24%;">
                   <div class="label-1">{{itemV.heartRate}}</div>
                   <div class="label-2">{{lang.ecgTip2}}</div>
               </div>
               <div class="item-view" style=" width:16%;">
                   <div class="label-2">{{getTimes_(itemV.createTime)}}</div>
                   <div class="label-1" style="color:#808080;font-weight: 400;">{{getTimes_1(itemV.createTime)}}</div>
               </div>
        </div>
        </div>
        <div v-if="items.length==0"> <van-empty :description="lang.shujunull"  :image="errorImage" /> </div> 
      </van-collapse-item>   
    </van-collapse>
    <div v-if="dataList==null"> <van-empty :description="lang.shujunull"  :image="errorImage" /> </div> 
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      index: 1,
      activeName: "",
      showState: false,
      titleName: "",
      type: 1,
      currentPage: 1,
      pageSize: 50,
      resultList: [],
      dataList: null,
      total:0,
    };
  },
  methods: {
    getTimes_(date){
        let str = `${date}`* 1000 ;
        return this.util.dateFormat(str, "MM-DD").replace("-","/");
    },
    getTimes_1(date){
        let str = `${date}`* 1000 ;
        return this.util.dateFormat(str, "HH:mm");
    },
    getData(month){
        this.Http(this.api["SportMonth"],{dateString:month})
        .then(res => { 
            this.dataList[month.replace("-","年")+"月"] = res.data.result.list     
            this.activeName = `${month.replace("-","年")+"月"}`        
         })
    },
    getTotal(){
        this.Http(this.api["SportQueryTotal"],{dateString:""})
        .then(res => { 
            this.total = res.data.result.totalDistance??0;    
         })
    },
    getAllMonth(){
        this.Http(this.api["SportQueryMonth"],{})
        .then(res => { 
            if(res.data.result.length>0){
                this.dataList = new Object();
            }
            for(let i=0;i<res.data.result.length;i++){                             
                let str = `${res.data.result[i].slice(0,4)}年${res.data.result[i].slice(4,6)}月`                
                this.dataList[str] = []
            } 
            if(res.data.result.length>0){
                this.getData(res.data.result[0].slice(0,4)+"-"+res.data.result[0].slice(4,6)) 
            }
           
         })
    },
    select(name, index) {
        this.index = index;
        this.titleName = name + "数据";
        this.showState = false;
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"),0);
    },
    add(){
        let addFn = (val)=>{
            this.Http(this.api["SaveSport"],{
            //  "createTime": this.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
                "burnCalorie":Number( "3" + (Math.random()*10).toFixed(1)),    
                "distance":Number( "1" + (Math.random()*10).toFixed(1)),    
                "duration":Number((Math.random()*1000).toFixed(0)),
                "heartRate":Number((Math.random()*100).toFixed(0)),
                "minkm":Number((Math.random()*10).toFixed(0)),
                "stepNum":Number((Math.random()*1000).toFixed(0)),
                "type":val,
            //  1-健步、2-跑步、3-骑行、4-跑步机、5-篮球、6-足球、7-网球、8-登山、9-瑜伽
            }
            
        ).then(res => { console.log(res) })
        }
        addFn(1)
        addFn(2)
        addFn(3)
        addFn(4)
        addFn(5)
        addFn(6)
        addFn(7)
        addFn(8)
        addFn(9)
    },
    change(val) {
      if(val){
          let str = val.replace("年","-").replace("月","")
        this.getData(str)
      }
    },
    getDayData(opt_date, state) {
      this.Http(this.api["SportDay"], {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        dateString: opt_date,
        type:this.index,
      }).then(res => {
        if (res.data.code == "000") {
            this.activeName = opt_date;
            this.resultList = res.data.result.list;
            this.dataList = new Object();
            if (state == 0) {
                let week = this.util.MonthDate();
                for (let i = 0; i < week.length; i++) {
                this.dataList[week[i]] = {data:[],obj:{}};
                }
            }
            this.dataList[opt_date] = {data:this.resultList,obj: res.data.result.obj}
            this.dataList = JSON.parse(JSON.stringify(this.dataList));
            console.log(this.dataList)
      }
    })},
    clickConten() {
      this.showState = true;
    }
  },
  created() {},
  mounted() {
    this.titleName = this.lang.motionTip1;
    this.getAllMonth();
    this.getTotal()
   // this.add()
  }
};
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
.head-left-1{
    width:0.31rem;
}
.head-right{
    width:0.433rem;
}
.head-name{
    color:#161616;
    font-size:0.4rem;
    font-weight:500;
}
.head-name-day{
    font-size:0.36rem;
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
.item-cell>>>.van-cell__title {
  color: #151515;
  font-size: 0.37rem;
  font-weight: 500;
}

.item-cell >>> .van-cell {
  border-top: 0 solid #FFFFFF !important;
}

.item-li {
  display: flex;
  margin: 0.28rem 0;
}

.item-li-left {
  width: calc(50% - 0.01rem);
}

.item-li-left span, .item-li-right span {
  display: block;
  text-align: center;
}

.item-li-right {
  width: calc(50% - 0.01rem);
}

.item-li-center {
  width: 0.02rem;
  background: #E5E5E5;
}

.span-1 {
  font-size: 0.34rem;
}

.span-2 {
  color: #151515;
  font-size: 0.69rem;
  font-weight: 500;
}

.item-cell-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.85rem;
  padding: 0.26rem 0;
  border-bottom: 0.025rem solid #E5E5E5;
}

.item-cell-1 img {
  width: 0.62rem;
}

.item-cell-1 span {
  display: block;
}

.item-cell-span-1 {
  color: #151515;
  font-size: 0.39rem;
  font-weight: 500;
}

.item-cell-span-2 {
  color: #808080;
  font-size: 0.17rem;
}

.item-cell-span-a {
  color: #808080;
  font-size: 0.2rem;
}

.item-cell-span-b {
  color: #808080;
  font-size: 0.33rem;
}

.item-cell-1 div {
  position: relative;
}

.line {
  width: 0.015rem;
  height: 100%;
  background: #E5E5E5;
}
.img-item{
    width:26px;
    margin: 0 4px;
}
.item-code{
    display: flex;    
    align-items: center;
    padding: 10px 0;
    border-bottom:1px solid  #E5E5E5;
}
.label-1{
    color:#151515;
    font-size:0.35rem;
    font-weight:bold;
}
.label-2{
    color:#808080;
    font-size:0.18rem;    
}
.item-view{
    text-align:left;
}

</style>