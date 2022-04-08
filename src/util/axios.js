import axios from 'axios';

let Http = axios.create({
  timeout: 300000
});
let Http_ = function (obj, query) {
    let timesTamp = new Date().getTime()
    let str = "keepfit@2020_"+timesTamp
   // console.log(str)
    let secret = window.md5(str);
   // console.log(secret)
  // (url, query) => { 
  return Http({
      url: `${obj.Url}${obj.path||""}`,
      method: obj.Method,
      data: query,
      headers: {
        "access_token": localStorage.app_token || "3bbc5a67155d4166b6f38846bbc2578e",
        'content-type': "application/json",
        'timestamp':timesTamp,
        "secret":secret.replace(/0/g,"o"),

      }
  }).then(r => r).catch(() => {
    alert("网络异常");
  });
  // },

};
export default Http_;