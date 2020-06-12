import Vue from 'vue' 
import Router from 'vue-router' 
const PageTransition = () => import ("./PageTransition") 
const Bloodpressure = () => import ('./pages/bloodPressure')
const Bloodpressure_jz = () => import ('./pages/bloodPressure_jz')
const Ecg = () => import ('./pages/ecg')
const Hstepsday = () => import ('./pages/hStepsDay')
const Hstepsmonth = () => import ('./pages/hStepsMonth')
const Hstepsweek = () => import ('./pages/hStepsWeek')
const Healthreport = () => import ('./pages/healthReport')
const Heartrate = () => import ('./pages/heartRate')
const Historybloodpressure = () => import ('./pages/historyBloodPressure')
const Historyecg = () => import ('./pages/historyEcg')
const Historyheartrate = () => import ('./pages/historyHeartRate')
const Historyspo = () => import ('./pages/historySpo')
const Historytemperature = () => import ('./pages/historyTemperature')
const Index = () => import ('./pages/index')
const Motion = () => import ('./pages/motion')
const Setup = () => import ('./pages/setUp')
const Sleepday = () => import ('./pages/sleepDay')
const Sleepmonth = () => import ('./pages/sleepMonth')
const Sleepweek = () => import ('./pages/sleepWeek')
const Spo = () => import ('./pages/spo')
const Temperature = () => import ('./pages/temperature')
Vue.use(Router); 
export default new Router({ 
  routes:[{"path": "/", "redirect": "/index"}, 
 { "path": "/app", 
 "component": PageTransition, 
 "children": [ { 
                path : '/bloodPressure' ,
                component : Bloodpressure ,
            },{ 
                path : '/bloodPressure:jz' ,
                component : Bloodpressure_jz ,
            },{ 
                path : '/ecg' ,
                component : Ecg ,
            },{ 
                path : '/hStepsDay' ,
                component : Hstepsday ,
            },{ 
                path : '/hStepsMonth' ,
                component : Hstepsmonth ,
            },{ 
                path : '/hStepsWeek' ,
                component : Hstepsweek ,
            },{ 
                path : '/healthReport' ,
                component : Healthreport ,
            },{ 
                path : '/heartRate' ,
                component : Heartrate ,
            },{ 
                path : '/historyBloodPressure' ,
                component : Historybloodpressure ,
            },{ 
                path : '/historyEcg' ,
                component : Historyecg ,
            },{ 
                path : '/historyHeartRate' ,
                component : Historyheartrate ,
            },{ 
                path : '/historySpo' ,
                component : Historyspo ,
            },{ 
                path : '/historyTemperature' ,
                component : Historytemperature ,
            },{ 
                path : '/index' ,
                component : Index ,
            },{ 
                path : '/motion' ,
                component : Motion ,
            },{ 
                path : '/setUp' ,
                component : Setup ,
            },{ 
                path : '/sleepDay' ,
                component : Sleepday ,
            },{ 
                path : '/sleepMonth' ,
                component : Sleepmonth ,
            },{ 
                path : '/sleepWeek' ,
                component : Sleepweek ,
            },{ 
                path : '/spo' ,
                component : Spo ,
            },{ 
                path : '/temperature' ,
                component : Temperature ,
            }] 
   }]
}) 
