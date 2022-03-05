var InternetFormat = function(num) {
    if (Number(num) < 10) {
      return "0" + num
    }
    return num.toString()
  }
let host = []
let minute = []

let keys = [20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
for(let i = 0;i<keys.length;i++){
    host.push(InternetFormat(keys[i]))
}
for(let i = 0;i<60;i++){
    minute.push(InternetFormat(i))
}
let dataX = []
for(let i = 0;i<host.length;i++){  
    for(let j =0;j<minute.length;j++){
        dataX.push(host[i]+":"+minute[j])
    }
}
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
        data: dataX,
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
        },
        axisLabel: {
            show: false,
            color: 'red',
            fontSize: 10
        }
    },
    yAxis: {
        data:[10,20,30],
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
            color: '#999',
            fontSize: 10,
            margin:-10,
        }
    },
    series: [{
        name: '睡眠',
        type:'line',
        markArea: {
            show: true,
            data: [ ]
        }
    }]
};