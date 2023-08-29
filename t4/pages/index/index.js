Page({
  data: {
    levels:[
      'pic01.jpg',
      'pic02.jpg',
      'pic03.jpg',
      'pic04.jpg',
      'pic05.jpg',
      'pic06.jpg',
    ]
  },
  chooseLevel: function(e){
    let level = e.currentTarget.dataset.level
    wx.navigateTo({
      url:"../game/game?level="+level
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

})