// miniprogram/pages/logs/logs.js

const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  

  /////登录选择角色
    radioItems: [
      {name: '管理员',checked: 'true'},
      {name: '经销商'},

    ],
    userad:"",//获取账号
    userpd:"",////获取密码

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  adminitor:function (){
    wx.navigateTo({
      url: '/pages/administor/administor',})
},
dealer:function(){
  wx.navigateTo({
    url: '/pages/dealer/dealer',})
},
radioChange(e) {
  const checked = e.detail.value
  app.globalData.role=checked;
  console.log( app.globalData.role)
 
},
getuserad:function (a) {
 this.data.userad= a.detail.value
  console.log(this.data.userad)

  
},
getwd:function (a) {
  this.data.userpd= a.detail.value
   console.log(this.data.userpd)
  
 },
login:function(){
  // wx.cloud.callFunction({
  //   name: "logs",
  //   data: {
  //     role: app.globalData.role, 
  //     userad: this.data.userad,
  //     userpd: this.data.userpd,
  //   },  
  // })
  // data = {
  //   AdAccount: this.data.userad,
  //   PassWrd: this.data.userpd,
  //   AdName: app.globalData.role
  // }
var that=this
var users='AdminstorRoom'
var parame={ AdAccount: this.data.userad }
var rl='/pages/administor/administor'
if (app.globalData.role=="管理员"){
  users='AdminstorRoom'
  parame={ AdAccount: this.data.userad }
  var rl='/pages/administor/administor'
 }
 if (app.globalData.role=="经销商"){
  users='RoleStroeRoom'
  parame={ DeAccount: this.data.userad }
  var rl='/pages/dealer/dealer'
 }
  db.collection(users).where(parame)//查询语句
  .get({
    success: function(res) {
      
      wx:wx.hideLoading();
      if (res.data == '') {//为空说明没有查到数据
        wx.showToast({
          title: '用户不存在',
          icon: 'none',
          duration: 3000
        })
      }
      else{if (res.data[0].PassWrd == that.data.userpd) {//查询到数据后再判断用户输入的密码是否正确
        
        app.globalData.username=res.data[0].AdName
        console.log(res.data[0],app.globalData.username)
        wx.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 3000
        })
        wx.navigateTo({
          url: rl,})
      }
      else{
        wx.showToast({
          title: '密码错误',
          icon: 'none',
          duration: 3000
        })
      }
    }
  }
 })
}
  ///////////////////////页面结束///////////////
})