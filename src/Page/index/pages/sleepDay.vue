<template>
  <div class="page-view">
    <my-head :name="dateTime"  @ckLeft="closePage"  @clickConten="clickConten" @ckRight="ckRight" :type="1"></my-head>
    <div class="page-time">
        <span>{{timeList[value]}}</span>
    </div>
    <div class="page-step">
        <span class="page-step-2">{{lang.easySleep}}</span>
        <span class="page-step-1">72</span>
        <span class="page-step-2">{{lang.minute}}</span>
    </div>
    <div class="img-view img-view-sleep">
        <div class="img-echart">
            <div class="img-left-icon">
             <van-icon style="height:60px;line-height: 60px;" @click="lessValue" color="#B3B3B3" name="arrow-left" />
            </div>
            <div class="img-code-echart">
            <div id="code-echart-sleepday"></div>
            </div>
            <div class="img-right-icon">
             <van-icon style="height:60px;line-height: 60px;" @click="addValue" color="#B3B3B3" name="arrow" />
            </div>
        </div>
        <div class="slider-view">
            <div class="laebl-view">
              <span :class="{'slider-action':value==0}">00:00</span>
              <span :class="{'slider-action':value==6}">06:00</span>
              <span style="padding-left: 10px; box-sizing: border-box;" :class="{'slider-action':value==12}">12:00</span>
              <span style="padding-left: 18px;box-sizing: border-box;" :class="{'slider-action':value==18}">18:00</span>
              <span :class="{'slider-action':value==23}">00:00</span>
            </div>
            <div style="width:100%;background: #AA0098;height: 2px;" class="van-slider_diy">
                <van-slider style="width:80%;margin: 0 auto;" v-model="value" max=23 min=0 :step="1" inactive-color="#AA0098" active-color="#AA0098" />
            </div>
        </div>
    </div>
    <div class="sleep-time">
        <div class="sleep-time-1">{{lang.tip10}}</div>
        <div class="sleep-time-2">
          <span class="sleep-time-span-1">{{dataObj?util.second_host(dataObj.totalSleepTime)[0]:"-"}}</span>
          <span class="sleep-time-span-2">{{lang.hour}}</span>
          <span class="sleep-time-span-1">{{dataObj?util.second_host(dataObj.totalSleepTime)[1]:"-"}}</span>
          <span class="sleep-time-span-2">{{lang.minute}}</span>
        </div>
    </div>
    <div class="cake-echart" @click.stop.prevent="1==1">
        <div class="cake-echart-1" id="code-echart-2">
            <div ></div>
        </div>
        <div class="cake-echart-2">
            <div  class="leng-1">
                <span class="span-1"><i></i>{{lang.deepSleep}}</span><span class="span-2">{{dataObj?util.second_host(dataObj.totalDeepTime)[0] + lang.hour:"-"+ lang.hour}}{{dataObj?util.second_host(dataObj.totalDeepTime)[1]+lang.minute:"-"+ lang.minute}}</span>
            </div>
            <div  class="leng-1">
                <span class="span-1"><i style="background:#5C73FF;"></i>{{lang.easySleep}}</span><span class="span-2">{{dataObj?util.second_host(dataObj.totalShallowTime)[0] + lang.hour:"-"+ lang.hour}}{{dataObj?util.second_host(dataObj.totalShallowTime)[1]+lang.minute:"-"+ lang.minute}}</span>
            </div>
            <div  class="leng-2">
                <span class="span-1"><i></i>{{lang.sober}}</span><span class="span-2">{{dataObj?dataObj.totalSoberNum:"-"}}{{lang.sequence}}</span>
            </div>
        </div>
    </div>
    <div class="slider-code">
        <p class="slider-code-p">{{lang.sleepQuality}}:<span>{{lang.sleep4}}</span></p>
        <van-slider bar-height="8px" disabled="" v-model="value1" max=4 min=1 :step="1"  />
        <div class="slider-code-span-view">
           <span>{{lang.sleep1}}</span>
           <span>{{lang.sleep2}}</span>
           <span>{{lang.sleep3}}</span>
           <span>{{lang.sleep4}}</span>
        </div>
    </div>
    <div class="tip-view">
        <p class="tip-view-1">{{lang.sleepTip1}}</p>
        <p class="tip-view-2">{{lang.sleepTip2}}</p>
    </div>
    <div style="width:100%;height:60px;"></div>
    <v-screen ref="screen" index=1 @select="select"></v-screen>
    <my-date @clickDay="clickDay" v-show="myDateState"></my-date>
  </div>
</template>
<script>
import opt from "../../../components/echart/echart_";
import opt2 from "../../../components/echart/echart1";
import myDate from "../../../components/calendar";
let dd_ = [
  "00:00 - 01:00","01:00 - 02:00","02:00 - 03:00","03:00 - 04:00","04:00 - 05:00","05:00 - 06:00",
  "06:00 - 07:00","07:00 - 08:00","08:00 - 09:00","09:00 - 10:00","10:00 - 11:00","11:00 - 12:00",
  "12:00 - 13:00","13:00 - 14:00","14:00 - 15:00","15:00 - 16:00","16:00 - 17:00","17:00 - 18:00",
  "18:00 - 19:00","19:00 - 20:00","20:00 - 21:00","21:00 - 22:00","22:00 - 23:00","23:00 - 00:00"];
