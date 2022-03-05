module.exports = {
    //  backgroundColor: 'rgba(0,0,0,0)',
    grid: {
        left: 0,
        top: 10,
        right: 0,
        bottom: 10,
    },
    tooltip: {
        trigger: 'axis',
        showDelay: 2000000000,
        axisPointer: {
            shadowStyle: {
                color: "red",
                opacity: 0.1
            }
        }
    },
    color: [ '#AA0098','#FFD491', "#5C73FF"],
    xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
                color: '#aa0098',
                opacity: 1,
                width:0.5
            }  
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
        splitNumber: 2,
        splitLine: {
            show: false,
            lineStyle: {
                width: 0.5,
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
            margin: -10,
        }
    },
    series: [{
        name: '步数1',
        type: 'bar',
        barGap: '-100%',
        z: 1,
        data: [],
        barWidth: 10,
        barMinHeight: 8,  
        itemStyle: {
            color: function(params){
                if(params.value===0||!params.value){
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
            },
            normal: {
                barBorderRadius: [30,30,0,0]
            }
        }
    }
    // , {
    //     name: '步数2',
    //     type: 'bar',
    //     barGap: '-100%',
    //     z: 2,
    //     data: [0, 0, 0, 0, 0, 0, 0],
    //     barWidth: 10,
    //     itemStyle: {
    //         color: function(params){
    //             console.log( window.curInt)
    //             if(params.dataIndex == window.curInt){
    //                 return '#FB9C09'
    //             }else{
    //                 if(params.dataIndex ===  window.curInt){
    //                     return '#FB9C09'
    //                 }else{
    //                     return '#FFD491'
    //                 }
    //             }
    //         },
    //         normal: {
    //             barBorderRadius: [30,30,0,0]
    //         }
    //     }
    // }, {
    //     name: '步数3',
    //     type: 'bar',
    //     barGap: '-100%',
    //     z: 3,
    //    // data: [120, 600, 1500, 500, 300, 500, 300],
    //     barWidth: 10,
    // }
]
};