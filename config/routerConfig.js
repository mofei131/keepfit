const fs = require('fs')
const path = require('path')
let join = path.join
let jsonFiles = [];
let prefixStr = 'src/Page/index/pages/'
let flieArray = new Array()
let outFile = 'src/Page/index/router.js'


Array.prototype.notempty = function() {
    var arr = [];
    this.map(function(val, index) {
        //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
        if (val !== "" && val != undefined) {
            arr.push(val);
        }
    });
    return arr;
}


function ucfirst(str) {
    var str = str.toLowerCase();
    str = str.replace(/\b\w+\b/g, function (word) {
      return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    return str;
}

function lookup(){
    function findJsonFile(path){
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) { 
                flieArray.push(fPath.replace(prefixStr,"").split("/"))
                jsonFiles.push(fPath.replace(prefixStr,""))
            }
        });
    }
    findJsonFile(prefixStr);
    splicing()
}
lookup()

function arraySort(){
    for(let i=0;i<flieArray.length;i++){
        for(let j=i+1;j<flieArray.length;j++){
            if(flieArray[i].length>flieArray[j].length){
                t=flieArray[i];
                flieArray[i]=flieArray[j];
                flieArray[j]=t;
            }
        }
    }
}

function splicing(){  
    arraySort()
    // 子路由 标记  Child Route
    let childRoute = new Array()
    flieArray.forEach((item, j)=>{
        let urlStr = ""
        item.forEach((items, i)=>{
            if(i==0){
                urlStr += `${items}`
            }else{
                urlStr += `/${items}`
            }
            if(item.length == i+1){
                if(urlStr.includes("$")){
                    childRoute.push({
                        url:urlStr,
                        ary:item.slice(0,i)
                    })
                    delete flieArray[j]
                }
            }
        })
    })

    childRoute.forEach((item, j)=>{
        item.ary[item.ary.length-1]='index.vue'
    })
    let order = []
    flieArray = flieArray.notempty()
    flieArray.forEach((item, j)=>{
        childRoute.forEach((items, i)=>{
            if(item.toString()==items.ary.toString()){
                childRoute[i].index  = j
                order.push(j)
            }
        })
    })
    let buffStr = `import Vue from 'vue' \n`
    buffStr += `import Router from 'vue-router' \n`
    buffStr += `const PageTransition = () => import ("./PageTransition") \n`
    flieArray.forEach((item, index)=>{
        let srcStr = ``
        let nameStr = ``
        item.forEach((items, key)=>{
            if(key!=0){
                srcStr += `/${items}`
                nameStr += ucfirst(items.split(".")[0])
            }else{
                srcStr += `${items}`
                nameStr += ucfirst(items.split(".")[0])
            }
        })
        buffStr += `const ${nameStr} = () => import ('./pages/${srcStr.split(".")[0]}')\n`
    })
    childRoute.forEach((items, index)=>{
        let nameStr = ``
        nameStr += ucfirst(items.url.split(".")[0].replace(/\//g,""))
        buffStr += `const ${nameStr} = () => import ('./pages/${items.url.split(".")[0]}')\n`
    })
    buffStr += `Vue.use(Router); \n`
    buffStr += `export default new Router({ \n`
    buffStr += `  routes:[`
    buffStr += `{"path": "/", "redirect": "/index"}, \n `
    buffStr += `{ "path": "/app", \n `
    buffStr += `"component": PageTransition, \n `
    buffStr += `"children": [ `
    flieArray.forEach((item, index)=>{
        let srcStr = ``
        let nameStr =``
        item.forEach((items, key)=>{
            if(key!=0){
                srcStr += `/${items.split(".")[0].replace("_",":")}`
                nameStr += ucfirst(items.split(".")[0])
            }else{
                srcStr += `${items.split(".")[0].replace("_",":")}`
                nameStr += ucfirst(items.split(".")[0])
            }
        })
        if(index==0){
            buffStr += `{ \n`;
        }else{
            buffStr += `,{ \n`;
        }
        buffStr += `                path : '/${srcStr}' ,\n`
        buffStr += `                component : ${nameStr} ,\n`
        if(order.includes(index)){
            buffStr += `                children: [\n` 
            childRoute.forEach((its, k)=>{
                if(its.index==index){
                    buffStr += `                            {\n`
                    buffStr += `                                path : '/${its.url.split(".")[0].replace("_",":")}' ,\n`
                    buffStr += `                                component : ${ucfirst(its.url.split(".")[0].replace(/\//g,""))} ,\n`
                    buffStr += `                            },\n`
                }
            })
            buffStr += `                ]\n`
        }
        buffStr += `            }`
    })
    buffStr += `] \n   }]\n`
    buffStr += `}) \n`
    fs.writeFile(path.resolve(outFile), buffStr, function (err) {
        if (err) console.log('router error')
        else console.log('router success')
    })
}
