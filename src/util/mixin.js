import Vue from "vue"
import Api from "../api/api"
import Util from "./util"
import lang from "../language/CN"
window.lang = lang
import {mapGetters, mapActions} from 'vuex'
Vue.mixin({
  data() {
    return {
      api:Api,    
      lang:lang, 
      util:new Util()
    }
  },
  computed: {
    ...mapGetters([
      'app_user',
      'app_token'
    ])
  },  
  methods: { 
    closePage(){
        // 关闭页面
        console.log("关闭")
        window.pushApp.closePage.func()
    },
    openPage(url){
      console.log(window.ip_+url)
      window.pushApp.openPage.func(window.ip_+url)
    },
    tips_(res){
      if(res.data.state==1){
        this.$message({
          type: 'success',
          message:res.data.message
        });
        return true;
      }else{
        this.$message.error(res.data.message);
        return false;
      }
    },   
    login(){
      this.Http(this.api["Login"],{
        account : "18108684949",
        loginType: 1
      }).then( res =>{
          if(res.data.code == "000"){
            this.set_app_token(res.data.result.accessToken)
            this.set_app_user(res.data.result)
          }
      })
    },
    initTheme(){ // 修改主题
      if(localStorage.styleTheme){
          let root= document.querySelector(':root');     
          let d = JSON.parse(localStorage.styleTheme)
          let style = ""
          for(let i = 0;i < d.length;i++){
              if(i!=0){
                style += ";"
              }
              style += `${d[i].var}:${d[i].value}`   
          }
          root.setAttribute('style',style);   
      }
    },
    ...mapActions([
      'set_app_user',
      'set_app_token'
    ])
  }
})
