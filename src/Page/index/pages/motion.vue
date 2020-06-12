<template>
  <div class="page-view">
    <my-head
      :name="titleName"
      @clickConten="clickConten"
      @ckLeft="closePage"
      type="4"
      @ckRight="ckRight"
    ></my-head>
    <van-collapse @change="change" class="item-cell" v-model="activeName" accordion>
      <van-collapse-item 
        v-for="(item,key,index) in dataList"
        :key="index"
        :title="key.slice(5, 10).replace('-','月')+'日'"
        :name="key"
      >
        <div class="item-code">
          <div class="item-li">
            <div class="item-li-left">
              <span class="span-1">{{lang.motionTip2}}</span>
              <span class="span-2">{{item.obj?item.obj.kingpoDistance:"--"}}</span>
            </div>
            <div class="item-li-center"></div>
            <div class="item-li-right">
              <span class="span-1">{{lang.motionTip3}}</span>
              <span class="span-2">{{item.obj?item.obj.runningDistance:"--"}}</span>
            </div>
          </div>
          <div class="item-li">
            <div class="item-li-left">
              <span class="span-1">{{lang.motionTip4}}</span>
              <span class="span-2">{{item.obj?item.obj.cyclingDistance:"--"}}</span>
            </div>
            <div class="item-li-center"></div>
            <div class="item-li-right">
              <span class="span-1">{{lang.motionTip5}}</span>
              <span class="span-2">{{item.obj?item.obj.climbingDistance:'--'}}</span>
            </div>
          </div>
          <div class="item-cell-1" v-for="(it,k_) in item.data" :key="k_">
            <img src="../../../assets/image/run.png" />
            <div class="div-1">
              <span class="item-cell-span-1">5.00</span>
              <span class="item-cell-span-2">{{lang.distanceUnit}}</span>
            </div>
            <div class="line"></div>
            <div class="div-2">
              <span class="item-cell-span-1">140</span>
              <span class="item-cell-span-2">{{lang.motionTip6}}</span>
            </div>
            <div class="line"></div>
            <div class="div-3">
              <span class="item-cell-span-1">3000</span>
              <span class="item-cell-span-2">{{lang.heatQuantity}}</span>
            </div>
            <div class="line"></div>
            <div class="div-4">
              <span class="item-cell-span-1">0.23</span>
              <span class="item-cell-span-2">{{lang.motionTip7}}</span>
            </div>
            <p>
              <span class="item-cell-span-a">4/19</span>
              <span class="item-cell-span-b">12:20</span>
            </p>
          </div>
        </div>
        <div v-if="item.data.length==0"> <van-empty image="error" :description="key+' 无历史数据'" /> </div>
        
      </van-collapse-item>     
    </van-collapse>
    <van-overlay :show="showState" @click="showState = false">
      <div class="wrapper" @click.stop>
        <div class="widows">
          <div class="list-li">
            <div @click="select('所有',0)" :class="{'action':index==0}">所有</div>
            <div @click="select('健步',1)" :class="{'action':index==1}">健步</div>
            <div @click="select('跑步',2)" :class="{'action':index==2}">跑步</div>
            <div @click="select('骑行',3)" :class="{'action':index==3}">骑行</div>
            <div @click="select('打球',4)" :class="{'action':index==4}">打球</div>
          </div>
        </div>
      </div>
    </van-overlay>
    <v-screen ref="screen" :index="type" @select="select1"></v-screen>
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
      dataList: null
    };
  },
  methods: {
    ckRight() {
      this.$refs.screen.open();
    },
    select1(index) {
      this.type = index;
      if (index == 1) {
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"),0);
      } else if (index == 2) {
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"),0);
      } else if (index == 3) {
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"),0);
      }
    },
    select(name, index) {
      this.index = index;
      this.titleName = name + "数据";
      this.showState = false;
      this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"),0);
     
    },
    add(){
        this.Http(this.api["SaveClimbing"], 
          {
              //  "createTime": this.util.dateFormat("","YYYY-MM-DD HH:mm:ss"),
                "burnCalorie":Number( "3" + (Math.random()*10).toFixed(1)),    
                "distance":Number( "1" + (Math.random()*10).toFixed(1)),    
                "duration":Number((Math.random()*1000).toFixed(0)),
                "minkm":Number((Math.random()*10).toFixed(0)),
                "stepNum":Number((Math.random()*1000).toFixed(0)),
            }
        ).then(res => { console.log(res) })

        this.Http(this.api["SaveCycling"], 
          {              
                "burnCalorie":Number( "3" + (Math.random()*10).toFixed(1)),    
                "distance":Number( "1" + (Math.random()*10).toFixed(1)),    
                "duration":Number((Math.random()*1000).toFixed(0)),
                "minkm":Number((Math.random()*10).toFixed(0)),
                "stepNum":Number((Math.random()*1000).toFixed(0)),
            }
        ).then(res => { console.log(res) })

        this.Http(this.api["SaveKingpo"], 
          {              
                "burnCalorie":Number( "3" + (Math.random()*10).toFixed(1)),    
                "distance":Number( "1" + (Math.random()*10).toFixed(1)),    
                "duration":Number((Math.random()*1000).toFixed(0)),
                "minkm":Number((Math.random()*10).toFixed(0)),
                "stepNum":Number((Math.random()*1000).toFixed(0)),
            }
        ).then(res => { console.log(res) })

        this.Http(this.api["SaveRunning"], 
          {              
                "burnCalorie":Number( "3" + (Math.random()*10).toFixed(1)),    
                "distance":Number( "1" + (Math.random()*10).toFixed(1)),    
                "duration":Number((Math.random()*1000).toFixed(0)),
                "minkm":Number((Math.random()*10).toFixed(0)),
                "stepNum":Number((Math.random()*1000).toFixed(0)),
            }
        ).then(res => { console.log(res) })
    },
    change(val) {
      if(val){
        if(!this.dataList[val].length){
         this.getDayData(val,1);
        }
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
          if (state == 0) {
            this.dataList = new Object();
          }
          if (this.type == 1) {
            // 日
            this.dataList[opt_date] = {data:this.resultList,obj: res.data.result.obj};
          } else if (this.type == 2) {
            // 周
            if (state == 0) {
              let week = this.util.WeekDate();
              for (let i = 0; i < week.length; i++) {
                this.dataList[week[i]] = {data:[],obj:{}};
              }
            }
            this.dataList[opt_date] = {data:this.resultList,obj: res.data.result.obj}
            this.dataList = JSON.parse(JSON.stringify(this.dataList));
          } else if (this.type == 3) {
            if (state == 0) {
              let week = this.util.MonthDate();
              for (let i = 0; i < week.length; i++) {
                this.dataList[week[i]] = {data:[],obj:{}};
              }
            }
            this.dataList[opt_date] = {data:this.resultList,obj: res.data.result.obj}
            this.dataList = JSON.parse(JSON.stringify(this.dataList));
          }
        }
        console.log(this.dataList)
      });
    },
    clickConten() {
      this.showState = true;
    }
  },
  created() {},
  mounted() {
    this.titleName = this.lang.motionTip1;
    this.select1(1);
     this.add()
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.item-cell>>>.van-cell__title {
  color: #151515;
  font-size: 0.37rem;
  font-weight: 500;
}

.item-cell >>> .van-cell {
  border-top: 0 solid #E5E5E5 !important;
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
</style>