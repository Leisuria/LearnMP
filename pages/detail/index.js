// pages/detail/index.js
import {
  getDetail,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../service/detail.js'

const app = getApp()
const TOP_DISTANCE = 960

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    bannerImage: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    showBackTop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })

    this._getDetail()
  },

  _getDetail() {

    getDetail(this.data.iid).then(res => {
      // console.log(res)
      const data = res.data.result


      const bannerImage = data.itemInfo.topImages

      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      const shopInfo = new ShopInfo(data.shopInfo)

      const detailInfo = data.detailInfo

      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
      // console.log(bannerImage)

      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      // console.log(paramInfo.sizes)
      this.setData({
        bannerImage,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })

  },

  onPageScroll (options) {
    // console.log(options)
    const scrollTop = options.scrollTop

    // 2.修改showBackTop
    // 官方建议：不要在滚动函数的回调中频繁的调用this.setData
    const flag1 = scrollTop >= TOP_DISTANCE
    if (flag1 != this.data.showBackTop)
      this.setData({
        showBackTop: flag1
      })

  },

  onAddCart (e){
    // 1.获取商品对象
    const obj ={}
    obj.iid = this.data.iid
    obj.imageURL = this.data.bannerImage[0]
    obj.title = this.data.baseInfo.title
    obj.desc = this.data.baseInfo.desc
    obj.price = this.data.baseInfo.realPrice

    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  },

})