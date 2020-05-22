// pages/cart/index.js
Page({
  data: {
    totalmoney:"0.00",
    allchk:false,
    // 本地存储的购物车数据
    cartItems:[]
  },
  // ddddd
  ddddd:function(e){
    console.log(e)
  },
  // 点击全选
  handleAllchk:function(){
    let allchk = this.data.allchk
    // 全选的状态影响单选
    this.data.cartItems.forEach((e)=>{
      e.itemchk = !allchk
    })
    // 计算选中价格
   this.changetotal()
    this.setData({
      allchk:!allchk,
      cartItems:this.data.cartItems,
    })
    wx.setStorageSync("cartItems", this.data.cartItems)
  },
    // 封装函数,修改总价(全选的时候)
    changetotal:function(){
      // 总价
      let resulttotal
      // 全选选中的是时候,因为未设置,需要取反
      if(!this.data.allchk){
          let resultarr = this.data.cartItems.map((e)=>{
            return e.price * e.num
          })
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          resulttotal = (resultarr.reduce(reducer)).toFixed(2)
          this.setData({
            totalmoney:resulttotal
          })
        }else{
          this.setData({
            totalmoney:"0.00"
          })
        }
        wx.setStorageSync('totalmoney',this.data.totalmoney)
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
    //  计算totalmoney
    let totalmoney = 0
    this.data.cartItems.filter(e=>{
      if(e.itemchk){
        totalmoney += Number(e.price * e.num)
      }
    })
    //  更新数据
     this.setData({
       cartItems:this.data.cartItems,
       allchk:result,
       totalmoney:totalmoney.toFixed(2)
     })
     wx.setStorageSync("cartItems", this.data.cartItems)
     wx.setStorageSync("totalmoney", this.data.totalmoney)
   },

  //  减少数量
  handlRednum:function(e){
    let index = e.currentTarget.dataset.id
    let num = this.data.cartItems[index].num
    num--
    if(num <= 0){
      num = 0
    }
    this.data.cartItems[index].num = num
    if(this.data.cartItems[index].num === 0){
      wx.showModal({
        title: '提示',
        content: '是否删除该商品?',
        success: function(res){
          console.log(res)
        }
      })
    }
    // 计算总价
    if(this.data.cartItems[index].itemchk){
      this.data.totalmoney =  Number(this.data.totalmoney) - Number(this.data.cartItems[index].price)
      this.setData({
        totalmoney:(this.data.totalmoney).toFixed(2)
      })
      wx.setStorageSync("totalmoney", this.data.totalmoney)
    }
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
        // 计算总价
        if(this.data.cartItems[index].itemchk){
          this.data.totalmoney =  Number(this.data.totalmoney) + Number(this.data.cartItems[index].price)
          this.setData({
            totalmoney:(this.data.totalmoney).toFixed(2)
          })
          wx.setStorageSync("totalmoney", this.data.totalmoney)
        }
    this.setData({
      cartItems: this.data.cartItems
    })
    wx.setStorageSync("cartItems", this.data.cartItems)
  },
  // 删除item
  handlRemnum:function(e){
    let index = e.currentTarget.dataset.id
        // 计算总价
        if(this.data.cartItems[index].itemchk){
          this.data.totalmoney =  Number(this.data.totalmoney) - Number(this.data.cartItems[index].price * this.data.cartItems[index].num) 
          this.setData({
            totalmoney:(this.data.totalmoney).toFixed(2)
          })
          wx.setStorageSync("totalmoney", this.data.totalmoney)
        }
    // 删除index所在的位置
    this.data.cartItems.splice(index,1)
    this.setData({
      cartItems: this.data.cartItems
    })
    wx.setStorageSync("cartItems", this.data.cartItems)
  },
  // 获取选中的商品
  getselecteditem:function(){
    let selecteditem = this.data.cartItems.filter(e=>{
      return e.itemchk == true
    })
    wx.setStorageSync('selecteditem', selecteditem)
  },

  onShow: function () {
    //  单选影响全选
    let cartdata = wx.getStorageSync("cartItems")
    let result = cartdata.every((e) => {
      return e.itemchk == true
    }) 
    if(cartdata.length === 0){
      result = false
    }
    this.setData({
      cartItems: cartdata,
      allchk: result,
      totalmoney:wx.getStorageSync('totalmoney')
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
  // onShow: function () {
  //   // this.changetotal()
  // },

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