<template>
  <div class="page-view">
    <my-head :type="4" leftIcon="1" :name="`${lang.heatTip2}`" @ckLeft="closePage" @ckRight="ckRight"></my-head>
    <div style="height: calc(100% - 1.2rem);overflow-y: scroll;">
      <van-collapse @change="change" class="item-cell" v-model="activeName" accordion>
        <van-collapse-item
          v-for="(item,key,index) in dataList"
          :key="index"
          :title="dateTime"
          :name="key"
          class="aa_aa"
        >
          <div class="heart-view-2" v-for="(it,i) in item" :key="i">
            <div>
              <span class="heart-view-span-1">{{it.saturate}}</span>
              <span class="heart-view-span-2">{{lang.spoTip1}}</span>
            </div>
            <span class="heart-view-span-3">             
             {{it.createTime.slice(11,16)}}
            </span>
          </div>
          <div v-if="item.length==0"> <van-empty description="暂 无 数 据 生 成"  :image="errorImage" /> </div>
        </van-collapse-item>
      </van-collapse>
    </div>
   <my-date class="my-date" ref="myDate" @clickDay="clickDay" v-show="myDateState"></my-date>
  </div>
</template>
<script>
import myDate from "../../../components/calendar";
export default {
   components: {myDate},
   data() {
    return {
      activeName: "",
      currentPage: 1,
      pageSize: 50,  
      myDateState: false,    
      resultList: [],
      dataList: null,
      dateTime:"",
    };
  },
  methods: {
      clickDay(data){           
        this.dateTime = data.replace("-","年").replace("-","月")+"日"
        this.change(data)
    },
    ckRight() {
      this.myDateState = true;
    },
    change(val) {
      if(val){
        if(!this.dataList[val]?.length){
         this.getDayData(val);
        }
      }
    },
    getDayData(opt_date) {
      this.Http(this.api["BloodOxygenDay"], {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        dateString: opt_date
      }).then(res => {
        if (res.data.code == "000") {
            this.activeName = opt_date;
            this.resultList = res.data.result.list;
            this.dataList = new Object();
            this.dataList[opt_date] = this.resultList;
        }
      });
    }
  },
  created() {},
  mounted() {
     this.getDayData(this.util.dateFormat("", "YYYY-MM-DD"))
      this.dateTime = this.util.dateFormat("", "YYYY-MM-DD").replace("-","年").replace("-","月")+"日"
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
    min-width: 1.1rem;
}

.heart-view-span-2 {
  color: #808080;
  font-size: 0.27rem;
  margin-left: 5px;
}

.heart-view-span-3 {
  color: #808080;
  display: inline-block;
  font-size: 0.33rem;
}

.heart-view-span-3 span {
  color: #282828;
  font-weight: 500;
  font-size: 0.38rem;
  padding-right: 0.3rem;
}
</style>