var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //如果输出结果是true就判定是android终端或者uc浏览器
let pushApp = {
    heartRateSingle: {  // 心率单次测量
        func: function () {
            try {
                if (!isAndroid) {

                    window.webkit.messageHandlers.heartRateSingle.postMessage({})
                } else {
                    window.webkit.heartRateSingle("Hello Android!");
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("H5得到APP心率单次测量结果 : " + JSON.stringify(data))
        }
    },
    heartRateContinuation: { // 心率连续测量
        func: function () {
            try {
                if (!isAndroid) {
                    window.webkit.messageHandlers.heartRateContinuation.postMessage({})
                } else {
                    window.webkit.heartRateContinuation("Hello Android!");
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("H5得到APP心率连续测量结果 : " + JSON.stringify(data))
        }
    },
    bloodPressureSingle: { // 血压单次测量
        func: function () {
            try {
                if (!isAndroid) {
                    window.webkit.messageHandlers.bloodPressureSingle.postMessage({})
                } else {
                    window.webkit.bloodPressureSingle("Hello Android!");
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("H5得到APP血压单次测量结果 : " + JSON.stringify(data))
        }
    },
    spoSingle: { // 血氧单次测量
        func: function () {
            try {
                if (!isAndroid) {
                    window.webkit.messageHandlers.spoSingle.postMessage({})
                } else {
                    window.webkit.spoSingle("Hello Android!");
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("H5得到APP血氧单次测量结果 : " + JSON.stringify(data))
        }
    },
    temperatureSingle: { // 体温测量
        func: function () {
            try {
                if (!isAndroid) {
                    window.webkit.messageHandlers.temperatureSingle.postMessage({})
                } else {
                    window.webkit.temperatureSingle("Hello Android!");
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("H5得到APP体温测量结果 : " + JSON.stringify(data))
        }
    },
    roomTemperatureSingle: { // 室温测量
        func: function () {
            try {
                if (!isAndroid) {
                    window.webkit.messageHandlers.roomTemperatureSingle.postMessage({})
                } else {
                    window.webkit.roomTemperatureSingle("Hello Android!");
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("H5得到APP室温测量结果 : " + JSON.stringify(data))
        }
    },
    ecgSingle: { // 心电图测量
        func: function () {
            try {
                if (!isAndroid) {
                    window.webkit.messageHandlers.ecgSingle.postMessage({})
                } else {
                    window.webkit.ecgSingle("Hello Android!");
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("H5得到APP心电图测量结果 : " + JSON.stringify(data))
        }
    },
    heartRateSetUp: { //心率定时测量设置
        func: function (obj) {
            try {
                if (!isAndroid) {
                    window.webkit.messageHandlers.heartRateSetUp.postMessage(obj)
                } else {
                    window.webkit.heartRateSetUp(obj);
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("H5得到APP设置结果 : " + JSON.stringify(data))
        }
    },
    closePage: { //关闭当前窗口
        func: function () {
            try {
                if (!isAndroid) {
                    window.webkit.messageHandlers.closePage.postMessage({})
                } else {
                    window.webkit.closePage({});
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("关闭窗口 : " + JSON.stringify(data))
        }
    },
    openPage: {
        func: function (url) {
            try {             
                if (!isAndroid) {
                    window.webkit.messageHandlers.openPage.postMessage({ url: url })
                } else {
                    window.webkit.openPage({ url: url });
                }
            } catch (error) { console.log(error) }
        },
        callback: function (data) {
            console.log("打开窗口 : " + JSON.stringify(data))
        }
    }
}

export default pushApp
