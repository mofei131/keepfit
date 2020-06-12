import axios from 'axios';

let Http = axios.create({
  timeout: 300000
});
let Http_ = function (obj, query) {

  // (url, query) => { 
  return Http({
      url: `${obj.Url}${obj.path||""}`,
      method: obj.Method,
      data: query,
      headers: {
        "access_token": localStorage.app_token || "",
        'content-type': "application/json"
      }
  }).then(r => r).catch(() => {
    alert("网络异常");
  });
  // },

};
export default Http_;