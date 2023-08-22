Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'Hello World!',
    src: '/img/0fbf051fa8d3fd1fa542ccd6754e251f94ca5f4d.jpg'
  },
  onLoad() {
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '展示用户信息', 
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.userInfo.avatarUrl,
          name:res.userInfo.nickName,
        })
      }
    })
  },
})
