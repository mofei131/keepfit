(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a6e2d46"],{"15db":function(t,e){t.exports={grid:{left:10,top:10,right:20,bottom:10},tooltip:{trigger:"axis",showDelay:2e9,axisPointer:{shadowStyle:{color:"red",opacity:.1}}},color:["#EBCDFE"],xAxis:{data:["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],type:"category",splitLine:{show:!1},axisLine:{show:!1},axisTick:{show:!1},axisPointer:{type:"line",lineStyle:{color:"#EBCDFE",opacity:1,width:.5}},axisLabel:{show:!1,color:"red",fontSize:10}},yAxis:{type:"value",position:"right",splitNumber:2,splitLine:{show:!0,lineStyle:{width:.5,type:"dashed",color:"#ccc"}},axisLine:{show:!1},axisTick:{show:!1},axisLabel:{color:"#999",fontSize:10,margin:-10}},series:[{name:"步数",type:"bar",data:[1027,1027,2549,2260,1027,1278,1027,1842,2549,2260,1671,3278,5555,3600,1027,5555,5555,5555,2456,7632,3546,3654,3214,2564],barWidth:8}]}},"228c":function(t,e){t.exports={backgroundColor:"#fff",selectedMode:!1,grid:{left:5,top:5,right:5,bottom:5},series:[{name:"睡眠时长",type:"pie",selectedOffset:4,selectedMode:"single",radius:"90%",center:["50%","50%"],color:["#AC009A","#5C73FF"],data:[{value:22,name:"浅睡",selected:!0},{value:78,name:"深睡"}],label:{normal:{show:!0,position:"inside",formatter:"{c}%",textStyle:{fontSize:14,color:"#B1BCFF",fontWeight:500}},emphasis:{show:!0}}}]}},"87e8":function(t,e,a){"use strict";var s=a("e2a3"),i=a.n(s);i.a},"8a5e":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-view"},[a("my-head",{attrs:{name:t.dateTime,type:1},on:{ckLeft:t.closePage,clickConten:t.clickConten,ckRight:t.ckRight}}),a("div",{staticClass:"page-time"},[a("span",[t._v(t._s(t.timeList[t.value]))])]),a("div",{staticClass:"page-step"},[a("span",{staticClass:"page-step-2"},[t._v(t._s(t.lang.easySleep))]),a("span",{staticClass:"page-step-1"},[t._v("72")]),a("span",{staticClass:"page-step-2"},[t._v(t._s(t.lang.minute))])]),a("div",{staticClass:"img-view img-view-sleep"},[a("div",{staticClass:"img-echart"},[a("div",{staticClass:"img-left-icon"},[a("van-icon",{staticStyle:{height:"60px","line-height":"60px"},attrs:{color:"#B3B3B3",name:"arrow-left"},on:{click:t.lessValue}})],1),t._m(0),a("div",{staticClass:"img-right-icon"},[a("van-icon",{staticStyle:{height:"60px","line-height":"60px"},attrs:{color:"#B3B3B3",name:"arrow"},on:{click:t.addValue}})],1)]),a("div",{staticClass:"slider-view"},[a("div",{staticClass:"laebl-view"},[a("span",{class:{"slider-action":0==t.value}},[t._v("00:00")]),a("span",{class:{"slider-action":6==t.value}},[t._v("06:00")]),a("span",{class:{"slider-action":12==t.value},staticStyle:{"padding-left":"10px","box-sizing":"border-box"}},[t._v("12:00")]),a("span",{class:{"slider-action":18==t.value},staticStyle:{"padding-left":"18px","box-sizing":"border-box"}},[t._v("18:00")]),a("span",{class:{"slider-action":23==t.value}},[t._v("00:00")])]),a("div",{staticClass:"van-slider_diy",staticStyle:{width:"100%",background:"#AA0098",height:"2px"}},[a("van-slider",{staticStyle:{width:"80%",margin:"0 auto"},attrs:{max:"23",min:"0",step:1,"inactive-color":"#AA0098","active-color":"#AA0098"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)])]),a("div",{staticClass:"sleep-time"},[a("div",{staticClass:"sleep-time-1"},[t._v(t._s(t.lang.tip10))]),a("div",{staticClass:"sleep-time-2"},[a("span",{staticClass:"sleep-time-span-1"},[t._v("8")]),a("span",{staticClass:"sleep-time-span-2"},[t._v(t._s(t.lang.hour))]),a("span",{staticClass:"sleep-time-span-1"},[t._v("20")]),a("span",{staticClass:"sleep-time-span-2"},[t._v(t._s(t.lang.minute))])])]),a("div",{staticClass:"cake-echart",on:{click:function(t){t.stopPropagation(),t.preventDefault()}}},[t._m(1),a("div",{staticClass:"cake-echart-2"},[a("div",{staticClass:"leng-1"},[a("span",{staticClass:"span-1"},[a("i"),t._v(t._s(t.lang.deepSleep))]),a("span",{staticClass:"span-2"},[t._v("3"+t._s(t.lang.hour)+"10"+t._s(t.lang.minute))])]),a("div",{staticClass:"leng-1"},[a("span",{staticClass:"span-1"},[a("i",{staticStyle:{background:"#5C73FF"}}),t._v(t._s(t.lang.easySleep))]),a("span",{staticClass:"span-2"},[t._v("5"+t._s(t.lang.hour)+"10"+t._s(t.lang.minute))])]),a("div",{staticClass:"leng-2"},[a("span",{staticClass:"span-1"},[a("i"),t._v(t._s(t.lang.sober))]),a("span",{staticClass:"span-2"},[t._v("1"+t._s(t.lang.sequence))])])])]),a("div",{staticClass:"slider-code"},[a("p",{staticClass:"slider-code-p"},[t._v(t._s(t.lang.sleepQuality)+":"),a("span",[t._v(t._s(t.lang.sleep4))])]),a("van-slider",{attrs:{"bar-height":"8px",disabled:"",max:"4",min:"1",step:1},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}}),a("div",{staticClass:"slider-code-span-view"},[a("span",[t._v(t._s(t.lang.sleep1))]),a("span",[t._v(t._s(t.lang.sleep2))]),a("span",[t._v(t._s(t.lang.sleep3))]),a("span",[t._v(t._s(t.lang.sleep4))])])],1),a("div",{staticClass:"tip-view"},[a("p",{staticClass:"tip-view-1"},[t._v(t._s(t.lang.sleepTip1))]),a("p",{staticClass:"tip-view-2"},[t._v(t._s(t.lang.sleepTip2))])]),a("div",{staticStyle:{width:"100%",height:"60px"}}),a("v-screen",{ref:"screen",attrs:{index:"1"},on:{select:t.select}}),a("my-date",{directives:[{name:"show",rawName:"v-show",value:t.myDateState,expression:"myDateState"}],on:{clickDay:t.clickDay}})],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"img-code-echart"},[a("div",{attrs:{id:"code-echart-sleepday"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cake-echart-1",attrs:{id:"code-echart-2"}},[a("div")])}],l=(a("e35a"),a("5e9f"),a("15db")),n=a.n(l),c=a("228c"),o=a.n(c),r=a("3dc5"),p=["00:00 - 01:00","01:00 - 02:00","02:00 - 03:00","03:00 - 04:00","04:00 - 05:00","05:00 - 06:00","06:00 - 07:00","07:00 - 08:00","08:00 - 09:00","09:00 - 10:00","10:00 - 11:00","11:00 - 12:00","12:00 - 13:00","13:00 - 14:00","14:00 - 15:00","15:00 - 16:00","16:00 - 17:00","17:00 - 18:00","18:00 - 19:00","19:00 - 20:00","20:00 - 21:00","21:00 - 22:00","22:00 - 23:00","23:00 - 00:00"],d={components:{myDate:r["a"]},data:function(){return{dateTime:window.lang.headDay,timeList:p,value:12,value1:3,index:1,myChart:null,myDateState:!1,myWinState:!1,currentPage:1,pageSize:50,resultList:[],dataObj:null}},watch:{value:function(t){this.myChart.dispatchAction({type:"showTip",seriesIndex:0,dataIndex:t})}},methods:{lessValue:function(){this.value>0?this.value=this.value-1:this.value=23},addValue:function(){this.value<23?this.value=this.value+1:this.value=0},getDayData:function(t){var e=this;this.Http(this.api["SleepDay"],{dateString:t}).then((function(t){var a,s,i;"000"==t.data.code&&(e.resultList=null!==(a=t.data.result.list)&&void 0!==a?a:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],e.dataObj=null!==(s=t.data.result.obj)&&void 0!==s?s:null,e.value1=(null===(i=e.dataObj)||void 0===i?void 0:i.percent)||0,n.a.series[0].data=e.resultList,e.myChart.setOption(n.a))}))},clickConten:function(){this.myDateState=!0},clickDay:function(t){this.dateTime=t.replace("-","年").replace("-","月")+"日",this.getDayData(t)},select:function(t){1==t&&1!=this.index?this.$router.push({path:"/sleepDay"}):2==t&&2!=this.index?this.$router.push({path:"/sleepWeek"}):3==t&&3!=this.index&&this.$router.push({path:"/sleepMonth"})},ckRight:function(){this.$refs.screen.open()}},mounted:function(){var t=this,e=this.$echarts.init(document.getElementById("code-echart-2"));e.setOption(o.a),this.myChart=this.$echarts.init(document.getElementById("code-echart-sleepday")),this.myChart.setOption(n.a),this.getDayData(this.util.dateFormat("","YYYY-MM-DD")),1!=localStorage.userIndex&&(this.myWinState=!0),this.myChart.on("showTip",(function(e){window.curInt!=e.dataIndex&&(window.curInt=e.dataIndex,t.myChart.setOption(n.a),t.value=e.dataIndex)})),setTimeout((function(){t.myChart.dispatchAction({type:"showTip",seriesIndex:0,dataIndex:t.value})}),1e3)}},h=d,v=(a("87e8"),a("4023")),u=Object(v["a"])(h,s,i,!1,null,"5036c5c2",null);e["default"]=u.exports},e2a3:function(t,e,a){}}]);