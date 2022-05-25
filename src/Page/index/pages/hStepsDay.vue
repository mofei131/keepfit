<template>
  <div class="page-view">
    <my-head :name="dateTime"  @ckLeft="closePage"  @clickConten="clickConten" @ckRight="ckRight" :type="1"></my-head>
    <div class="page-time">
      <span>{{timeList[value]}}</span>
    </div>
    <div class="page-step">
      <span class="page-step-1" v-if="listSow">{{resultList.length>0?resultList[value]:"--"}}</span>
			<span class="page-step-1" v-else>{{resultList.length>0?resultList[0]:"--"}}</span>
      <span class="page-step-2">{{lang.step}}</span>
    </div>
    <div class="img-view">
      <div class="img-echart">
        <div class="img-left-icon">
          <van-icon style="height:60px;line-height: 60px;" @click="lessValue" color="#B3B3B3" name="arrow-left" />
        </div>
        <div class="img-code-echart">
          <div id="code-echart-day"></div>
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
          <span :class="{'slider-action':value==23}">23:00</span>
        </div>
        <div style="width:100%;background: rgb(251, 155, 6);height: 2px;" class="van-slider_diy">
             <van-slider style="width:80%;margin: 0 auto;" v-model="value" max=23 min=0 :step="1" inactive-color="#FB9B06" active-color="#FB9B06" @change="onChange" />
        </div>
      </div>
    </div>
    <div class="step-view">
      <div class="step-view1">
        <div>{{dataObj?dataObj.distance:"--"}}</div>
        <div>{{dataObj?dataObj.stepNum:"--"}}</div>
        <div>{{dataObj?dataObj.burnCalorie:"--"}}</div>
      </div>
      <div class="step-view2">
        <div>{{lang.distance}}</div>
        <div>{{lang.stepNumber}}</div>
        <div>{{lang.consume}}</div>
      </div>
      <div class="step-view3">
        <div>{{lang.distanceUnit}}</div>
        <div>{{lang.step}}</div>
        <div>{{lang.consumeUnit}}</div>
      </div>
    </div>
    <div class="slider-view-ing">
      <img src="../../../assets/image/run.png" :style="{'left':(value1>100?100:value1)+'%'}" class="run-image" />
      <img src="../../../assets/image/p.png" v-if="value1<100" class="p-image" />
      <van-slider
        disabled
        v-model="value1"
        bar-height="0.11rem"
        inactive-color="#CCCCCC"
        active-color="#FC9307"
      />
    </div>
    <div class="wc-view">
      <div class="wc-view-1">
        <div class="wc-view-a">{{lang.tip1}}</div>
        <div class="wc-view-b">{{value1_}}%</div>
        <div class="wc-view-c">{{lang.percentage}}</div>
      </div>
      <div class="wc-view-2"></div>
      <div class="wc-view-3">
        <div class="wc-view-a">{{lang.tip2}}</div>
        <div class="wc-view-b">
          {{dataObj?dataObj.continueDay:"-"}}&nbsp;<span>/{{dataObj?dataObj.maxContinueDay:"-"}}</span>
        </div>
        <div class="wc-view-c">{{lang.tip3}}</div>
      </div>
    </div>
    <van-cell value is-link @click="openNavigator">
      <template #title>
        <van-tag style="background-color: transparent;">
          <img class="mubiaoset" src="../../../assets/image/mubiaoSet.png" />
        </van-tag>
        <span class="custom-title">{{lang.tip4}}</span>
      </template>
    </van-cell>
    <!-- <van-cell value>
      <template #title>
        <van-tag style="background-color: transparent;">
          <img class="mubiaoset" src="../../../assets/image/share.png" />
        </van-tag>
        <span class="custom-title">{{lang.tip5}}</span>
      </template>
    </van-cell>    -->
    <v-screen ref="screen" index=1 @select="select"></v-screen> 
    <my-win v-show="myWinState"></my-win>
    <my-date ref="myDate" @clickDay="clickDay" v-show="myDateState"></my-date>
  </div>
