<template>
  <div class="page-view">  
     <my-head  v-if="timeList[0]" :name="timeList[0].slice(0, 8)"  @ckLeft="closePage"  @clickConten="clickConten" @ckRight="ckRight" :type="1"></my-head>
    <div class="page-time">
      <span v-if="timeList[value]">{{timeList[value].slice(5, 11)}}</span>
    </div>
    <div class="page-step">
      <span class="page-step-1">{{resultList.length>0?resultList[value]:"--"}}</span>
      <span class="page-step-2">{{lang.step}}</span>
    </div>
    <div class="img-view">
      <div class="img-echart">
        <div class="img-left-icon">
          <van-icon style="height:60px;line-height: 60px;" @click="lessValue" color="#B3B3B3" name="arrow-left" />
        </div>
        <div class="img-code-echart">
          <div id="code-echart-month"></div>
        </div>
        <div class="img-right-icon">
          <van-icon style="height:60px;line-height: 60px;" @click="addValue" color="#B3B3B3" name="arrow" />
        </div>
      </div>
      <div class="slider-view">
         <div class="laebl-view">
          <span  v-for="(item,i) in timeList" v-show="[0,6,14,21,timeList.length-1].includes(i)" :key="i" :class="{'slider-action':value==i}">{{item.slice(5, 10).replace("月","/")}}</span>
        </div>
        <div style="width:100%;background: rgb(251, 155, 6);height: 2px;" class="van-slider_diy">
             <van-slider style="width:80%;margin: 0 auto;" v-model="value" :max=max min=0 :step=1 inactive-color="#FB9B06" active-color="#FB9B06" />
        </div>
      </div>
    </div>
    <div class="wc-view">
      <div class="wc-view-1">
        <div class="wc-view-b">{{dataObj?dataObj.maxStep:"-"}}</div>
        <div class="wc-view-a">{{lang.tip8}}</div>
      </div>
      <div class="wc-view-2"></div>
      <div class="wc-view-3">
        <div class="wc-view-b">{{dataObj?dataObj.reachNum:"-"}}</div>
        <div class="wc-view-a">{{lang.tip9}}</div>
      </div>
    </div>
    <div class="list-view">
        <div class="list-title">
            <div class="item-1"></div>
            <div class="item-2">{{lang.cumulative}}</div>
            <div class="item-3">{{lang.averageDay}}</div>
        </div>
        <div class="list-item border">
            <div class="item-1">
                <div style="width:30px; margin: 0 15px;"><img src="../../../assets/image/step.png"></div>
                <label>{{lang.stepNumber}}<span>/{{lang.step}}</span></label>
            </div>
            <div class="item-2">{{dataObj?dataObj.totalStep:"--"}}</div>
            <div class="item-3">{{dataObj?dataObj.avgStep:"--"}}</div>
        </div>
        <div class="list-item border">
            <div class="item-1">
                <div style="width:30px; margin: 0 15px;"><img src="../../../assets/image/hot.png"></div>
                <label>{{lang.heatQuantity}}<span>/{{lang.consumeUnit}}</span></label>
            </div>
            <div class="item-2">{{dataObj?dataObj.totalCalorie:"--"}}</div>
            <div class="item-3">{{dataObj?dataObj.avgCalorie:"--"}}</div>
        </div>
        <div class="list-item">
            <div class="item-1">
                <div style="width:30px; margin: 0 15px;"><img src="../../../assets/image/location.png"></div>
                <label>{{lang.distance}}<span>/{{lang.distanceUnit1}}</span></label>
            </div>
            <div class="item-2">{{dataObj?dataObj.totalDistance:"--"}}</div>
            <div class="item-3">{{dataObj?dataObj.avgDistance:"--"}}</div>
        </div>
    </div>
     <v-screen ref="screen" index=3 @select="select"></v-screen>
     <my-date  v-show="myDateState"  @clickDay="clickDay"></my-date>
  </div>
</template>
<script>
import opt from "../../../components/echart/echart_stepMonth";
import myDate from "../../../components/calendar";
export default {
    name:"refurbish",
  components: {myDate},
  data() {
    return {
      max:30,
      timeList:[],
      value: 0,
      value1: 0,
      myChart:null,
      myDateState: false,
      currentPage: 1,
      pageSize: 50,
      resultList: [],
      dataObj: null  
    };
  },
  watch:{
    value(val){
      this.myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: val 
      }); 
    }
  },
  methods: {
    Month_Date(date){
        this.timeList = this.util.MonthDateS(date)
        this.max = this.timeList.length - 1
        opt.xAxis.data = []
        for(let i =0;i<this.timeList.length;i++){
          opt.xAxis.data.push(i)
        }
    },
    getMonthData() {
        this.Http(this.api["StepMonth"], {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          dateString: this.timeList[0].replace("年","-").replace("月","-").slice(0, 7) // opt_date
        }).then(res => {
          if (res.data.code == "000") {
              this.resultList = res.data.result.list??[0,0,0,0,0,0,0]
              this.dataObj = res.data.result.obj??null
              this.value1 = this.dataObj?.percent || 0
              opt.series[0].data = this.resultList
              this.myChart.setOption(opt)
          }
        })
    },
     clickDay(data){
        let d = data.split("-")
        this.Month_Date(d[0]+"-"+d[1])
        this.value  = d[2]-1
        this.getMonthData()
      },
     lessValue(){
          if(this.value>0){
            this.value = this.value - 1;
          }else{
            this.value  = this.max
          }
      },
      addValue(){
          if(this.value < this.max ){
            this.value = this.value + 1;
          }else{
            this.value  = 0
          }
      },
     clickConten(){
       this.myDateState = true
    },
     select(index){
      if(index==1&&this.index!=1){          
          this.$router.push({ path: "/hStepsDay?lang="+this.$route.query.lang });
      }else if(index==2&&this.index!=2){
          this.$router.push({ path: "/hStepsWeek?lang="+this.$route.query.lang });
      }else if(index==3&&this.index!=3){
          this.$router.push({ path: "/hStepsMonth?lang="+this.$route.query.lang });
      }
    },
    ckRight(){
       this.$refs.screen.open()
    }   
  },
  mounted: function() {
    this.myChart = this.$echarts.init(
      document.getElementById("code-echart-month")
    ); 
    this.myChart.setOption(opt);
    this.Month_Date(this.util.dateFormat("", "YYYY-MM"))
    this.getMonthData()
    window.curInt = 0
    this.myChart.on('showTip',  (params)=> {    
      if(window.curInt==params.dataIndex){
        return
      }else{
        window.curInt = params.dataIndex;
        this.myChart.setOption(opt)
        this.value = params.dataIndex;
      }
    })
      
    let s_d = new Date().getDay()
    if(s_d==0){
        this.value = 6
    }else{
        this.value = s_d - 1
    }
    setTimeout(()=>{
      this.myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.value 
      });
    },1000)
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.page-time {
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  font-size: 0.31rem;
  color: #4D4D4D;
}

