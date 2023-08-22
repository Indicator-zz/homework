// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: ['山东省','青岛市','黄岛区'],
    cityname:'青岛市',
    weather: 'unknown',
    imgID: '100',
    now:{
      temp:0,
      text:'未知',
      icon:'999',
      humidity:0,
      pressure:0,
      vis:0,
      windDir:0,
      windSpeed:0,
      windScale:0
    },
  },

  regionChange(e){
    this.setData({city:e.detail.value});
    this.getWeather()
  },
  getWeather(){
    var that = this;
    var id = 0;
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?',
      data:{
        location:that.data.city[1],
        key:'a798449c180a4db0af5b97a7098e2900'
      },
      success(res){
        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now?',
          data:{
            location:res.data.location[0].id,
            key:'a798449c180a4db0af5b97a7098e2900'
          },
          success(e){
            console.log(res.data);
            that.setData({
              cityname: res.data.location[0].name,
              now:e.data.now
            })
          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
  },
})