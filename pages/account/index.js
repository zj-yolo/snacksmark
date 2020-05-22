// pages/account/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useraddress:'',
    totalmoney:"0.00",
    cartItems:[],
    selecteditem:[]
  },
  getUseraddress:function(e){
    let useraddress = {}
    // 获取用户地址
    wx.chooseAddress({
      complete: (res) => {
        useraddress = res
        console.log(useraddress.length)
        this.setData({
          useraddress
        })
        wx.setStorageSync('useraddress', useraddress)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let useraddress = wx.getStorageSync('useraddress')
    let totalmoney = wx.getStorageSync('totalmoney')
    let cartItems = wx.getStorageSync('cartItems')
    let selecteditem = wx.getStorageSync('selecteditem')
    this.setData({
      useraddress,
      totalmoney,
      cartItems,
      selecteditem
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