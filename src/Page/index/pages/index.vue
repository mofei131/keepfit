<template>
    <div style="height:100%;width:100%;">
        <div class="page-head">
            <div></div>
            <div><span> 页面路由 </span>         </div>
            <div> </div>
        </div>
        <div style="height:calc(100% - 1.2rem);overflow: auto;">
            <van-cell title="步数历史(日)" is-link to="hStepsDay" />
            <van-cell title="步数历史(周)" is-link to="hStepsWeek" />
            <van-cell title="步数历史(月)" is-link to="hStepsMonth" />
            <van-cell title="睡眠历史(日)" is-link to="sleepDay" />
            <van-cell title="睡眠历史(周)" is-link to="sleepWeek" />
            <van-cell title="睡眠历史(月)" is-link to="sleepMonth" />

            <van-cell title="心率" is-link to="heartRate" />
            <van-cell title="心率 历史记录" is-link to="historyHeartRate" />
            <van-cell title="心率 定时监测设置" is-link to="setUp" />

            <van-cell title="血压" is-link to="bloodPressure" />      
            <van-cell title="血压 历史记录" is-link to="historyBloodPressure" /> 
            <van-cell title="血压 校准设置" is-link to="bloodPressure_jz" />

            <van-cell title="血氧" is-link to="spo" />
            <van-cell title="血氧 历史记录" is-link to="historySpo" />

            <van-cell title="体温" is-link to="temperature" />
            <van-cell title="体温  历史记录" is-link to="historyTemperature" />

            <van-cell title="心电图" is-link to="ecg" />
            <van-cell title="心电图 历史记录" is-link to="historyEcg" />

            <van-cell title="运动" is-link to="motion" />
        
            <van-cell title="健康报告" is-link to="healthReport" />
        </div>
        
    </div>
</template>
<script>
export default {
    components:{},
    data() {
        return {
           
        }
    },
    methods: { 
    },created(){
    },mounted () {     
        this.login()
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.page-head{
    height:1.2rem;  
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 0  0.513rem;
}
</style>