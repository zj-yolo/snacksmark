// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detaildata:[],
    option:"guazi",
    selected:"detail",
    totalgoods:0,
    // 购物车数据
    cartItems:[]
  },
  // 获取商品数据
  getDetaildataFun:function(){
    let detaildata = require("../../data/details-data.js")
    this.setData({
      detaildata:detaildata
    })
  },
  // 点击商品详情
  handlegoods:function(e){
    this.setData({
      selected: e.currentTarget.dataset.id
    })
  },
  // 增加数量
  handleAddnum:function(e){
    let num = this.data.totalgoods
    this.setData({
      totalgoods: ++num
    })
  },
  // 添加到购物车
  handleAddtocart:function(e){
    let item = this.data.detaildata[this.data.option]
    // 当前要添加到购物车的数据
    let cartItems ={
      "title":item.title,
      "count":item.count,
      "unit":item.unit,
      "price":item.price,
      "num": this.data.totalgoods,
      "itemchk":false
    }
    let items = wx.getStorageSync("cartItems") || []
    items.push(cartItems)
  console.log(items)
    this.setData({
      cartItems:items
    })
    wx.setStorageSync("cartItems", items)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取到子组件传来的id值
    this.getDetaildataFun()
    this.setData({
      cartItems: wx.getStorageSync("cartItems")
    })
    // this.setData({
    //   option:options.id
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})