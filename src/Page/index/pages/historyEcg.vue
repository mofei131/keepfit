<template>
  <div class="page-view">
    <my-head :type="4" leftIcon="1" :name="`${lang.ecgTip4}`" @ckLeft="closePage"  @ckRight="ckRight">
      <img slot="right" style="width:0.47rem;" src="../../../assets/image/refurbish.png" />
    </my-head>
    <div style="height: calc(100% - 1.2rem);overflow-y: scroll;">
      <van-collapse @change="change" class="item-cell" v-model="activeName" accordion>
        <van-collapse-item
          v-for="(item,key,index) in dataList"
          :key="index"
          :title="key.slice(5, 10).replace('-','月')+'日'"
          :name="key"
        >
          <!-- <div class="heart-view-2" v-for="(it,i) in item" :key="i">
            <div>
              <span class="heart-view-span-1">{{it.degree.toFixed(1)}}</span>
              <span class="heart-view-span-2">{{lang.wdTip1}}</span>
            </div>
            <span class="heart-view-span-3">
              <span>{{it.type==1?lang.wdTip4:lang.wdTip5}}</span>
              {{util.dateFormat(it.createTime,"HH:mm")}}
            </span>
          </div>-->
          <van-cell class="my-cell" value is-link v-for="(it,i) in item" :key="i">
            <template #title>
              <van-tag style="background-color: transparent;">
                <img class="mubiaoset" src="../../../assets/image/ecg.png" />
              </van-tag>
              <div class="cell-view">
                <div class="cell-view-1">
                  <span class="span-1">{{it.healthIndex}}</span>
                  <span class="span-2">健康指数</span>
                </div>
                <div class="cell-view-1">
                  <span class="span-1">{{it.frequency}}</span>
                  <span class="span-2">平均心率</span>
                </div>
                <div class="cell-view-1">
                  <span class="span-1">{{ it.createTime.slice(11,16)}}</span>
                  <span class="span-2">{{it.createTime.split(" ")[0].replace(/\-/g,".")}}</span>
                </div>
              </div>
            </template>
          </van-cell>
          <div v-if="item.length==0">
            <van-empty image="error" :description="key+' 无历史数据'" />
          </div>
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
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"), 0);
      } else if (index == 2) {
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"), 0);
      } else if (index == 3) {
        this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"), 0);
      }
    },
    ckRight() {
      this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"), 0);
    },
    change(val) {
      if (val) {
        if (!this.dataList[val].length) {
          this.getDayData(val, 1);
        }
      }
    },
    getDayData(opt_date, state) {
      this.Http(this.api["EcgDay"], {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        dateString: opt_date
      }).then(res => {
        if (res.data.code == "000") {
          this.activeName = opt_date;
          this.resultList = res.data.result.list;
          if (state == 0) {
            this.dataList = new Object();
          }
          if (this.type == 1) {
            // 日
            this.dataList[opt_date] = this.resultList;
          } else if (this.type == 2) {
            // 周
            if (state == 0) {
              let week = this.util.WeekDate();
              for (let i = 0; i < week.length; i++) {
                this.dataList[week[i]] = [];
              }
            }
            this.dataList[opt_date] = this.resultList;
            this.dataList = JSON.parse(JSON.stringify(this.dataList));
          } else if (this.type == 3) {
            if (state == 0) {
              let week = this.util.MonthDate();
              for (let i = 0; i < week.length; i++) {
                this.dataList[week[i]] = [];
              }
            }
            this.dataList[opt_date] = this.resultList;
            this.dataList = JSON.parse(JSON.stringify(this.dataList));
          }
        }
      });
    }
  },
  created() {},
  mounted() {
    this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"), 0);
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
}

.heart-view-span-2 {
  color: #808080;
  font-size: 0.27rem;
  margin-left: 5px;
}

.heart-view-span-3 {
  color: #808080;
  font-size: 0.33rem;
}

.my-cell .van-cell__title {
  flex: 5 !important;
}

.mubiaoset {
  width: 0.91rem;
}

.cell-view {
  width: calc(100% - 0.91rem);
  display: flex;
}

.cell-view-1 {
  width: 33.33%;
}

.cell-view-1 span {
  display: block;
  text-align: center;
}

.cell-view-1 .span-1 {
  font-size: 0.47rem;
  color: #151515;
  font-weight: 500;
}

.cell-view-1 .span-2 {
  color: #808080;
  font-size: 0.2rem;
}

.page-view>>>.van-cell {
  border-top: 0rem solid #E5E5E5 !important;
}
</style>