<template>
  <div class="page-view">
    <my-head
      :name="dateTime"
      @ckLeft="closePage"
      @clickConten="clickConten"
      @ckRight="ckRight"
      :type="1"
    ></my-head>
    <div class="page-time">
      <span>{{sleepTime}}</span>
    </div>
		<div id="myChartNew" :style="{width: '100%', height: '4rem'}">
			<div></div>
		</div>
		<!-- <div class="cake-echart-1" id="code-echart-2">
		  <div></div>
		</div> -->
    <!-- <div class="page-step">
      <span class="page-step-2">{{sleepType}}</span>
      <span class="page-step-1">{{sleepValue}}</span>
      <span class="page-step-2">{{lang.minute}}</span>
    </div>
    <div class="img-view img-view-sleep">
      <div class="img-echart">
        <div class="img-left-icon">
          <van-icon
            style="height:60px;line-height: 60px;"
            @click="lessValue"
            color="#B3B3B3"
            name="arrow-left"
          />
        </div>
        <div class="img-code-echart">
          <div id="code-echart-sleepday"></div>
        </div>
        <div class="img-right-icon">
          <van-icon
            style="height:60px;line-height: 60px;"
            @click="addValue"
            color="#B3B3B3"
            name="arrow"
          />
        </div>
      </div>
      <div class="slider-view">
        <div class="laebl-view">
          <span :class="{'slider-action':value==0}" @click="value=0">20:00</span>
          <span :class="{'slider-action':value==360}" @click="value=360">02:00</span>
          <span
            style="padding-left: 10px; box-sizing: border-box;"
            :class="{'slider-action':value==720}" @click="value=720"
          >08:00</span>
          <span
            style="padding-left: 5px;box-sizing: border-box;"
            :class="{'slider-action':value==1080}" @click="value=1080"
          >14:00</span>
          <span :class="{'slider-action':value==1439}" @click="value=1439">20:00</span>
        </div>
        <div style="width:100%;background: #AA0098;height: 2px;" class="van-slider_diy">
          <van-slider
            style="width:80%;margin: 0 auto;"
            v-model="value"
            max="1439"
            min="0"
            :step="1"
            inactive-color="#AA0098"
            active-color="#AA0098"
          />
        </div>
      </div>
    </div> -->
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
        <div></div>
      </div>
      <div class="cake-echart-2">
        <div class="leng-1">
          <span class="span-1">
            <i></i>
            {{lang.deepSleep}}
          </span>
          <span
            class="span-2"
          >{{dataObj?util.second_host(dataObj.totalDeepTime)[0] + lang.hour:"-"+ lang.hour}}{{dataObj?util.second_host(dataObj.totalDeepTime)[1]+lang.minute:"-"+ lang.minute}}</span>
        </div>
        <div class="leng-1">
          <span class="span-1">
            <i style="background:#5C73FF;"></i>
            {{lang.easySleep}}
          </span>
          <span
            class="span-2"
          >{{dataObj?util.second_host(dataObj.totalShallowTime)[0] + lang.hour:"-"+ lang.hour}}{{dataObj?util.second_host(dataObj.totalShallowTime)[1]+lang.minute:"-"+ lang.minute}}</span>
        </div>
        <div class="leng-2">
          <span class="span-1">
            <i></i>
            {{lang.sober}}
          </span>
          <span class="span-2">{{dataObj?dataObj.totalSoberNum:"-"}}{{lang.sequence}}</span>
        </div>
      </div>
    </div>
    <div class="slider-code">
      <p class="slider-code-p">
        {{lang.sleepQuality}}:
        <span>{{value1 > 74?lang.sleep4:value1 > 49?lang.sleep3:value1 > 24?lang.sleep2:lang.sleep1}}</span>
      </p>
      <van-slider bar-height="8px" disabled v-model="value1" max="100" min="0" :step="1" />
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
    <v-screen ref="screen" index="1" @select="select"></v-screen>
    <my-date ref="myDate" @clickDay="clickDay" v-show="myDateState"></my-date>
  </div>
