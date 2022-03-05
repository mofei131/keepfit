<template>
    <div class="windows-view" @click="close">
        <div class="calendar-win" @click.stop="">
             <Calendar
            @choseDay="clickDay"
            :markDate=arr
            @changeMonth="changeDate"
            :futureDayHide = futureDayHide
            :agoDayHide = agoDayHide
            ></Calendar>
        </div>
       
    </div> 
</template>
<script>
import Calendar from 'vue-calendar-component';
export default {
    components:{
        Calendar
    },
    data() {
        return {
           arr:[],
           agoDayHide:"1589932800",
           futureDayHide:(new Date().getTime()).toString().slice(0, 10),
        }
    },
    methods: { 
        close(){
            this.$parent.myDateState = false
        },
        clickDay(data) {
            let dArray =  [];
            if(data.indexOf("/")!=-1){
                dArray = data.split("/")
            }else{
                dArray = data.split("-")
            }
            this.$emit("clickDay",dArray[0]+"-"+this.util.InternetFormat(dArray[1])+"-"+this.util.InternetFormat(dArray[2]))           
            this.arr=[data]
            this.close()            
        },
        changeDate(data) {
            console.log(data); //左右点击切换月份
        },
        lessD(){
            let d1 = this.arr[0];
            let d2 = this.util.getTimestamp(d1) - 1000*60*60*24 
            this.clickDay(this.util.dateFormat(d2, "YYYY-MM-DD"))
        },
        addD(){
            let d1 = this.arr[0];
            let d2 = this.util.getTimestamp(d1) + 1000*60*60*24           
            if(d2<new Date().getTime()){               
                this.clickDay(this.util.dateFormat(d2, "YYYY-MM-DD"))
            }
        },
        clickToday(data) {
            console.log(data); //跳到了本月
        }
    },created(){
       
    },mounted () {  
        this.arr = [this.util.dateFormat("", "YYYY-MM-DD")]   
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.windows-view{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:rgba(0,0,0,0.5);
}
.calendar-win{
    width:calc(100% - 1.7rem);
    margin: 1.2rem  auto 0 auto;
    position: relative;
}
.calendar-win::before{
    content: " ";
    display: block;
    border-left: 0.2rem solid transparent;
    border-right: 0.2rem solid transparent;
    border-bottom: 0.3rem solid #fff;
    width: 0.01rem;
    position: absolute;
    left: calc(50% - 0.2rem);
    top: -0.2rem;   
}
</style>