// pages/detail/detail.js
var common = require('../../utils/common.js')
Page({
  data: {
    newsList:[]
  },
  goToDetail:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },
  onLoad: function (options) {
    let list = common.getNewList()
    this.setData({
      newsList:list
    })
  },
})