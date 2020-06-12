<template>
  <div class="page-view">
    <my-head-one :name="`${lang.ecgTip1}`"  @ckLeft="closePage" @ckRight="openPage('historyEcg')" :type="3"></my-head-one>
    <div class="ring-1">
        <div class="ring-view">
          <div class="ring-view-0">{{lang.ecgTip2}}</div>
          <div class="ring-view-1">{{value}}</div>
          <div class="ring-view-2">{{lang.sequence}}/{{lang.minutes}}</div>
        </div>
    </div>
    <div class="page-view-1">
      <p class="page-tip">{{lang.ecgTip3}}</p>
      <div style="width:100%;">
        <van-progress color="#EF7000" :percentage="30" stroke-width="0.22rem" />
      </div>
    </div>
    <div class="heart-view" id="echart_1"></div>
    <div class="view-fixed" @click="check">
      <div class="view-fixed-but-1">{{stateIng?lang.bloodTip3_1:lang.bloodTip3 }}</div>
    </div>

    <van-overlay :show="showState" >
      <div class="wrapper" @click.stop>
          <van-icon @click="close" name="close" class="close-icon"/>
          <div class="widows">
            <div class="win-1"><label class="label-1">健康指数</label><label class="label-2">{{healthIndex}}</label></div>
            <div  class="win-1"><label class="label-1">心率指数</label><label class="label-2">{{frequency}}</label></div>
            <div  class="win-2"  @click="openPage('healthReport')">查看健康报告</div>
          </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      showState: false,
      stateIng: false,
      frequency:0,
      healthIndex:0,
      value:"--"
    };
  },
  methods: {
    close(){
      this.showState = false;
    },
    add(frequency,healthIndex){
        this.$toast.loading({
            duration: 3, // 持续展示 toast
            forbidClick: true,
            message: this.lang.wdTip8,
        });
        this.Http(this.api["EcgSave"], 
          [{
                "createTime": this.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
                "frequency":frequency,    
                "healthIndex":healthIndex,
                "imageUrl":""
            }]
        ).then(res => {
            this.$toast.clear()
            if(res.data.code == "000")
            this.getDayData(this.util.dateFormat("","YYYY-MM-DD"))
          
        })
    },
    check() {
      if (this.stateIng) {
        this.$toast(`${this.lang.bloodTip3_1}...`);
        return;
      } else {
        this.stateIng = true;
        window.clearInterval(window.fk);
        this.showState = false;
        let myChart = this.$echarts.init(document.getElementById("echart_1"));
        var xAxisData = [];
        var yAxisData = [];
        for (var i = 1; i < 20; i++) {
          xAxisData.push(i);
        }
        var Option = {
          animation: false,
          color: ["#DE2525"],
          grid: {
            left: 0,
            right: 0
          },
          xAxis: {
            show: false,
            boundaryGap: true,
            data: xAxisData
          },
          yAxis: { show: false, boundaryGap: false },
          series: {
            symbol: "none" /*去掉小圆点*/,
            type: "line",
            smooth: true,
            data: yAxisData /*,             smooth:true//显示为平滑的曲线*/
          }
        };
        myChart.setOption(Option);
        var k = 0;
        window.pushApp.ecgSingle.func()
        window.fk = setInterval(() => {
          
          if (k < 50) {
            yAxisData.push(Math.round(Math.random() * 1000));
            if (yAxisData.length > 20) {
              yAxisData.shift();
            }
            myChart.setOption(Option);
            this.stateIng = true;
          } else if (k == 50) {          
            this.showState = true;
            this.stateIng = false;
            this.frequency = Number( "9" + (Math.random()*10).toFixed(0));
            this.healthIndex =Number((Math.random()*100).toFixed(0));
            this.value = this.frequency
           
           // this.add(this.frequency,this.healthIndex)
          }
          k++;
        }, 200);
        myChart.setOption(Option);
      }
    }
  },
  created() {},
  mounted() {
    window.fk = "";
    let that =  this
    window.pushApp.ecgSingle.callback = (data)=>{
        that.$dialog.alert({
            title: '心电图测量结果',
            message: data,
        })
    }
  //  this.value = 89
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.ring-1 {
    width:4.92rem;
    height:4.92rem;
    background:url("../../../assets/image/heartRate.gif");
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

#echart_1 {
  background: url('../../../assets/image/bgr.png');
  background-size: cover;
}

.ring-2 {
  width: 4.08rem;
  height: 4.08rem;
  margin: 0 auto;
  border-radius: 50%;
  border: 0.53rem solid rgba(255, 25, 25, 0.2);
  box-sizing: border-box;
}

.ring-view-0 {
    width: 100%;
    height: 0.7rem;
    box-sizing: border-box;
    text-align: center;
    color: #4d4d4d;
    font-size: 0.4rem;
    line-height: 0.7rem;
}

.ring-view-1 {
  width: 100%;
  color: #DE2525;
  font-size: 0.85rem;
  font-weight: bold;
  text-align: center;
  line-height: 1rem;
}
.ring-view{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.ring-view-2 {
  width: 100%;
  color: #808080;
  font-size: 0.32rem;
  text-align: center;
  padding-top: 0.12rem;
  line-height: 0.55rem;
}

.mubiaoset {
  width: 0.53rem;
  margin-right: 0.2rem;
}
.ring-view-image{    
    box-sizing: border-box;
    text-align: center;
}
.ring-view-image img{
    width: 0.93rem;
}
.van-cell {
  border-top: 0rem solid #E5E5E5 !important;
  margin: 10px 0;
}

.heart-view {
  width: 100%;
  height: calc(100% - 8.47rem);
}

.view-fixed {
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

.view-fixed-but-1 {
  width: 100%;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
}

.page-view-1 {
  height: 1.35rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  flex-wrap: wrap;
}

.page-view-1>>>.van-progress {
  border-radius: 0px;
}

.page-view-1>>>.van-progress__pivot {
  display: none;
}

.page-tip {
  color: #151515;
  font-size: 0.32rem;
}
.close-icon{
    position: absolute;
    top: 10%;
    left: 0.9rem;
    font-weight: bold;
    font-size: 0.8rem !important;
    color: #fff !important;
}
.widows{
  width: 5.16rem;
  height: 4.39rem;
  background: #fff;
  border-radius: 15px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 0.32rem 0.16rem;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}
.win-1{
   display:flex;

   border-bottom: 2px solid #B3B3B3;
}
.win-2{
   color:#FF7519;
   font-size:0.48rem;
   font-weight:500;
   line-height:1.2rem;
   text-align:center;
}
.win-1 label{
  display:block;
  line-height:1.2rem;
}
.win-1 .label-1{
  text-align:center;
  width:60%;
  color:#343434;
  font-size:0.4rem;
}
.win-1 .label-2{
  text-align:left;
  color:#343434;
  width:40%;
  font-size:0.82rem;
}
</style>