</template>
<script>
import opt from "../../../components/echart/echart_";
import opt2 from "../../../components/echart/echart1";
import myDate from "../../../components/calendar";
// 1:深睡,2:浅睡,0:清醒
export default {
     name:"refurbish",
  components: { myDate },
  data() {
    return {
      dateTime: window.lang.headDay,
      value: 0,
      value1: 0,
      index: 1,
      sleepValue: 0,
      sleepType: "",
      sleepTime: "00:00 - 01:00",
      sleepData: [],
      myChart: null,
      myChart1: null,
      myDateState: false,
      myWinState: false,
      currentPage: 1,
      pageSize: 50,
      resultList: [],
      dataObj: null,
			myChart2:null,
			types : [
			    { name: lang.deepSleep, color: '#8D44DA' },
			    { name: lang.easySleep, color: '#D137CD' },
			    // { name: '快速眼动', color: '#75d874' },
			    { name: lang.sober, color: '#FCBD28' },
			],
			myChartsData:[],
			dateList:[]
    };
  },
   watch: {
    value(val) {
        let _seqData = opt.xAxis.data[val].replace(":","");
        for (var i = 0; i < this.sleepData.length; i++) {
            let begin_data = this.sleepData[i].timeRange.split("-")[0].replace(":","")
            let end_data = this.sleepData[i].timeRange.split("-")[1].replace(":","")             
            if(begin_data<end_data){                
                if(_seqData>=begin_data&&_seqData<=end_data){
                    this.sleepValue = this.sleepData[i].durationMinute;
                    this.sleepType = this.sleepData[i].type == 1 ?  lang.deepSleep : lang.easySleep ;
                    this.sleepTime = this.sleepData[i].timeRange.replace("-", " - ");
                }
            }else{
                if(_seqData<=2400&&_seqData>=begin_data || _seqData>=0&&_seqData<=end_data){
                    this.sleepValue = this.sleepData[i].durationMinute;
                    this.sleepType = this.sleepData[i].type == 1 ?  lang.deepSleep : lang.easySleep ;
                    this.sleepTime = this.sleepData[i].timeRange.replace("-", " - ");
                }
            }
        }
    }
  },
  methods: {
		//Echarts
		 myEcharts(){
			 this.myChart2 = this.$echarts.init(
			   document.getElementById("myChartNew")
			 );
			let option = {
        title: {
            // text: 'Profile',
            // left: 'center'
        },
					legend: {
						selectedMode: false,
						itemGap: 52, 
						data: [lang.sober,lang.easySleep,lang.deepSleep],
					},
				grid: {
					left: '0%',
					right: '0%',
					bottom: '3%',
					containLabel: true,
				},
        xAxis: {
            min: 0,
            scale: true,
            splitLine: { show: false },
						show:false,
						
        },
        yAxis: {
            data: [lang.deepSleep, lang.easySleep ,lang.sober],
						show:false,
						axisPointer: {
						    show:false
						},
        },
        series: [
            {
                type: 'custom',
                renderItem: this.renderItem,
                itemStyle: {
                    opacity: 0.8,
                },
                encode: {
                    x: [1, 2],
                    y: 0
                },
								barWidth: 100,
								barCategoryGap:'0%',
                data: this.myChartsData
            },
								{
									name: lang.sober,
									type: 'bar',
									color:'#FCBD28',
									barWidth : 0,
								},
								{
									name: lang.easySleep,
									type: 'bar',
									color:'#D137CD',
									barWidth : 0,
								},{
									name: lang.deepSleep,
									type: 'bar',
									color:'#8D44DA',
									barWidth : 0,
									barGap:100,
								},
        ],
				 tooltip : {
						trigger: 'item',
						axisPointer: {
								type: 'cross',
								crossStyle: {
									type:'dashed',
									opacity:1,
								},
								label: {
										backgroundColor: 'rgba(0,0,0,0)',
								},
						},
						formatter(params){
							return params.name+':'+params.value[3];
						 }
				},
    };
			this.myChart2.setOption(option);
		},
		//渲染树状图
		renderItem(params, api) {
		    var categoryIndex = api.value(0);
		    var start = api.coord([api.value(1), categoryIndex]);
		    var end = api.coord([api.value(2), categoryIndex]);
		    // var height = api.size([0, 1])[1] * 0.6;
				var height = api.size([0, 1])[1] * 1;
		    var rectShape = this.$echarts.graphic.clipRectByRect(
		        {
		        x: start[0],
		        y: start[1] - height / 2,
		        width: end[0] - start[0],
		        height: height
						// height:50
		        },
		        {
		        x: params.coordSys.x,
		        y: params.coordSys.y,
		        width: params.coordSys.width,
		        height: params.coordSys.height
		        }
		    );
		    return (
		        rectShape && {
		        type: 'rect',
		        transition: ['shape'],
		        shape: rectShape,
		        style: api.style()
		        }
		    );
		},
    lessValue() {
      this.$refs.myDate.lessD();
    },
    addValue() {
      this.$refs.myDate.addD();
      //   if (this.value < 23) {
      //     this.value = this.value + 1;
      //   } else {
      //     this.value = 0;
      //   }
    },
	setChartData(list) {
		let timeLong = 0
			for(let i in list){
				let value = ['1','2','3','4']
				let list2 = {
					name:'',
					value:'',
					itemStyle:{
						normal:{
							color:''
						}
					}
				}
				value[0] = list[i].type == 0?2:list[i].type == 2?1:0
				value[1] = timeLong
				timeLong += list[i].durationMinute
				value[2] = timeLong
				value[3] = list[i].timeRange
				list2.name = this.types[list[i].type == 0?2:list[i].type == 2?1:0].name
				list2.value = value
				list2.itemStyle.normal.color = this.types[list[i].type == 0?2:list[i].type == 2?1:0].color
				this.myChartsData.push(list2)
			}
			this.myChart2.resize();
			this.myEcharts();
	},
	
    getDayData(opt_date) {
        console.log(opt_date)
        // if(opt_date==this.util.dateFormat("", "YYYY-MM-DD")){            
        //     window.pushApp.todaySleep.func();
        //     return ;
        // }

      this.Http(this.api["SleepDay"], {
        dateString: opt_date,
      }).then((res) => {
        if (res.data.code == "000") {
					let list = res.data.result.list
					this.setChartData(list)
          this.resultList = res.data.result.list ?? [];
          this.dataObj = res.data.result.obj ?? null;
          // this.value1 = this.dataObj.percent || 0;
					if(this.dataObj != null){
						let sum = this.dataObj.totalDeepTime/this.dataObj.totalSleepTime*100
						this.value1 = Math.round(sum)
					}
          let markAreaD = [];
          this.sleepData = [];
          var jsFn = (i) => {
            if (this.resultList[i].type == 2) {
              //深睡眠
              markAreaD.push([
                {
                  xAxis: this.resultList[i].timeRange.split("-")[0],
                 
                   itemStyle: { color: "rgb(92, 115, 255)" },
                },
                {
                  xAxis: this.resultList[i].timeRange.split("-")[1],
                  yAxis: "30",
                },
              ]);
              this.sleepData.push(this.resultList[i]);
            } else if (this.resultList[i].type == 1) {
              //浅睡眠
              markAreaD.push([
                {
                  xAxis: this.resultList[i].timeRange.split("-")[0],
                     itemStyle: { color: "#ac009a" },
                },
                {
                  xAxis: this.resultList[i].timeRange.split("-")[1],
                  yAxis: "20",
                },
              ]);
              this.sleepData.push(this.resultList[i]);
            }
          };
          
          for (let i = 0; i < this.resultList.length; i++) {     
               jsFn(i);        
            // if (!this.resultList[i].beginTime.includes(opt_date)) {
            //   if (this.resultList[i].endTime.includes(opt_date)) {
            //     this.resultList[i].timeRange =
            //       "00:00" + "-" + this.resultList[i].timeRange.split("-")[1];
            //     jsFn(i);
            //   }
            // } else {
            //   if (this.resultList[i].endTime.includes(opt_date)) {
            //     jsFn(i);
            //   } else {
            //     this.resultList[i].endTime =
            //       this.resultList[i].timeRange.split("-")[0] + "-" + "23:59";
            //   }
            // }
          }
          opt.series[0].markArea.data = markAreaD;
          console.log(opt)
          // this.myChart.setOption(opt);
					if(this.dataObj != null){
						let dk =
						  (this.dataObj?.totalShallowTime ?? 0) /
						    (this.dataObj?.totalSleepTime ?? 0) || 0;
						opt2.series[0].data = [
						  {
						    value: dk ? (dk * 100).toFixed(1) : 0,
						    name: lang.easySleep,
						    selected: true,
						  },
						  {
						    value: dk
						      ? this.dataObj?.totalDeepTime ?? 0
						        ? (100 - (dk * 100).toFixed(1)).toFixed(1)
						        : 0
						      : 0,
						    name: lang.deepSleep,
						  },
						];
					}else{
						console.log('没数据')
						opt2.series[0].data = [
						  {
						    value: 0,
						    name: lang.easySleep,
						    selected: true,
						  },
						  {
						    value:0,
						    name: lang.deepSleep,
						  },
						];
					}
          
          if (this.sleepData.length > 0) {
						console.log(this.sleepData)
            this.sleepValue = this.sleepData[0].durationMinute;
            this.sleepType = this.sleepData[0].type == 1 ?  lang.deepSleep : lang.easySleep ;
            // this.sleepTime = this.sleepData[0].timeRange.replace("-", " - ");
						this.sleepTime = this.sleepData[0].timeRange.split('-')[0]+' - '+this.sleepData[this.sleepData.length-1].timeRange.split('-')[1]
          } else {
            this.sleepValue = 0;
            this.sleepType = "";
            this.sleepTime = "00:00 - 01:00";
          }
					this.myChart1.resize();
            this.myChart1.setOption(opt2);
            // this.myChart
            // .resize();
        }
      });
    },
    clickConten() {
      this.myDateState = true;
    },
    clickDay(data) {
			this.value1 = 0
			this.myChartsData = []
      this.dateTime = data.replace("-", lang.year).replace("-", lang.month) + lang.day;
      this.getDayData(data);
    },
    select(index) {
      if (index == 1 && this.index != 1) {
        this.$router.push({ path: "/sleepDay?lang="+this.$route.query.lang });
      } else if (index == 2 && this.index != 2) {
        this.$router.push({ path: "/sleepWeek?lang="+this.$route.query.lang });
      } else if (index == 3 && this.index != 3) {
        this.$router.push({ path: "/sleepMonth?lang="+this.$route.query.lang });
      }
    },
    today(){

    },
    ckRight() {
      this.$refs.screen.open();
    },
	getSleepDay() {
		console.log("调用APP todaySleep方法");
		window.pushApp.todaySleep.func();
	}
  },
  mounted: function () {
		this.myEcharts();
	
	// 调用APP读取睡眠
	this.getSleepDay();
    
    let that = this
    // setTimeout(() => {
     window.pushApp.todaySleep.callback = (data) => {
			 console.log('data结果：'+ data)
			 this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"));
				// 	 if(data == 'false'){
				// 		this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"));
				// 		return
				// 	 }
    //        let jsos_ = JSON.parse(data)    
    //        console.log("todaySleep结果 : "+data);
    //         console.log(jsos_);
    //       that.resultList = jsos_["result"]["list"] ?? [];
    //       that.dataObj = jsos_["result"].obj ?? null;        
    //       that.value1 = that.dataObj?.percent || 0;
    //       let markAreaD = [];
    //       that.sleepData = [];
    //       var jsFn = (i) => {
    //         if (that.resultList[i].type == 2) {
    //           //浅睡
    //           markAreaD.push([
    //             {
    //               xAxis: that.resultList[i].timeRange.split("-")[0],
                  
    //               itemStyle: { color: "rgb(92, 115, 255)" },
    //             },
    //             {
    //               xAxis: that.resultList[i].timeRange.split("-")[1],
    //               yAxis: "30",
    //             },
    //           ]);
    //           that.sleepData.push(that.resultList[i]);
    //         } else if (that.resultList[i].type == 1) {
    //           //深睡 
    //           markAreaD.push([
    //             {
    //               xAxis: that.resultList[i].timeRange.split("-")[0],
    //               itemStyle: { color: "#ac009a" },
    //             },
    //             {
    //               xAxis: that.resultList[i].timeRange.split("-")[1],
    //               yAxis: "20",
    //             },
    //           ]);
    //           that.sleepData.push(that.resultList[i]);
    //         }
    //       };
    //       for (let i = 0; i < that.resultList.length; i++) {
    //           jsFn(i);           
    //       }
    //       opt.series[0].markArea.data = markAreaD;
         
    //       let dk =
    //         (that.dataObj?.totalShallowTime ?? 0) /
    //           (that.dataObj?.totalSleepTime ?? 0) || 0;
    //       opt2.series[0].data = [
    //         {
    //           value: dk ? (dk * 100).toFixed(1) : 0,
    //           name: "浅睡",
    //           selected: true,
    //         },
    //         {
    //           value: dk
    //             ? that.dataObj?.totalDeepTime ?? 0
    //               ? (100 - (dk * 100).toFixed(1)).toFixed(1)
    //               : 0
    //             : 0,
    //           name: "深睡",
    //         },
    //       ];

    //       if (that.sleepData.length > 0) {
    //         that.sleepValue = that.sleepData[0].durationMinute;
    //         that.sleepType = that.sleepData[0].type == 1 ? "深睡" : "浅睡" ;
    //         that.sleepTime = that.sleepData[0].timeRange.replace("-", " - ");
    //       } else {
    //         that.sleepValue = 0;
    //         that.sleepType = "";
    //         that.sleepTime = "00:00 - 01:00";
    //       }
    //        that.myChart.setOption(opt);
    //       that.myChart1.setOption(opt2);
        
    //            that.myChart.resize();
    //            that.myChart1.resize();
        
    //       console.log(opt)
     };
      console.log("调用 todaySleep 等待结果 .... ")
    //  window.pushApp.todaySleep.func();
    // }, 300);
		this.myChart1 = this.$echarts.init(
		   document.getElementById("code-echart-2")
		 );
		 this.myChart1.setOption(opt2);
		
		 // this.myChart = this.$echarts.init(
		 //   document.getElementById("code-echart-sleepday")
		 // );
		 // this.myChart.setOption(opt);
				
		// this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"));
		 if (localStorage.userIndex != 1) {
		   this.myWinState = true;
		 }


    // this.myChart.on("click", (params) => {
    // for(let i =0;i<opt.xAxis.data.length;i++){
    //     if(opt.xAxis.data[i]==params.data.xAxis){
    //         this.value  = i;
    //     }
    // }     
    //   if (this.sleepData.length > 0) {
    //     for (var i = 0; i < this.sleepData.length; i++) {
    //       if (
    //         this.sleepData[i].timeRange ==
    //         params.data.coord[0][0] + "-" + params.data.coord[1][0]
    //       ) {
    //         this.sleepValue = this.sleepData[i].durationMinute;
    //         this.sleepType = this.sleepData[i].type == 1 ?  "深睡" : "浅睡" ;
    //         this.sleepTime = this.sleepData[i].timeRange.replace("-", " - ");
    //       }
    //     }
    //   }
    // });
  },
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

.sleep-time .sleep-time-1 {
  width: 40%;
  text-align: center;
  color: #151515;
  font-weight: 500;
  font-size: 0.36rem;
}

.sleep-time .sleep-time-2 {
  width: 50%;
  text-align: center;
}

.sleep-time-span-1 {
  color: #343434;
  font-weight: 500;
  font-size: 0.8rem;
  padding-left: 0.1rem;
  padding-right: 0.05rem;
}

.sleep-time-span-2 {
  color: #343434;
  font-weight: 500;
  font-size: 0.33rem;
}

.cake-echart {
  display: flex;
  height: 2.5rem;

  .cake-echart-1 {
    width: 50%;
  }

  .cake-echart-2 {
    width: 50%;
  }
}

.cake-echart-2 {
  line-height: 0.7rem;
  padding: 0.25rem 0;
}

.cake-echart-2 .leng-1, .cake-echart-2 .leng-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}

