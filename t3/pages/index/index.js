Page({

  /**
   * 页面的初始数据
   */
  data: {
    danmu:"",
    videoSrc:"",
    list: [{
      id: '1001',
      imgUrl:"../../img/100.png",
      title: '杨国宜先生口述校史实录',
      videoUrl: 'http://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4'
    },
    {
      id: '1002',
      imgUrl:"../../img/100.png",
      title: '唐成伦先生口述校史实录',
      videoUrl: 'http://arch.ahnu.edu.cn/__local/E/31/EB/2F368A265E6C842BB6A63EE5F97_425ABEDD_7167F22.mp4?e=.mp4'
    },
    {
      id: '1003',
      imgUrl:"../../img/100.png",
      title: '倪光明先生口述校史实录',
      videoUrl: 'http://arch.ahnu.edu.cn/__local/9/DC/3B/35687573BA2145023FDAEBAFE67_AAD8D222_925F3FF.mp4?e=.mp4'
    },
    {
      id: '1004',
      imgUrl:"../../img/100.png",
      title: '吴仪兴先生口述校史实录',
      videoUrl: 'http://arch.ahnu.edu.cn/__local/5/DA/BD/7A27865731CF2B096E90B522005_A29CB142_6525BCF.mp4?e=.mp4'
    }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoCtx = wx.createVideoContext('videoID')
  },
  playVideo: function(e){
    this.videoCtx.stop()
    this.setData({
      videoSrc:e.currentTarget.dataset.url
    })
    this.videoCtx.play()
  },
  sendDanmu: function(){
    let text = this.data.danmu
    let rgb = []
    for(let i = 0 ; i < 3 ; ++i){
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    let res = '#' + rgb.join('')
    this.videoCtx.sendDanmu({
      text: text,
      color: res
    })
  }
})