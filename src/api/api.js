const API_BASE_URL = window.apis;
//const API_BASE_URL = '/api';
module.exports = {   
    Login:{ //用户登录
        Url:API_BASE_URL+"/user/login",
        Method:"post"
    },
    TemperatureBatchSave:{ //批量保存温度
        Url:API_BASE_URL+"/health/temperature/batchSave",
        Method:"post"
    },
    TemperatureDay:{ //体温历史数据日
        Url:API_BASE_URL+"/health/temperature/queryDayRecords",
        Method:"post"
    },
    TemperatureWeek:{ //体温数据周
        Url:API_BASE_URL+"/health/temperature/queryWeekRecords",
        Method:"post"
    },
    TemperatureMonth:{ //体温历史数据月
        Url:API_BASE_URL+"/health/temperature/queryMonthRecords",
        Method:"post"
    },
    HeartRateSave:{ // 批量保存心率
        Url:API_BASE_URL+"/health/heartRate/batchSave",
        Method:"post"
    },
    HeartRateDay:{ //心率历史数据日
        Url:API_BASE_URL+"/health/heartRate/queryDayRecords",       
        Method:"post"
    },
    HeartRateWeek:{ //心率历史数据周
        Url:API_BASE_URL+"/health/heartRate/queryWeekRecords",
        Method:"post"
    },
    HeartRateMonth:{ //心率历史数据月
        Url:API_BASE_URL+"/health/heartRate/queryMonthRecords",
        Method:"post"
    },
    EcgSave:{ // 批量保存心电
        Url:API_BASE_URL+"/health/electrocardio/batchSave",
        Method:"post"
    },
    EcgDay:{ //心电历史数据日
        Url:API_BASE_URL+"/health/electrocardio/queryDayRecords",
        Method:"post"
    },
    EcgWeek:{ //心电历史数据周
        Url:API_BASE_URL+"/health/electrocardio/queryWeekRecords",
        Method:"post"
    },
    EcgMonth:{ //心电历史数据月
        Url:API_BASE_URL+"/health/electrocardio/queryMonthRecords",
        Method:"post"
    },
    BloodPressureSave:{ //新增血压
        Url:API_BASE_URL+"/health/bloodPressure/batchSave",
        Method:"post"
    },
    BloodPressureDay:{ //血压历史数据日
        Url:API_BASE_URL+"/health/bloodPressure/queryDayRecords",
        Method:"post"
    },
    BloodPressureWeek:{ //血压历史数据周
        Url:API_BASE_URL+"/health/bloodPressure/queryWeekRecords",
        Method:"post"
    },
    BloodPressureMonth:{ //血压历史数据月
        Url:API_BASE_URL+"/health/bloodPressure/queryMonthRecords",
        Method:"post"
    },
    BloodOxygenSave:{ //血氧新增
        Url:API_BASE_URL+"/health/bloodOxygen/batchSave",
        Method:"post"
    },
    BloodOxygenDay:{ //血氧历史数据日
        Url:API_BASE_URL+"/health/bloodOxygen/queryDayRecords",
        Method:"post"
    },
    BloodOxygenWeek:{ //血氧历史数据周
        Url:API_BASE_URL+"/health/bloodOxygen/queryWeekRecords",
        Method:"post"
    },
    BloodOxygenMonth:{ //血氧历史数据月
        Url:API_BASE_URL+"/health/bloodOxygen/queryMonthRecords",
        Method:"post"
    },
    SportDay:{ //运动历史数据日
        Url:API_BASE_URL+"/sport/queryDayRecords",
        path:"",
        Method:"post"
    },
    SportWeek:{ //运动历史数据周
        Url:API_BASE_URL+"/sport/queryWeekRecords",
        path:"",
        Method:"post"
    },     
    StepSave:{
        Url:API_BASE_URL+"/health/step/batchSave",      
        Method:"post"
    },
    StepDay:{ //步数历史数据日
        Url:API_BASE_URL+"/health/step/queryDayRecords",      
        Method:"post"
    },
    StepWeek:{ //步数历史数据周
        Url:API_BASE_URL+"/health/step/queryWeekRecords",
        Method:"post"
    },
    StepMonth:{ //步数历史数据月
        Url:API_BASE_URL+"/health/step/queryMonthRecords",      
        Method:"post"
    },
    SleepSave:{
        Url:API_BASE_URL+"/health/sleep/batchSave",      
        Method:"post"
    },
    SleepDay:{ //睡眠历史数据日
        Url:API_BASE_URL+"/health/sleep/queryDayRecords",      
        Method:"post"
    },
    SleepWeek:{ //睡眠历史数据周
        Url:API_BASE_URL+"/health/sleep/queryWeekRecords",      
        Method:"post"
    },
    SleepMonth:{ //睡眠历史数据月
        Url:API_BASE_URL+"/health/sleep/queryMonthRecords",      
        Method:"post"
    },   

    SaveClimbing:{  // 爬山
        Url:API_BASE_URL+"/sport/saveClimbing",      
        Method:"post"
    },    
    SaveCycling:{  // 骑行
        Url:API_BASE_URL+"/sport/saveCycling",      
        Method:"post"
    },
    SaveKingpo:{  // 健步
        Url:API_BASE_URL+"/sport/saveKingpo",      
        Method:"post"
    },
    SaveRunning:{  // 跑步
        Url:API_BASE_URL+"/sport/saveRunning",      
        Method:"post"
    },
    SaveSport:{  //保存运动数据数据
        Url:API_BASE_URL+"/sport/save",      
        Method:"post"
    },
    SportQueryMonth:{ //查询有数据的月份
        Url:API_BASE_URL+"/sport/queryMonth",
        path:"",
        Method:"post"
    }, 
    SportMonth:{ //运动历史数据月
        Url:API_BASE_URL+"/sport/queryMonthRecords",
        path:"",
        Method:"post"
    }, 
    SportQueryTotal:{ //查询数据总和：总步数、总的运动距离、总时长、总消耗热量
        Url:API_BASE_URL+"/sport/queryTotal",
        path:"",
        Method:"post"
    },  
    
}