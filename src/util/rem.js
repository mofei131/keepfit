// rem 布局
document.addEventListener('DOMContentLoaded', function (){
  var deviceWidth = document.documentElement.clientWidth;
  if(parseFloat(deviceWidth)>=850){
    document.documentElement.style.fontSize=100+'px';
  }else{
    document.documentElement.style.fontSize = deviceWidth / 8.5 + 'px';
  }
}, false)

window.onresize = function(){
  var deviceWidth = document.documentElement.clientWidth;
  if(parseFloat(deviceWidth)>=850){
    document.documentElement.style.fontSize=100+'px';
  }else{
    document.documentElement.style.fontSize = deviceWidth / 8.5 + 'px';
  }
}
