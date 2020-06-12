<template>
  <div class="page-view">
    <my-head :type="4" leftIcon="1" :name="`${lang.heatTip2}`" @ckLeft="closePage"  @ckRight="ckRight"></my-head>
    <div style="height: calc(100% - 1.2rem);overflow-y: scroll;">
      <van-collapse @change="change" class="item-cell" v-model="activeName" accordion>
        <van-collapse-item
          v-for="(item,key,index) in dataList"
          :key="index"
          :title="key.slice(5, 10).replace('-','月')+'日'"
          :name="key"
        >
          <div class="heart-view-2" v-for="(it,i) in item" :key="i">
            <div>
              <span class="heart-view-span-1">{{it.frequency}}</span>
              <span class="heart-view-span-2">{{lang.sequence}}/{{lang.minutes}}</span>
            </div>
            <span class="heart-view-span-3">            
              {{util.dateFormat(it.createTime,"HH:mm")}}
            </span>
          </div>
          <div v-if="item.length==0"> <van-empty image="error" :description="key+' 无历史数据'" /> </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <v-screen ref="screen" index="1" @select="select"></v-screen>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activeName: "",
      currentPage: 1,
      pageSize: 50,
      type: 1,
      resultList: [],
      dataList: null
    };
  },
  methods: { 
    select(index) {
      this.type = index;
      if (index == 1) {
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"),0);
      } else if (index == 2) {
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"),0);
      } else if (index == 3) {
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"),0);
      }
    },
    ckRight() {
      this.$refs.screen.open();
    },
    change(val) {
      if(val){
        if(!this.dataList[val].length){
         this.getDayData(val,1);
        }
      }
    },
    getDayData(opt_date,state) {
      this.Http(this.api["HeartRateDay"], {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        dateString: opt_date
      }).then(res => {
        if (res.data.code == "000") {
          this.activeName = opt_date;
          this.resultList = res.data.result.list;
          if(state==0){
            this.dataList = new Object();
          }
          if (this.type == 1) {
            // 日
            this.dataList[opt_date] = this.resultList;
          } else if (this.type == 2) {
            // 周
            if(state==0){
              let week = this.util.WeekDate();
              for (let i = 0; i < week.length; i++) {
                this.dataList[week[i]] = [];
              }
            }
            this.dataList[opt_date] = this.resultList;
            this.dataList = JSON.parse(JSON.stringify(this.dataList))
          } else if (this.type == 3) {
            if(state==0){
              let week = this.util.MonthDate();
              for (let i = 0; i < week.length; i++) {
                this.dataList[week[i]] = [];
              }
            }
            this.dataList[opt_date] = this.resultList;
            this.dataList = JSON.parse(JSON.stringify(this.dataList))
          }
        }
      });
    },
    getWeekData() {
      this.Http(this.api["HeartRateWeek"], {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        dateString: this.util.dateFormat("", "YYYY-MM-DD")
      }).then(res => {
        if (res.data.code == "000") {
          this.resultList = res.data.result.list;
          this.dataList = new Object();
        }
      });
    },
    getMonthData() {
      this.Http(this.api["HeartRateMonth"], {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        dateString: this.util.dateFormat("", "YYYY-MM")
      }).then(res => {
        if (res.data.code == "000") {
          this.dataList = res.data.result.list;
        }
      });
    }
  },
  created() {},
  mounted() {
    this.select(1);
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.item-cell>>>.van-cell__title {
  color: #151515;
  font-size: 0.36rem;
  font-weight: 500;
}

.item-cell >>> .van-cell {
  border-top: 0 solid #E5E5E5 !important;
}

.view-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0.47rem;
  height: 0.85rem;
  line-height: 0.85rem;
}

.view-cell-1 {
  color: #151515;
  font-size: 0.36rem;
  font-weight: 500;
}

.view-cell-2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-cell-2 i {
  font-weight: bold;
  font-size: 0.55rem !important;
}

.view-cell-line {
  height: 0.21rem;
  background: #E6E6E6;
}

.heart-view-2 {
  margin: 4px 16px 0 16px;
  line-height: 0.73rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E5E5E5;
}

.heart-view-span-1 {
  color: #252525;
  font-size: 0.71rem;
  display: inline-block;
  min-width: 45px;
}

.heart-view-span-2 {
  color: #808080;
  font-size: 0.27rem;
  margin-left: 5px;
}

.heart-view-span-3 {
  color: #808080;
  display: inline-block;
  min-width: 50px;
  font-size: 0.33rem;
}

.heart-view-span-3 span {
  color: #282828;
  font-weight: 500;
  font-size: 0.38rem;
  padding-right: 0.3rem;
}
</style>