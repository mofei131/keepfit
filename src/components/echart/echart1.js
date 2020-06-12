module.exports = {
    backgroundColor: '#fff',
    selectedMode: false,
    grid: {
        left: 5,
        top: 5,
        right: 5,
        bottom: 5,
    },
    series: [{        
        name: '睡眠时长',
        type: 'pie',
        selectedOffset: 4,
        selectedMode: 'single',
        radius: '90%',
        center: ['50%', '50%'],
        color: ['#AC009A', '#5C73FF'],
        data: [{
            value: 22,
            name: '浅睡',
            selected: true,
        }, {
            value: 78,
            name: '深睡'
        }],
        label: {
            normal: {
                show: true,
                position: 'inside',
                formatter: "{c}%",
                textStyle: {
                    fontSize: 14,
                    color: '#B1BCFF',
                    fontWeight: 500,
                }
            },
            emphasis: {
                show: true,
            }
        }
    }]
};