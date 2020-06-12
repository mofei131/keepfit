<template>
  <div class="page-view">
    <my-head  :name="timeList[0] +' - '+ timeList[6].slice(6, 11)"  @ckLeft="closePage"  @clickConten="clickConten" @ckRight="ckRight" :type="1"></my-head>
    <div class="page-time">
        <span>{{timeList[value].slice(5, 11)}}</span>
    </div>
     <div class="page-step">
        <span class="page-step-1">{{util.second_host(resultList[value])[0]}}<span>小时</span>{{util.second_host(resultList[value])[1]}}<span>分钟</span></span>
    </div>
    <div class="img-view img-view-sleep">
      <div class="img-echart">
        <div class="img-left-icon">
           <van-icon style="height:60px;line-height: 60px;" @click="lessValue" color="#B3B3B3" name="arrow-left" />
        </div>
        <div class="img-code-echart">
          <div id="code-echart-sleepweek"></div>
        </div>
        <div class="img-right-icon">
          <van-icon style="height:60px;line-height: 60px;" @click="addValue" color="#B3B3B3" name="arrow" />
        </div>
      </div>
      <div class="slider-view">
         <div class="laebl-view">
          <span  :class="{'slider-action':value==0}">{{lang.week1}}</span>
          <span  :class="{'slider-action':value==1}">{{lang.week2}}</span>
          <span  :class="{'slider-action':value==2}">{{lang.week3}}</span>
          <span  :class="{'slider-action':value==3}">{{lang.week4}}</span>
          <span  :class="{'slider-action':value==4}">{{lang.week5}}</span>
          <span  :class="{'slider-action':value==5}">{{lang.week6}}</span>
          <span  :class="{'slider-action':value==6}">{{lang.week7}}</span>
        </div>
         <div style="width:100%;background: #aa0098;height: 2px;" class="van-slider_diy">
             <van-slider style="width:75%;margin: 0 auto;" v-model="value" max=6 min=0 :step="1" inactive-color="#AA0098" active-color="#AA0098" />
        </div>
      </div>
    </div>   
    <div class="list-view">
        <div class="list-title">
            <div class="item-1"></div>
            <div class="item-2"></div>
            <div class="item-3">{{lang.cumulative}}</div>
        </div>
        <div class="list-item border">
            <div class="item-1">                
                <label>{{lang.sleepTip3}}</label>
            </div>
            <div class="item-2"></div>
            <div class="item-3" >{{dataObj?util.second_host(dataObj.totalSleepTime)[0]:"00"}}<span>{{lang.hours}}</span>{{dataObj?util.second_host(dataObj.totalSleepTime)[1]:"00"}}<span>{{lang.minutes}}</span></div>
        </div>
        <div class="list-item border">
            <div class="item-1">               
                <label>{{lang.sleepTip4}}</label>
            </div>
            <div class="item-2"></div>
            <div class="item-3" >{{dataObj?util.second_host(dataObj.totalShallowTime)[0]:"00"}}<span>{{lang.hours}}</span>{{dataObj?util.second_host(dataObj.totalShallowTime)[1]:"00"}}<span>{{lang.minutes}}</span></div>
        </div>
        <div class="list-item  border">
            <div class="item-1">              
                <label>{{lang.sleepTip5}}</label>
            </div>
            <div class="item-2"></div>
            <div class="item-3" >{{dataObj?util.second_host(dataObj.totalDeepTime)[0]:"00"}}<span>{{lang.hours}}</span>{{dataObj?util.second_host(dataObj.totalDeepTime)[1]:"00"}}<span>{{lang.minutes}}</span></div>
        </div>
        <div class="list-item">
            <div class="item-1">              
                <label>{{lang.sleepTip6}}</label>
            </div>
            <div class="item-2"></div>
            <div class="item-3">{{dataObj?dataObj.totalSoberNum:" - "}}<span>{{lang.sequence}}</span></div>
        </div>
    </div>
   <v-screen ref="screen" index=2 @select="select"></v-screen>
     <my-date  v-show="myDateState"  @clickDay="clickDay"></my-date>
  </div>
