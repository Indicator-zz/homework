Page({
  data: {
    levels:[
      'level01.png',
      'level02.png',
      'level03.png',
      'level04.png',
    ]
  },
  chooseLevel: function(e){
    let index = e.currentTarget.dataset.level
    // console.log(level)
    wx.navigateTo({
      url:"../game/game?level="+index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

})