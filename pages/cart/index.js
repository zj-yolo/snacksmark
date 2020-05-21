// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalmoney:"0.00",
    allchk:false,
    // 本地存储的购物车数据
    cartItems:[]
  },
  // 点击全选
  handleAllchk:function(){
    let allchk = this.data.allchk
    // 全选的状态影响单选
    this.data.cartItems.forEach((e)=>{
      e.itemchk = !allchk
    })
    this.setData({
      allchk:!allchk,
      cartItems:this.data.cartItems
    })
    wx.setStorageSync("cartItems", this.data.cartItems)
  },
  //每个item的全选
   handleItemchk:function(e){
    //  获取到是哪个item的按钮被点击
     let index = e.currentTarget.dataset.id
    //  取反
     this.data.cartItems[index].itemchk = !this.data.cartItems[index].itemchk
    //  单选影响全选
    let result =  this.data.cartItems.every((e) => {
       return e.itemchk==true
     })
    //  更新数据
     this.setData({
       cartItems:this.data.cartItems,
       allchk:result
     })
     wx.setStorageSync("cartItems", this.data.cartItems)
   },
  //  减少数量
  handlRednum:function(e){
    let index = e.currentTarget.dataset.id
    let num = this.data.cartItems[index].num
    num--
    this.data.cartItems[index].num = num
    this.setData({
      cartItems:this.data.cartItems
    })
    wx.setStorageSync("cartItems", this.data.cartItems)
  },
  // 数量增加
  handlAddnum:function(e){
    let index = e.currentTarget.dataset.id
    let num = this.data.cartItems[index].num
    num++
    this.data.cartItems[index].num = num
    this.setData({
      cartItems: this.data.cartItems
    })
    wx.setStorageSync("cartItems", this.data.cartItems)
  },
  // 删除item
  handlRemnum:function(e){
    let index = e.currentTarget.dataset.id
    // 删除index所在的位置
    this.data.cartItems.splice(index,1)
    this.setData({
      cartItems: this.data.cartItems
    })
    wx.setStorageSync("cartItems", this.data.cartItems)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  单选影响全选
    let cartdata = wx.getStorageSync("cartItems")
    let result = cartdata.every((e) => {
      return e.itemchk == true
    }) 
    // if (cartdata == []){
    //   console.log("result")
    //   result = false
    // } 
    this.setData({
      cartItems: cartdata,
      allchk: result
    })
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