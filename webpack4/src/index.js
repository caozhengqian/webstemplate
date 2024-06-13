// 引入 css
import './style/style1.css'
import './style/style2.less'
import Person from "./Person";
import './react'

import _ from 'lodash'
import Vue from 'vue'
import App from './App.vue'
import str from './hello.js'
import moment from "moment";
import 'moment/locale/zh-cn'

var vm=new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
console.log(_.each)

console.log('window.ENV', ENV)

const print = (info) => {
    console.log(info)
}
print('hello webpack 5')

import { sum } from './math'
const sumRes = sum(10, 20)
console.log('sumRes', sumRes)
let zhangSanPerson = new Person("zhangSan", 23, "134123123");
insertText(`4) webpack 打包 typescript 获取的对象：${zhangSanPerson.name}`)

moment.locale('zh-cn')
insertText('5）IgnorePlugin忽略moment本地包，自己导入中文'+moment().format('ll'))
// insertText(`6) Scope Hosting打包：${str}`)

// 引入图片
function insertImgElem(imgFile) {
    const img = new Image()
    img.src = imgFile
    document.body.appendChild(img)
}
import imgFile1 from './img/1.png'
insertImgElem(imgFile1)
import imgFile2 from './img/2.jpeg'
insertImgElem(imgFile2)
function insertText(text) {
  const div = document.createElement('div')
  div.innerHTML = text
  // img.alt = text
  document.body.appendChild(div)
}



// 开启热更新之后的代码逻辑,是否能将input的值清掉
if (module.hot) {
    module.hot.accept(['./math'], () => {
        const sumRes = sum(10, 30)
        console.log('sumRes in hot', sumRes)
    })
}

