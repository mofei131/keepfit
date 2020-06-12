module.exports = {
  //  backgroundColor: 'rgba(0,0,0,0)',
    grid:{
        left: 0 ,
        top: 10 ,
        right: 0 ,
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
        data: [],
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
                color: '#A90097',
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
        data: [], 
        barWidth: 4,
        itemStyle:{
        color: function(params){
            if(params.dataIndex == window.curInt){
                return '#A90097'
            }else{
                if(params.dataIndex ===  window.curInt){
                    return '#A90097'
                }else{
                    return '#EBCDFD'
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

