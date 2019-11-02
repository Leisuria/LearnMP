// pages/category/index.js
import {
  getCategoryData,
  getSubcategoryData
} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus:[],
    menusData: {

    },
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategoryData()
  },



  // --------------------- 网络请求函数---------------------
  _getCategoryData() {

    getCategoryData().then(res => {
      
      // 1.获取菜单类别
      const menus = res.data.data.category.list

      const menusData = {}
      
      for(let i=0; i<menus.length;i++){
        menusData[i] = {
          subcategories: []
        }
      }

      this.setData({
        menus,
        menusData
      })


      this._getSubcategoryData(0)
      
    })

  },

  _getSubcategoryData(currentIndex){

    const maitkey = this.data.menus[currentIndex].maitKey
    // console.log(maitkey)
    getSubcategoryData(maitkey).then(res => {
      const tempMenusData = this.data.menusData
      // console.log(res)
      tempMenusData[currentIndex].subcategories = res.data.data.list

      this.setData({
        menusData: tempMenusData
      })
    })


  },



  menuClick(e){
    // console.log(e)
    const currentIndex = e.detail.currentIndex
    this.setData({
      currentIndex
    })

    this._getSubcategoryData(currentIndex)
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