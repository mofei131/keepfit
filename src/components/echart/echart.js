module.exports = {
  //  backgroundColor: 'rgba(0,0,0,0)',
    grid:{
        left: 8 ,
        top: 10 ,
        right: 8 ,
        bottom: 5 ,
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: 'rgba(0,0,0,0)',
        formatter: () => {
            return " ";
        },
        textStyle: {
            color: 'rgba(0,0,0,0)',
            fontSize: 30
        },
        // axisPointer:{
        //     lineStyle:{
        //         color:"red",
        //         width: 6
        //     }
        // }
    },
    color: ['#FFD491'],
    xAxis:{
        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', 
        '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        type: 'category',
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisPointer: {
            type:"line",
            lineStyle: {
                color: '#FB9B06',
                opacity: 1,
                width:0.5
            },           
            // handle: {
            //     icon:"image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
            //     show: true,
            //     color: '#004E52'
            // }
        },
        axisLabel: {
            show: false,
            color: 'red',
            fontSize: 10
        }
    },
    yAxis: {
        type: 'value',
        position: 'right',
        splitNumber:2,
        splitLine: {
            show: true,
            lineStyle: {
                width:0.5,
                type: 'dashed',
                color: '#ccc'
            }
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        },
        axisLabel: {
           // shadowOffsetY:60,
            // height:70,
            // lineHeight: 70,
            color: '#999',
            fontSize: 10,
            margin:-10,
        }
    },
    series: [{
        name: '步数',
        type: 'bar',
        // label:{show:true,position:'top'},
        data: [],
        barWidth: 6,
        barMinHeight: 8,
        itemStyle:{
        color: function(params){
            if(params.value===0){
                return '#ffffff00'
            }
            if(params.dataIndex == window.curInt){
                return '#FB9C09'
            }else{
                if(params.dataIndex ===  window.curInt){
                    return '#FB9C09'
                }else{
                    return '#FFD491'
                }
            }
        }
        },  
        /* markLine : {
             data : [
                  {name: '两个坐标之间的标线',yAxis: 0},
             ]
         }*/
    }]
};