</template>
<script>
import opt from "../../../components/echart/echart2";
import myDate from "../../../components/calendar";
export default {
  components: {myDate},
  data() {
    return {
      timeList:["1","2","3","4","5","6","7"],
      value: 0,
      value1: 0,
      myChart:null,
      myDateState: false,
      currentPage: 1,
      index:2,
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
     WeekDate(date){
        this.timeList = this.util.WeekDates(date)
    },
    getWeekData() {
        this.Http(this.api["SleepWeek"], {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          dateString: this.timeList[0].replace("年","-").replace("月","-").replace("日","") // opt_date
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
        let k = new Date(data).getDay()
        if(k>0){
            this.value = k - 1;
          }else{
            this.value  = 6
          }
        this.WeekDate(data)
        this.getWeekData()
      },
     lessValue(){
          if(this.value>0){
            this.value = this.value - 1;
          }else{
            this.value  = 6
          }
      },
      addValue(){
          if(this.value < 6 ){
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
          this.$router.push({ path: "/sleepDay" });
      }else if(index==2&&this.index!=2){
          this.$router.push({ path: "/sleepWeek" });
      }else if(index==3&&this.index!=3){
          this.$router.push({ path: "/sleepMonth" });
      }
    },
    ckRight(){
       this.$refs.screen.open()
    }
  },
  mounted: function() {
    this.myChart = this.$echarts.init(
      document.getElementById("code-echart-sleepweek")
    );   
    this.myChart.setOption(opt);
    this.WeekDate(this.util.dateFormat("", "YYYY-MM-DD"))
    this.getWeekData()
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
    font-size: 0.65rem;
    font-weight: 500;
    line-height: 0.56rem;
    display: inline-block;
    padding: 0 0.1rem;
  }

  .page-step-2 {
    color: #151515;
    font-size: 0.37rem;
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
.page-step-1 span{
    color:#151515;
    font-size:0.35rem
    padding:0 2px;
  }
#code-echart-sleepweek {
  width: 100%;
  height: 100%;
}

.laebl-view {
  position: relative;
  top: -0.04rem;
  width: 85%;
  margin: 0 auto;
}

.laebl-view span {
  display: inline-block;
  width: calc((100% / 7));
  text-align: center;
  color: #333333;
  font-size: 0.23rem;
}

.slider-action {
  font-size: 0.35rem !important;
  position: relative !important;
  top: -0.15rem !important;
  color: #AA0098 !important;
  font-weight: 500 !important;
}
.list-view .item-1{
  width:30%;
}
.list-view .item-2{
  width:30%;
  text-align:center;
  color:#343434;
  font-size:0.47rem;
  line-height:1rem;
}
.list-view .item-3{
  width:40%;
  text-align:center;
  color:#343434;
  font-weight:500;
  font-size:0.53rem;
  line-height:1rem;
}
.list-view .item-3 span{
  font-weight:400;
  font-size:0.28rem;
  color:#343434;
  padding:0 3px;
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
    justify-content: center;
    align-items: center;
}
.list-item .item-1 label{
    font-size:0.33rem;
    color:#808080;
}
.list-item .item-1 label span{
    color:#808080;
    font-size:0.27rem;
    margin-left:1px; 
}
.list-li{ 
  width: 0.7rem  !important;
  transform: translate(0,0) !important;
  left: calc(100% - 1.4rem) !important;
}
.van-slider_diy:after {
    content: " ";
    display: block;
    width: 100%;
    height: 0.78rem;
    background: linear-gradient(180deg,rgba(170, 0, 152,0.15), rgba(255, 255,255, 1));
}
.img-view>>>.van-slider__button{
  border: 0.04rem solid #aa0098;
}
</style>