(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d3a489b"],{"1a4c":function(t,a,e){"use strict";var i=e("77a3"),s=e.n(i);s.a},"77a3":function(t,a,e){},a926:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"page-view"},[i("my-head-one",{attrs:{name:""+t.util.dateFormat("","年月日"),type:3},on:{ckLeft:t.closePage,ckRight:function(a){return t.openPage("historyHeartRate")}}}),i("div",{staticClass:"ring-1"},[i("div",{staticClass:"ring-view"},[t._m(0),i("div",{staticClass:"ring-view-1"},[t._v(t._s(t.value))]),i("div",{staticClass:"ring-view-2"},[t._v(t._s(t.lang.sequence)+"/"+t._s(t.lang.minutes))])])]),i("van-cell",{attrs:{value:"","is-link":""},on:{click:function(a){return t.openPage("setUp")}},scopedSlots:t._u([{key:"title",fn:function(){return[i("van-tag",{staticStyle:{"background-color":"transparent"}},[i("img",{staticClass:"mubiaoset",attrs:{src:e("af28")}})]),i("span",{staticClass:"custom-title"},[t._v(t._s(t.lang.heatTip1))])]},proxy:!0}])}),t._l(t.dataList,(function(a,e,s){return i("div",{key:s,staticClass:"heart-view"},[i("div",{staticClass:"heart-view-1"},[t._v(t._s(e))]),i("div",{staticClass:"heart-v"},t._l(a,(function(a,e){return i("div",{key:e,staticClass:"heart-view-2"},[i("div",[i("span",{staticClass:"heart-view-span-1"},[t._v(t._s(a.frequency))]),i("span",{staticClass:"heart-view-span-2"},[t._v(t._s(t.lang.sequence)+"/"+t._s(t.lang.minutes))])]),i("span",{staticClass:"heart-view-span-3"},[t._v(t._s(t.util.dateFormat(a.createTime,"HH:mm")))])])})),0)])})),i("div",{staticClass:"view-fixed"},[i("div",{staticClass:"view-fixed-but-1",on:{click:function(a){return t.add(1)}}},[t._v(t._s(t.lang.heatTip3)+" ")]),i("div",{staticClass:"view-fixed-line"}),i("div",{staticClass:"view-fixed-but-2",on:{click:function(a){return t.add(2)}}},[t._v(t._s(t.lang.heatTip4)+" ")])])],2)},s=[function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"ring-view-image"},[i("img",{attrs:{src:e("eb1d")}})])}],n={name:"refurbish",components:{},data:function(){return{resultList:[],dataList:null,value:"--",currentPage:1}},methods:{getDayData:function(t){var a=this;this.Http(this.api["HeartRateDay"],{currentPage:this.currentPage,dateString:t}).then((function(t){"000"==t.data.code&&(a.resultList=t.data.result.list,a.dataList=new Object,a.resultList.length>0&&(a.dataList[a.util.dateFormat("","月日")]=a.resultList,a.value=a.resultList[0].frequency))}))},add:function(t){this.$toast.loading({duration:3,forbidClick:!0,message:this.lang.wdTip8}),1==t?window.pushApp.heartRateSingle.func():window.pushApp.heartRateContinuation.func()}},created:function(){},mounted:function(){this.getDayData(this.util.dateFormat("","YYYY-MM-DD"));var t=this;window.pushApp.heartRateSingle.callback=function(a){t.$dialog.alert({title:"心率单次测量结果",message:a})},window.pushApp.heartRateContinuation.callback=function(a){t.$dialog.alert({title:"心率连续测量结果",message:a})}}},r=n,c=(e("1a4c"),e("4023")),l=Object(c["a"])(r,i,s,!1,null,"039aa6e3",null);a["default"]=l.exports},af28:function(t,a,e){t.exports=e.p+"img/set.png"},eb1d:function(t,a,e){t.exports=e.p+"img/heartRate1.gif"}}]);