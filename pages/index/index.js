//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    newest:[]
  },
  // 获取最近新品数据
  getNewestFun:function(){
    let newest = require("../../data/newest.js")
    this.setData({
      newest:newest
    })
  },
  onLoad: function () {
   this.getNewestFun()
  }
})
