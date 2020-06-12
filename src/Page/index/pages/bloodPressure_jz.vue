<template>
    <div class="page-view">
        <my-head :name="lang.bloodTip4" leftIcon=1 @ckLeft="closePage" type=4 rightIcon="false"></my-head>
        <div class="page-code">
            <div class="page-code-1">{{lang.bloodTip5}}<br/>{{lang.bloodTip10}}</div>
            <div class="page-code-2" @click="openWin">{{lang.bloodTip6}}<br/>{{lang.bloodTip11}}</div>
            <div class="page-code-3">{{lang.bloodTip7}}:<span>{{val1}}/{{val2}}</span></div>
        </div>
        <div class="page-tips">
            <p>{{lang.bloodTip8}}</p>
            <div>{{lang.bloodTip9}}</div>
        </div>

        <van-overlay :show="showState" >
      <div class="wrapper" @click.stop>
          <div class="widows">
            <p class="win-title">输入血压计测量结果</p>
            <div class="win-from"><label>收缩压（高压）</label><input v-model="val1" > <img @click="qc1" src="../../../assets/image/x1.png"> </div>
            <div class="win-from"><label>收缩压（高压）</label><input v-model="val2"> <img @click="qc2" src="../../../assets/image/x1.png"> </div>
            <div class="win-but">
                <div class="but-1" @click="close">取消</div>
                <div class="but-2" @click="close">确认</div>
            </div>
          </div>
      </div>
    </van-overlay>
    </div>
</template>
<script>
export default {
    components:{},
    data() {
        return {
           showState:false,
           val1:120,
           val2:70,
        }
    },
    methods: { 
        close(){
            this.showState = false;
        },
        qc1(){
            this.val1 = ""
        },
        qc2(){
            this.val2 = ""
        },
        openWin(){
            this.showState = true;
        },
    },created(){
       
    },mounted () {     
        
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.page-view .page-code{
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-items: center;
}
.page-code-1{
    color:rgba(128, 128, 128, 1);
    text-align: center;
    font-size:0.31rem;
    margin: 0.2rem 0;
}
.page-code-2{
    text-align:center;
    color:#ffffff;
    background:#FB9B06;
    display: inline-block;
    border-radius: 0.33rem;
    font-size:0.59rem;
    padding: 0.1rem 0.3rem;
    margin: 0.4rem 0;
}
.page-code-3{
    color:#272727;
    font-size:0.25rem;
    display: flex;
    align-items: center;
    font-weight:500;
}
.page-code-3 span{
    color:#333333;
    font-size:0.45rem;
    font-family:"Bahnschrift";
    padding-left:0.1rem;
}
.page-tips{
    width: calc(100% - 1.5rem);
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 0.15rem 0.35rem 0.35rem 0.35rem;
    border-radius:0.33rem;
    margin-top: 0.9rem;
}
.page-tips p{
    line-height:0.8rem;
    color:#333333;
    font-size:0.34rem;
    font-weight:500; 
}
.page-tips div{
    color:#C1C1C1;
    font-size:0.25rem;
    line-height:0.43rem;
}
.widows{
  width: 6.16rem;
  height: 4.64rem;
  background: #fff;
  border-radius: 15px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 0.32rem 0.4rem;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}
.win-title{
    line-height:0.6rem;
    font-size:0.33rem;
    color:#333333;
    font-weight:500;
}
.win-from{
    line-height: 1.1rem;
    border-bottom: 2px solid #C1C1C1;
    display: flex;
    align-items: center;
}
.win-from label{
    color: #808080;
    font-size:0.33rem;
    display:block;
    width:calc(50% - 0.27rem);
}
.win-from input{
    text-align:right;
    font-size:0.33rem;
    width:50%;
    padding-right:0.3rem;
    box-sizing:border-box;
}
.win-from img{
    width:0.27rem;
}
.win-but{
    display:flex;
    line-height: 1.3rem;
    justify-content: flex-end;
}
.but-1,.but-2{
    color:#FB9B06;
    font-size:0.4rem;
    font-weight:500;
    width:1.5rem;
    text-align: center;
}
</style>