<template>
  <div>
    <my-head :type="4" leftIcon="1" @ckLeft="closePage" :name="`${lang.healthReportTip1}`">
      <img slot="right" style="width:0.6rem;" src="../../../assets/image/share_.png" />
    </my-head>
    <p class="title-p">{{lang.healthReportTip2}}</p>
    <p class="title-value">54</p>
    <van-slider class="my-van" v-model="value" :step="1" disabled />
    <div class="van-label">
      <span>{{lang.healthReportTip3}}</span>
      <span>{{lang.healthReportTip4}}</span>
      <span>{{lang.healthReportTip5}}</span>
    </div>
    <div class="line-title">{{lang.healthReportTip6}}</div>
    <div class="view-item">
      <div>
        <span class="span-1">{{lang.healthReportTip7}}</span>
        <span class="span-2">45</span>
      </div>
      <div>
        <span class="span-1">{{lang.healthReportTip8}}</span>
        <span class="span-2">57</span>
      </div>
      <div>
        <span class="span-1">{{lang.healthReportTip9}}</span>
        <span class="span-2">27</span>
      </div>
    </div>
    <div class="view-item">
      <div>
        <span class="span-1">{{lang.healthReportTip10}}</span>
        <span class="span-2">60</span>
      </div>
      <div>
        <span class="span-1">{{lang.healthReportTip11}}</span>
        <span class="span-2">34</span>
      </div>
      <div>
        <span class="span-1">{{lang.healthReportTip12}}</span>
        <span class="span-2">1.0</span>
      </div>
    </div>
    <div class="line-title">{{lang.healthReportTip13}}</div>
    <div class="view-item">
      <div>
        <span class="span-1">{{lang.healthReportTip14}}</span>
      </div>
      <div>
        <span class="span-1">{{lang.healthReportTip15}}</span>
      </div>
      <div>
        <span class="span-1">{{lang.healthReportTip16}}</span>
      </div>
    </div>
    <div class="view-item">
      <div>
        <span class="span-1">{{lang.healthReportTip17}}</span>
      </div>
      <div>
        <span class="span-1">{{lang.healthReportTip18}}</span>
      </div>
      <div>
        <span class="span-1">{{lang.healthReportTip19}}</span>
      </div>
    </div>
    <div class="line-title">{{lang.healthReportTip20}}</div>
    <p class="line-tip">{{lang.healthReportTip21}}</p>
    <p class="line-tip">{{lang.healthReportTip22}}</p>
    <p class="line-tip">{{lang.healthReportTip23}}</p>
    <div class="line-title">{{lang.healthReportTip24}}</div>
    <div class="echart" id="echart_1">
      <div class="buton" @click="play">{{lang.healthReportTip25}}</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      value: 54
    };
  },
  methods: {
    play() {
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
      setInterval(function() {
        yAxisData.push(Math.round(Math.random() * 1000));
        if (yAxisData.length > 20) {
          yAxisData.shift();
        }
        myChart.setOption(Option);
      }, 200);
      myChart.setOption(Option);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.title-p {
  // letter-spacing:0.15rem;
  color: #808080;
  text-align: center;
  font-size: 0.34rem;
}

.title-value {
  color: #1A1A1A;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 500;
  line-height: 2rem;
}

.my-van {
  opacity: 1;
  height: 0.49rem;
  background-color: transparent;
}

.van-slider::before {
  background: url('../../../assets/image/line.png') no-repeat;
  background-size: contain;
}

.my-van>>>.van-slider__bar {
  background-color: transparent;
}

.my-van>>>.van-slider__button {
  border-radius: 0;
  width: auto;
  height: auto;
  box-shadow: 0 0px 0px #FF7519;
  border: 0.24rem solid transparent;
  border-top-color: #FF7519;
  background-color: transparent;
  position: relative;
  top: -0.28rem;
}

.van-label {
  display: flex;
  position: relative;
  top: -0.2rem;
  margin-bottom: 0.2rem;
}

.van-label span {
  display: block;
  width: 33.33%;
  text-align: center;
  color: #4D4D4D;
  font-size: 0.29rem;
}

.line-title {
  color: #4D4D4D;
  font-weight: 500;
  font-size: 0.36rem;
  background: #E6E6E6;
  line-height: 0.66rem;
  padding-left: 0.4rem;
  margin-top: 0.15rem;
}

.view-item {
  display: flex;
}

.view-item div {
  width: 33.33%;
  margin: 0.2rem 0;
}

.view-item div span {
  display: block;
  text-align: center;
}

.span-1 {
  color: #4D4D4D;
  line-height: 0.58rem;
  font-size: 0.3rem;
}

.span-2 {
  color: #FF7519;
  font-size: 0.71rem;
  font-weight: bold;
  line-height: 0.68rem;
}

.line-tip {
  color: #4D4D4D;
  font-size: 0.25rem;
  width: calc(100% - 0.8rem);
  margin: 0.2rem auto;
}

.echart {
  background: url('../../../assets/image/bgr.png');
  background-size: cover;
  height: 3.89rem;
  width: 100%;
  margin: 0 0 0.3rem 0;
}

.echart .buton {
  background: #FF7519;
  color: #fff;
  border-radius: 0.27rem;
  display: inline-block;
  padding: 4px 8px;
  margin: 15px;
}
</style>