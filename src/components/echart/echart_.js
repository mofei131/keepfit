module.exports = {
  //  backgroundColor: 'rgba(0,0,0,0)',
    grid:{
        left: 0 ,
        top: 10 ,
        right: 0 ,
        bottom: 10 ,
    },
    tooltip: {
        trigger: 'axis',
        showDelay:2000000000,
        axisPointer:{
            shadowStyle:{
                color:"red",
                opacity:0.1
            }
        }
    },
    color: ['#EBCDFE'],
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
                color: '#EBCDFE',
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
            show: false,
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
            show: false,
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
        data: [1027, 1027, 2549, 2260, 1027, 1278, 1027, 1842, 
            2549, 2260, 1671, 3278,5555,3600,1027,5555,5555,5555,2456,7632,3546,3654,3214,2564], //亩均实收
        barWidth: 8,
        /* markLine : {
             data : [
                  {name: '两个坐标之间的标线',yAxis: 0},
             ]
         }*/
    }]
};