</template>
<script>
import opt from "../../../components/echart/echart";
import myWin from "../../../components/guideMap";
import myDate from "../../../components/calendar";
// var jsos_ = {
// 	result: {
// 		obj: {
// 			stepNum: 47192,
// 			burnCalorie: 1048,
// 			distance: 113.0,
// 			continueDay: 2,
// 			maxContinueDay: 3,
// 			percent: 100
// 		},
// 		list: [915, 959, 950, 975, 963, 904, 9710, 959, 956, 933, 932, 945, 944, 9310, 983, 9210, 912, 937, 941, 963, 992, 916, 983, 911]
// 	}
// }
let dd_ = [
  "00:00 - 01:00","01:00 - 02:00","02:00 - 03:00","03:00 - 04:00","04:00 - 05:00","05:00 - 06:00",
  "06:00 - 07:00","07:00 - 08:00","08:00 - 09:00","09:00 - 10:00","10:00 - 11:00","11:00 - 12:00",
  "12:00 - 13:00","13:00 - 14:00","14:00 - 15:00","15:00 - 16:00","16:00 - 17:00","17:00 - 18:00",
  "18:00 - 19:00","19:00 - 20:00","20:00 - 21:00","21:00 - 22:00","22:00 - 23:00","23:00 - 00:00"];
export default {
    name:"refurbish",
    components: { myWin, myDate},
    data() {
    return {
      dateTime:window.lang.headDay,
      timeList:dd_,
      value: 12,
      value1: 0,
      value1_:0,
      myChart:null,
      myDateState: false,
      myWinState: false,
      currentPage: 1,
      pageSize: 50,
      resultList: [],
      dataObj: null,
			qqList:'',
			timeD:'',
			listSow:true,
			date:'',
			datashow:true
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
		//滑块变化
			onChange(){
				console.log(this.value)
				if(this.datashow){
					this.date = this.util.dateFormat("", "YYYY-MM-DD")
				}
				console.log(this.qqList)
				window.pushApp.todaySteps.func(this.date+" "+this.value)
				// if(!this.qqList){
				// 	window.pushApp.todaySteps.func(this.date+" "+this.value)
				// 	console.log(this.value+'今日无数据')
				// }
				// else if(this.qqList[this.value].length ==0 || this.qqList[this.value] == 0 || this.qqList[this.value] == null){
				// 	window.pushApp.todaySteps.func(this.date+" "+this.value)
				// 	console.log(this.value+'此时无数据')
				// }
			},
      openNavigator(){
          window.pushApp.openNavigator.func("setTarget")
      },
      lessValue(){          
         this.$refs.myDate.lessD()
      },
      addValue(){         
         this.$refs.myDate.addD()
      },
     getDayData(opt_date) {
        // if(opt_date==this.util.dateFormat("", "YYYY-MM-DD")){            
        //     window.pushApp.todaySteps.func();
        //     return ;
        // }
        this.Http(this.api["StepDay"], {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          dateString: opt_date
        }).then(res => {
					console.log('请求后台')
          if (res.data.code == "000") {
              this.resultList = res.data.result.list??[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]	
							this.qqList = res.data.result.list
              this.dataObj = res.data.result.obj??null
              this.value1_ = this.dataObj?.percent || 0
              this.value1 = (this.dataObj?.percent || 0)>100?100:(this.dataObj?.percent || 0)
              opt.series[0].data = this.resultList
							opt.xAxis.axisLabel.show = false
							opt.yAxis.axisLabel.show = false
              console.log(opt);
              this.myChart.setOption(opt)
          }
          setTimeout(() => {
                this.myChart.resize();
            }, 100);
        })
    },
    clickConten() {
			// window.pushApp.todaySteps.func(this.util.dateFormat("", "YYYY-MM-DD")+" "+this.value)
      this.myDateState = true;
    },
    clickDay(data){
			this.date = data
			this.datashow = false
			this.value = 12
			console.log(this.value)
      this.dateTime = data.replace("-","年").replace("-","月")+"日"
      // this.dateTime = data.replace("-",window.lang.year).replace("-",window.lang.month)+window.lang.day
			this.myChart.clear()
      // this.getDayData(data)
			// console.log(data)
			window.pushApp.todaySteps.func(data+" "+12)
			this.myChart.resize();
    },
    addData(dayHour){
      this.Http(this.api["StepSave"], [{
          burnCalorie: Number("4" + (Math.random()*10).toFixed(0)),
          dateString: this.util.dateFormat("", "YYYY-MM-DD"),
          dayHour: dayHour,
          hourDate:dayHour,
          distance:Number((Math.random()*10).toFixed(0)),
          stepNum: Number("9" + (Math.random()*10).toFixed(0)+(Math.random()*10).toFixed(0))
        }]).then(res => {
          if (res.data.code == "000") {
              console.log("aa")
          }
        })
    },
    select(index) {
        console.log(this.$route.query.lang)
      if (index == 1 && this.index != 1) {
        this.$router.push({ path: "/hStepsDay?lang="+this.$route.query.lang });
      } else if (index == 2 && this.index != 2) {
        this.$router.push({ path: "/hStepsWeek?lang="+this.$route.query.lang });
      } else if (index == 3 && this.index != 3) {
        this.$router.push({ path: "/hStepsMonth?lang="+this.$route.query.lang });
      }
    },
    ckRight() {
      this.$refs.screen.open()    
    }
  },
  mounted: function() {
    this.myChart = this.$echarts.init(
      document.getElementById("code-echart-day")
    );
		// opt.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]	
		// opt.xAxis.axisLabel.show = false
		// opt.yAxis.axisLabel.show = false
    this.myChart.setOption(opt);
    // this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"))
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
				if(this.datashow){
					this.date = this.util.dateFormat("", "YYYY-MM-DD")
				}
				window.pushApp.todaySteps.func(this.date+" "+this.value)
      }
    })
    setTimeout(()=>{
      this.myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.value 
      });
    },1000)
		window.pushApp.todaySteps.func(this.util.dateFormat("", "YYYY-MM-DD")+" "+this.value)
		this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"))
    let that = this;  
    setTimeout(() => {
        window.pushApp.todaySteps.callback = (data)=>{  
            console.log("todaySteps结果 : " + data)
            let jsos_ = JSON.parse(data)            
            // that.resultList = jsos_["result"]["list"]??[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
						that.resultList[that.value] = jsos_["result"]["list"][0]
            that.dataObj = jsos_["result"]["obj"]??null
            that.value1_ = that.dataObj?.percent || 0
            that.value1 = (that.dataObj?.percent || 0)>=100?100:(that.dataObj?.percent || 0)
            opt.series[0].data = that.resultList
						opt.xAxis.axisLabel.show = false
						opt.yAxis.axisLabel.show = false
            that.myChart.setOption(opt) 
            setTimeout(() => {
                that.myChart.resize();
            }, 100);
            
        } 
        console.log("调用 todaySteps :等待结果.... ")
        // window.pushApp.todaySteps.func()
    },200)

   
   
      // for(let i =1;i<=24;i++){
      //   this.addData(i)
      // }
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

