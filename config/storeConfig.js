const fs = require('fs')
const path = require('path')
let VuexJSON = {}
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function ucfirst(str) {
  var str = str.toLowerCase();
  str = str.replace(/\b\w+\b/g, function (word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  });
  return str;
}

function toUCase(str){
  return "SET_"+str.toUpperCase()
}

fs.readdir(path.resolve('src/store'), function (err, files) {
  let basicsData  = ""
  let vuexData = ""
  files.forEach(function (file) {
    var fliev = path.resolve('src/store/' + file)
    try {
      if (file.indexOf('storage.json') !== -1) {
        VuexJSON = JSON.parse(fs.readFileSync(fliev, 'utf8'))
      }
    } catch (ex) {
      console.log(ex)
    }
  })

  basicsData += "import {setBasicsDB, getBasicsDB} from '../../config/basicsStorageDB'\n\n"
  let basicsSet = ""
  for(let k in VuexJSON.localStorage){
    basicsData +="//"+VuexJSON.localStorage[k].describe+"\n"
    basicsData += "export const get"+ucfirst(k)+" = getBasicsDB('"+k+"')\n\n"
    basicsSet  += "export const set"+ucfirst(k)+" = (val) => {\n"
    basicsSet  += "   setBasicsDB('"+k+"',val)\n"
    basicsSet  += "}\n\n"
  }
  basicsData += basicsSet
  fs.writeFile(path.resolve('src/store/localStorage.js'), basicsData, function (err) {
    if (err) console.log('localStorage error')
    else console.log('localStorage success')
  })
  let state = ""
  let getters = ""
  let mutations = ""
  let actions = ""
  vuexData += "import Vue from 'vue'\n"
  vuexData += "import Vuex from 'vuex'\n"
  vuexData += "import * as $storage from './localStorage.js'\n\n"
  state += "const state = {\n"
  getters += "\n\nconst getters = {\n"
  mutations += "const mutations = {\n"
  actions += "const actions = {"
  let count = 0
  for(var k in VuexJSON.Vuex){
    count++
  }
  let counts = 1
  for(var k in VuexJSON.Vuex){
    state += "  // "+ VuexJSON.Vuex[k].describe +"\n"
    if(counts==count){
      getters += "  "+k+":state => "+"state."+k+"\n"
      mutations += "  ['"+toUCase(k)+"'](state, data) {\n"
      mutations += "    state."+k+" = data \n"
      mutations += "  }\n"
      actions += "\n set_"+k+": function ({commit}, data) {\n"
      if(JSON.stringify(VuexJSON.Vuex[k].value).indexOf('"{{')!=-1){
        actions += "   $storage.set"+ucfirst(k)+"(data)\n"
        state += "  "+k+" : "+ ucfirst(JSON.stringify(VuexJSON.Vuex[k].value)) +"\n"
      }else{
        state += "  "+k+" : "+ JSON.stringify(VuexJSON.Vuex[k].value) +"\n"
      }
      actions += "   commit('"+toUCase(k)+"', data)\n"
      actions += " }\n"
    }else{
      getters += "  "+k+":state => "+"state."+k+",\n"
      mutations += "  ['"+toUCase(k)+"'](state, data) {\n"
      mutations += "    state."+k+" = data \n"
      mutations += "  },\n"
      actions += "\n set_"+k+": function ({commit}, data) {\n"
      if(JSON.stringify(VuexJSON.Vuex[k].value).indexOf('"{{')!=-1){
        actions += "   $storage.set"+ucfirst(k)+"(data)\n"
        state += "  "+k+" : "+ ucfirst(JSON.stringify(VuexJSON.Vuex[k].value)) +",\n"
      }else{
        state += "  "+k+" : "+ JSON.stringify(VuexJSON.Vuex[k].value) +",\n"
      }
      actions += "   commit('"+toUCase(k)+"', data)\n"
      actions += " },\n"
    }
    counts++
  }
  state += "}"
  vuexData += state.replace(/\"{{/g,"$storage.get").replace(/}}\"/g,"")
  vuexData += getters+"\n}\n\n"
  vuexData += mutations+ "}\n"

  vuexData += actions+"}\n"

  vuexData += "import createLogger from 'vuex/dist/logger'\n"
  vuexData += "Vue.use(Vuex)\n"
  vuexData += "const debug = process.env.NODE_ENV !== 'production'\n"
  vuexData += "export default new Vuex.Store({\n"
  vuexData +=
    "  actions,\n" +
    "  getters,\n" +
    "  state,\n" +
    "  mutations,\n" +
    "  strict: false,\n" +
    "  plugins: debug ? [createLogger()] : []\n})"
    fs.writeFile(path.resolve('src/store/store.js'), vuexData, function (err) {
      if (err) console.log('store error')
      else console.log('store success')
    })
})
