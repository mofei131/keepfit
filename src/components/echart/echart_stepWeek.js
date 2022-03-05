

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
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
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
        barWidth: 14,
        barMinHeight: 8,   
        itemStyle:{
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
            barBorderRadius:   [30,30,0,0],
              
          
        }, 
    }]
};