#code-echart-day {
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
  color: #fb9b06 !important;
  font-weight: 500 !important;
}

.step-view1 div, .step-view2 div, .step-view3 div {
  width: 33.33%;
  text-align: center;
  // font-family:"DIN1451MittelschriftAlt" !important;
}

.step-view1 div {
  font-size: 0.8rem;
  font-weight: 500;
  color: #343434;
  line-height: 0.88rem;
}

.step-view2 div {
  font-size: 0.38rem;
  font-weight: 500;
  color: #1D1D1D;
  line-height: 0.65rem;
}

.step-view3 div {
  font-size: 0.3rem;
  color: #808080;
  line-height: 0.5rem;
}

.step-view1, .step-view2, .step-view3 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-view-ing {
  width: calc(100% - 1.14rem);
  margin: 0 auto;
  height: 0.7rem;
  display: flex;
  align-items: flex-end;
  position: relative;
  padding-bottom: 8px;
  box-sizing: border-box;
 //-moz-animation-timing-function  overflow: hidden;
}

.run-image {
  position: absolute;
  width: 0.36rem;
  top: 0.04rem;
}

.p-image {
  position: absolute;
  width: 0.23rem;
  right: 0%;
  top: 0.02rem;
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
  font-size: 0.29rem;
  line-height: 0.48rem;
}

.wc-view-b {
  font-size: 0.76rem;
  width: 100%;
  line-height: 0.84rem;
  font-weight: 500;
}

.wc-view-c {
  color: #666666;
  width: 100%;
  font-size: 0.25rem;
}

.wc-view-b span {
  font-size: 0.6rem;
}

.mubiaoset {
  width: 0.7rem;
}
.van-slider_diy:after {
    content: " ";
    display: block;
    width: 100%;
    height: 0.78rem;
    background: linear-gradient(180deg,rgba(251, 155, 6, 0.15), rgba(255, 255,255, 1));
}
</style>