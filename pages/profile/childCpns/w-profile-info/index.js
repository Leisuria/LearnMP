// pages/profile/childCpns/w-profile-info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    avatarUrl: "/assets/common/avatar.png",
    nickName: "获取用户信息",
    country: "暂无地区信息"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMyInfo: function (e) {
      // console.log(e.detail.userInfo)
      var userInfo = e.detail.userInfo
      this.setData({
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        country: userInfo.country
      })
    },
  }
})
