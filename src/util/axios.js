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
        "access_token": localStorage.app_token || "d1a92862620947d8b34eff07e0c9e5e7",
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