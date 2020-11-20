// miniprogram/pages/administor/administor.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clinicsselection:[
      { id: 0, text: "器械概况", },
      { id: 1, text: "器械送修", },
      { id: 2, text: "器械统计" },
      { id: 3, text: "经销商管理" },
      { id: 4, text: "品牌管理", },
      { id: 5, text: "个人信息", },
      { id: 6, text: "关于我们", },
      
      ], 
      getusername:"",
      currentIndexNav:0,
      brand:'',
      model:'',
      name:'',

  },
  cativeNav:function(e){
    var that=this
    console.log(e.target.dataset.index,"页面切换")
this.setData({

  currentIndexNav:e.target.dataset.index,


})
},

  tabChange(e) {
    console.log('tab change', e)
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getusername:app.globalData.username
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
  getbrand(e){

    this.data.brand = e.detail.value,
      console.log("输入品牌:", this.data.brand)
  },

  getmodel(e){

    this.data.model = e.detail.value,
      console.log("输入型号:", this.data.model)
  },
  getname(e){

    this.data.name = e.detail.value,
      console.log("输入器械名称:", this.data.name)
  },

  adminadd:function(){
    var that=this
    var thatbrand = this.data.brand
    var thatmodel = this.data.model
    var thatname = this.data.name

      if(thatbrand!='' && thatmodel!=='' &&thatname!==''){
      const DB = wx.cloud.database().collection("InstrumentBrand")
      console.log(thatbrand)
      console.log(thatmodel)
      console.log(thatname)
      DB.add({
        data:
        {
          Brand: thatbrand,
          _id: thatmodel,
          Name : thatname,
        },
        success(res) {
          console.log("添加成功", res)
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          that.speqclassget()
        },
        fail(res) {
          console.log("添加失败", res)
          wx.showToast({
            title: '数据已存在',
            icon: 'none',
            duration: 2000
          })
        }
      })}
      else{
        wx.showToast({
          title: '所有输入不能为空',
          icon: 'none',
          duration: 2000
        })
    }
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