.page-step {
  text-align: center;
  padding: 0.2rem 0;
  height: 0.56rem;

  .page-step-1 {
    color: #151515;
    font-size: 0.7rem;
    font-weight: 500;
    line-height: 0.56rem;
    display: inline-block;
  }

  .page-step-2 {
    color: #151515;
    font-size: 0.37rem;
    padding-left: 0.05rem;
  }
}

.img-view {
  width: 100%;
  height: 4.02rem;
}

.img-echart {
  height: 2.54rem;
  width: 100%;
  display: flex;
  align-items: center;
}

.slider-view {
  height: 1.28rem;
  padding-top: 0.2rem;
  box-sizing: border-box;
}

.img-code-echart {
  width: calc(100% - 1.08rem);
  height: 100%;
}

.img-left-icon, .img-right-icon {
  font-size: 0.45rem;
  width: 0.54rem;
  display: flex;
  align-items: center;
}

#code-echart-month {
  width: 100%;
  height: 100%;
}

.laebl-view {
  position: relative; 
  width: 98%;
  top:0px;
  margin: 8px auto;
}

.laebl-view span {
  display: inline-block;
  width: calc((100% / 5));
  text-align: center;
  color: #333333;
  font-size: 0.23rem;
}

.slider-action {
  font-size: 0.35rem !important;
  position: relative !important;
  top: -0.15rem !important;
  color: #fb9b06 !important;
  font-weight: 500 !important;
}

.wc-view {
  height: 2.21rem;
  display: flex;
  text-align: center;
}

.wc-view-1 {
  width: calc(50% - 1px);
  height: 100%;
  padding: 0.33rem;
  box-sizing: border-box;
}

.wc-view-2 {
  width: 2px;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(153, 153, 153, 0) 0%,
    rgba(153, 153, 153, 0.2) 14%,
    rgba(153, 153, 153, 0.2) 76%,
    rgba(153, 153, 153, 0) 100%
  );
}

.wc-view-3 {
  width: calc(50% - 1px);
  height: 100%;
  padding: 0.33rem;
  box-sizing: border-box;
}

.wc-view-a {
  color: #343434;
  width: 100%;
  font-size: 0.27rem;
  line-height: 0.48rem;
}

.wc-view-b {
  font-size: 0.76rem;
  width: 100%;
  line-height: 0.84rem;
  font-weight: 500;
}

.wc-view-b span {
  font-size: 0.6rem;
}
.list-view .item-1{
  width:50%;
}
.list-view .item-2{
  width:25%;
  text-align:center;
  color:#343434;
  font-size:0.47rem;
  line-height:1rem;
}
.list-view .item-3{
  width:25%;
  text-align:center;
  color:#343434;
  font-size:0.47rem;
  line-height:1rem;
}
.list-view .list-title{
  display:flex;
}
.list-view .list-item{
  display:flex;
 
}
.border{
   border-bottom : 0.11rem solid #E5E5E5 !important;
} 
.list-title .item-2{
   color:#343434;
   font-size:0.27rem;
   line-height:0.3rem;
}
.list-title .item-3{
   color:#343434;
   font-size:0.27rem;
   line-height:0.3rem;
}
.list-item:nth-child(2) .item-1 img{
    width:0.54rem;
}
.list-item:nth-child(3) .item-1 img{
    width:0.44rem;
}
.list-item:nth-child(4) .item-1 img{
    width:0.43rem;
}
.list-item .item-1{
    display:flex;
    justify-content: left;
    align-items: center;
}
.list-item .item-1 label{
    color:#242424;
    font-size:0.33rem;
}
.list-item .item-1 label span{
    color:#808080;
    font-size:0.27rem;
    margin-left:1px; 
}
.van-slider_diy:after {
    content: " ";
    display: block;
    width: 100%;
    height: 0.78rem;
    background: linear-gradient(180deg,rgba(251, 155, 6, 0.15), rgba(255, 255,255, 1));
}

</style>