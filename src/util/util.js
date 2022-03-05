export default class Util {
  // 添加class
  /**
   * 
   * @param {节点} el 
   * @param {class名称} className 
   */
  addClass(el, className) {
    if (this.hasClass(el, className)) {
      return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }

  // 验证class是否存在
  hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  }

  // 删除class
  deleteClass(el, className) {
    if (!this.hasClass(el, className)) {
      return
    }
    let newClass = el.className.replace(className, "").split(' ')
    el.className = newClass.join(' ')
  }

  deleteClassAll(className) {
    let obj = document.getElementsByClassName(className)
    for (let item of obj) {
      this.deleteClass(item, className)
    }
  }

  // 小10 前面加 0 
  InternetFormat(num) {
    if (Number(num) < 10) {
      return "0" + Number(num)
    }
    return num
  }
  getTimestamp(dateStr){
    return  new Date(dateStr).getTime()
  }
  /**
   * @param {时间戳} timestamp 
   * @param {"YYYY-MM-DD HH:mm:ss"} format 
   */
  dateFormat(timestamp, format) {
    //日期格式化  //YYYY-MM-DD HH:mm:ss  || 年月日 时分秒
    //YYYY-MM-DD HH:mm:ss
    //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = null  
    if (timestamp!="") {       
        if(timestamp.toString().indexOf(" ")!=-1){
            time = new Date(timestamp.replace(" ","T"));
        }else{
            time = new Date(timestamp);
        }
    } else {
      time = new Date();
    }
    let timeStr = ""
    if (format.includes("YYYY") || format.includes("年")) {
      timeStr += time.getFullYear();
      if (format.includes("年")) {
        timeStr += "年"
      }
    }
    if (format.includes("MM") || format.includes("月")) {
      if (format.includes("YYYY")) {
        timeStr += "-"
      }

      timeStr += this.InternetFormat(time.getMonth() + 1);
      if (format.includes("月")) {
        timeStr += "月"
      }
    }
    if (format.includes("DD") || format.includes("日")) {
      if (format.includes("MM")) {
        timeStr += "-"
      }
      timeStr += this.InternetFormat(time.getDate());
      if (format.includes("日")) {
        timeStr += "日"
      }
    }
    if (format.includes(" ")) {
      timeStr += " ";
    }
    if (format.includes("HH") || format.includes("时")) {
      timeStr += this.InternetFormat(time.getHours());
      if (format.includes("时")) {
        timeStr += "时"
      }
    }
    if (format.includes("mm") || format.includes("分")) {
      if (format.includes("HH:")) {
        timeStr += ":"
      }
      timeStr += this.InternetFormat(time.getMinutes());
      if (format.includes("分")) {
        timeStr += "分"
      }
    }
    if (format.includes("ss") || format.includes("秒")) {
      if (format.includes("mm:")) {
        timeStr += ":"
      }
      timeStr += this.InternetFormat(time.getSeconds());
      if (format.includes("秒")) {
        timeStr += "秒"
      }
    }
    return timeStr;
  }
  WeekDate() {
    let ds1 =  new Date()
    let times = ds1.getTime()
    let AllDate = []
    let date_ = []
    if (ds1.getDay() != 0) {
      for (let i = 0; i < ds1.getDay(); i++) {
        AllDate.push(times - (i  * 1000 * 60 * 60 * 24))
      }
    } else {
      for (let i = 0; i < 6; i++) {
        AllDate.push(times - ((i + 1) * 1000 * 60 * 60 * 24))
      }
    }
    AllDate.push(times)
    AllDate.sort(function (a, b) { return b - a });
    for (let i = 0; i < AllDate.length; i++) {
      date_.push(this.dateFormat(AllDate[i], "YYYY-MM-DD"))
    }
    return date_
  }

  WeekDates(time__) {
    let ds1 = ""
    if(time__){
      ds1 = new Date(time__)
    }else{
      ds1 =  new Date()
    }
    let times = ds1.getTime()
    let AllDate = []
    let date_ = []   
    if (ds1.getDay() != 0) {
      for (let i = 0; i < ds1.getDay(); i++) {
        AllDate.push(times - (i  * 1000 * 60 * 60 * 24))
      }
      for (let i =1; i <= 7-ds1.getDay(); i++) {
        AllDate.push(times + (i  * 1000 * 60 * 60 * 24))
      }
    } else {
      for (let i = 0; i <  7; i++) {       
        AllDate.push(times - (i * 1000 * 60 * 60 * 24))
      }
    }
   // AllDate.push(times)
    AllDate.sort(function (a, b) { return a - b });
    for (let i = 0; i < AllDate.length; i++) {
      date_.push(this.dateFormat(AllDate[i], "年月日"))
    }
    return date_
  }

  MonthDate() {
    let ds1 = new Date()
    let times = ds1.getTime()
    let AllDate = []
    let date_ = []
    for (let i = 0; i < ds1.getDate(); i++) {
      AllDate.push(times - (i  * 1000 * 60 * 60 * 24))
    }
    AllDate.push(times)
    AllDate.sort(function (a, b) { return b - a });
    for (let i = 0; i < AllDate.length; i++) {
      date_.push(this.dateFormat(AllDate[i], "YYYY-MM-DD"))
    }
    return date_
  }

  MonthDateS(time__) { // YYYY-MM
    let ds1 = ""
    if(time__){
      let arryTime__ = time__.split("-")
      ds1 = new Date(arryTime__[0],arryTime__[1],0)
    }else{
      ds1 =  new Date()
    }
    let times = ds1.getTime()
    let AllDate = []
    let date_ = []
    for (let i = 0; i < ds1.getDate(); i++) {
      AllDate.push(times - (i  * 1000 * 60 * 60 * 24))
    }
    AllDate.sort(function (a, b) { return a - b });
    for (let i = 0; i < AllDate.length; i++) {
      date_.push(this.dateFormat(AllDate[i], "年月日"))
    }
    return date_
  }
//10000
  second_host(s_){
    let s = s_%60;
    let m =  parseInt(s_/60);
    let h = 0;
    if(m>=60){
      h = parseInt(m/60);
      m = m%60
    }
    if(s_<60){
      m = 1
    }
    if(s_){
      return [this.InternetFormat(h),this.InternetFormat(m),this.InternetFormat(s)]
    }else{
      return ["00","00","00"]
    }
   
  }

  /**
   * @param {数据}  data
   * @param {级别} level 
   * @param {父级id} parentId 
   * @Return column
   */
  getListColumn(list, idstr, pidstr, node) {
    if (!node["children"]) node["children"] = [];
    for (let j = 0; j < list.length; j++) {
      if (node[idstr] == list[j][pidstr]) {
        node["children"].push(list[j]);
      }
    }
    for (let j = 0; node["children"] && j < node["children"].length; j++) {
      node["children"][j]["children"] = [];
      this.getListColumn(list, idstr, pidstr, node["children"][j]);
    }
  }
}