.cake-echart-2 .leng-1 i {
  display: inline-block;
  width: 0.18rem;
  height: 0.18rem;
  background: #AC009A;
  margin: 0 0.14rem;
}

.cake-echart-2 .leng-2 i {
  display: inline-block;
  width: 0.18rem;
  height: 0.18rem;
  background: #fff;
  margin: 0 0.14rem;
}

.span-1 {
  color: #7A7A7A;
  font-size: 0.3rem;
  margin: 0 0.2rem 0 0;
}

.span-2 {
  color: #333333;
  font-size: 0.3rem;
  font-weight: 500;
}

.slider-code {
  width: 86%;
  margin: 15px auto;
}

.slider-code-span-view {
  display: flex;
}

.slider-code-span-view span {
  width: 25%;
  display: block;
  text-align: center;
  color: #808080;
  font-size: 0.27rem;
  line-height: 0.8rem;
}

.slider-code-p {
  color: #151515;
  font-size: 0.36rem;
  font-weight: 500;
  line-height: 0.82rem;
}

.slider-code-p span {
  margin: 0 15px;
}

.tip-view {
  width: 88%;
  margin: 0 auto 0 auto;
  padding: 10px 10px 14px 10px;
  border: 1px solid #BFBFBF;
  border-radius: 15px;
  box-sizing: border-box;
}

.tip-view-1 {
  color: #666666;
  font-size: 0.3rem;
  line-height: 36px;
}

.tip-view-2 {
  color: #808080;
  font-size: 0.25rem;
  line-height: 24px;
}

.van-slider_diy:after {
  content: ' ';
  display: block;
  width: 100%;
  height: 0.78rem;
  background: linear-gradient(180deg, rgba(170, 0, 152, 0.15), rgba(255, 255, 255, 1));
}

.van-slider_diy >>> .van-slider__button-wrapper {
 // display: none;
}

.img-view>>>.van-slider__button {
  border: 0.04rem solid #aa0098;
}

#code-echart-2 {
  position: relative;
}

#code-echart-2:after {
  content: ' ';
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
}
</style>