export default {
  components: {myDate},
  data() {
    return {
      dateTime:window.lang.headDay,
      timeList:dd_,
      value: 12,
      value1: 3,
      index:1,
      myChart:null,
      myChart1:null,
      myDateState: false,
      myWinState: false,
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
    lessValue(){
          if(this.value>0){
            this.value = this.value - 1;
          }else{
            this.value  = 23
          }
         
      },
      addValue(){
          if(this.value<23){
            this.value = this.value + 1;
          }else{
            this.value  = 0
          }
         
      },
     getDayData(opt_date) {
        this.Http(this.api["SleepDay"], {
          // currentPage: this.currentPage,
          // pageSize: this.pageSize,
          dateString: opt_date
        }).then(res => {
          if (res.data.code == "000") {
              this.resultList = res.data.result.list??[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              this.dataObj = res.data.result.obj??null
              this.value1 = this.dataObj?.percent || 0
              opt.series[0].data = this.resultList
              this.myChart.setOption(opt)
               opt2.series[0].data = [{
                    value: this.dataObj.totalShallowTime??0,
                    name: '浅睡',
                    selected: true,
                }, {
                    value: this.dataObj.totalDeepTime??0,
                    name: '深睡'
                }]
              this.myChart1.setOption(opt2)
          }
        })
    },
    clickConten(){
       this.myDateState = true
    },
    clickDay(data){
      this.dateTime = data.replace("-","年").replace("-","月")+"日"
      this.getDayData(data)
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
    // let myChart = this.$echarts.init(document.getElementById("code-echart-sleepday"));
    // myChart.setOption(opt);
    this.myChart1 = this.$echarts.init(document.getElementById("code-echart-2"));
    this.myChart1.setOption(opt2);

     this.myChart = this.$echarts.init(
      document.getElementById("code-echart-sleepday")
    );
    this.myChart.setOption(opt);
    this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"))
    if(localStorage.userIndex!=1){
        this.myWinState = true;
    }
    this.myChart.on('showTip',  (params)=> {       
      if(window.curInt==params.dataIndex){
        return
      }else{
        window.curInt = params.dataIndex;
        this.myChart.setOption(opt)
        this.value = params.dataIndex;
      }
    })
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
    padding: 0 0.1rem;
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
#code-echart-sleepday {
  width: 100%;
  height: 100%;
}
.laebl-view {
  position: relative;
  top: -0.04rem;
  height: 0.5rem;
}
.laebl-view span {
  display: inline-block;
  width: 20%;
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
.sleep-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.34rem;
    line-height: 1.34rem;
}
.sleep-time .sleep-time-1{
    width:40%;
    text-align: center;
    color:#151515;
    font-weight:500;
    font-size:0.36rem;
}
.sleep-time .sleep-time-2{
    width:50%;
    text-align: center;
}
.sleep-time-span-1{
    color:#343434;
    font-weight:500;
    font-size:0.8rem;
    padding-left:0.1rem; 
    padding-right:0.05rem; 
}
.sleep-time-span-2{
    color:#343434;
    font-weight:500;
    font-size:0.33rem;
}
.cake-echart{
    display:flex;
    height:2.5rem;
    .cake-echart-1{
        width:50%;
    }
    .cake-echart-2{
        width:50%;
    }
}
.cake-echart-2{
  line-height:0.7rem;
  padding: 0.25rem 0;
}
.cake-echart-2 .leng-1 ,.cake-echart-2 .leng-2{
    display:flex;
    justify-content:center;
    align-items:center;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
}
.cake-echart-2 .leng-1 i{
   display:inline-block;
   width:0.18rem;
   height:0.18rem;
   background:#AC009A;
   margin:0 0.14rem;
}
.cake-echart-2 .leng-2 i{
   display:inline-block;
   width:0.18rem;
   height:0.18rem;
   background:#fff;
   margin:0 0.14rem;
}
.span-1{
  color:#7A7A7A;
  font-size:0.3rem;
  margin:0 0.2rem 0 0;
}
.span-2{
    color:#333333;
    font-size:0.3rem;
    font-weight:500;
}
.slider-code{
    width:86%;
    margin: 15px auto;
}
.slider-code-span-view{
  display:flex;
}
.slider-code-span-view span{
  width:25%;
  display:block;
  text-align:center;
  color:#808080;
  font-size:0.27rem;
  line-height:0.8rem;
}
.slider-code-p{
   color:#151515;
   font-size:0.36rem;
   font-weight:500;
   line-height:0.82rem;
}
.slider-code-p span{
  margin:0 15px;
}
.tip-view{
    width: 88%;
    margin: 0 auto 0 auto;
    padding: 10px 10px 14px 10px;
    border: 1px solid #BFBFBF;
    border-radius: 15px;
    box-sizing: border-box;
}
.tip-view-1{
   color:#666666;
   font-size:0.3rem;
   line-height: 36px;
}
.tip-view-2{
    color:#808080;
    font-size:0.25rem;
    line-height: 24px;
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