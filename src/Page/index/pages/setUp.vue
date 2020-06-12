<template>
    <div>
        <my-head :type="4" leftIcon="1" :name="`${lang.setUpTip1}`" @ckLeft="closePage"><div slot="right"></div></my-head>
        <div>
          <div class="list-view" @click="ck_select(1)">
              <div class="list-view-left">
                  <label class="list-view-label-a">{{lang.setUpTip2}}</label>
                  <label class="list-view-label-b">{{lang.setUpTip3}}</label>
              </div>
              <div class="list-view-right">
                  <img v-if="index==1" style="width:0.54rem;" src="../../../assets/image/select.png">
              </div>
          </div>
          <div class="list-view" @click="ck_select(2)">
              <div class="list-view-left">
                  <label class="list-view-label-a">{{lang.setUpTip4}}</label>
                  <label class="list-view-label-b">{{lang.setUpTip5}}</label>
              </div>
              <div class="list-view-right">
                  <img v-if="index==2" style="width:0.54rem;" src="../../../assets/image/select.png">
              </div>
          </div>
        </div>
        <div class="line"></div>
        <div>
          <div class="list-view" >
              <div class="list-view-left">
                  <label class="list-view-label-a">{{lang.setUpTip6}}</label>
                  <label class="list-view-label-b">{{lang.setUpTip7}}</label>
              </div>
              <div class="list-view-right">
                  <van-switch v-model="checked" active-color="#fa901e" size="0.42rem" inactive-color="#cccccc" />
              </div>
          </div>
        </div>
       

    </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      index:1,
      checked:false
    };
  },
  watch:{
    index(val){
      localStorage.set_index = val
      window.pushApp.heartRateSetUp.func({realTime:val==1?true:false,staticState:val!=1?true:false,timing:this.checked})
    },
    checked(val){
      localStorage.set_checked = val
      window.pushApp.heartRateSetUp.func({realTime:this.index==1?true:false,staticState:this.index!=1?true:false,timing:val})
    }
  },
  methods: {
    ck_select(index){
      this.index = index
    }
  },
  created() {},
  mounted() {
    this.index = localStorage.set_index ?? 1
    this.checked = localStorage.set_checked=='true'?true:false
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.list-view{
  display:flex;
  margin: 0.1rem 0.3rem 0 0.3rem;
  padding:0.1rem 0;
  align-items: center;
  border-bottom:1px solid #E5E5E5; 
}
.list-view:last-of-type{
  border-bottom:0 solid #E5E5E5; 
}
.list-view-left{
  width:70%;
}
.list-view-right{
  width:30%;
  text-align: right;
}
.list-view-left label{
  display:block;
}
.list-view-label-a{
   color:#161616;
   font-size 0.4rem;
   font-weight:500;
   line-height:0.5rem;
}
.list-view-label-b{
  color:#808080;
  font-size:0.23rem;
  line-height:0.5rem;
}
.line{
  height:0.21rem;
  width:100%;
  background:#E6E6E6;
}
</style>