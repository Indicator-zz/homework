// pages/game/game.js
var num = [
  ['00', '01', '02'],
  ['10', '11', '12'],
  ['20', '21', '22']
]
var w = 100 * (wx.getSystemInfoSync().windowWidth / 750)
Page({

  restartGame: function () {
    this.setData({
      isWin: false
    })
    //打乱方块顺序
    this.shuffle()
    //绘制画布内容
    this.drawCanvas()
  },

  isWin: function () {
    //使用双重for循环遍历整个数组
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        //如果有方块位置不对
        if (num[i][j] != i * 10 + j) {
          return false
        }
      }
    }
    //更新成功状态
    this.setData({
      isWin: true
    })
    return true
  },

  touchBox: function (e) {
    if (this.data.isWin) {
      return
    }
    var x = e.changedTouches[0].x
    var y = e.changedTouches[0].y
    var row = parseInt(y / w)
    var col = parseInt(x / w)
    if (num[row][col] != '22') {
      this.moveBox(row, col)
      this.drawCanvas()
      if (this.isWin()) {
        let ctx = this.ctx
        ctx.drawImage(this.data.url, 0, 0, 300, 300, 0, 0, 3 * w, 3 * w)
        ctx.setFillStyle('#e64340')
        ctx.setTextAlign('center')
        ctx.setFontSize(20)
        ctx.fillText('游戏成功', 1.5 * w, 1.5 * w)
        ctx.draw()
      }
    }
  },

  moveBox: function (i, j) {
    if (i > 0) {
      if (num[i - 1][j] == '22') {
        num[i - 1][j] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
    if (i < 2) {
      if (num[i + 1][j] == '22') {
        num[i + 1][j] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
    if (j > 0) {
      if (num[i][j - 1] == '22') {
        num[i][j - 1] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
    if (j < 2) {
      if (num[i][j + 1] == '22') {
        num[i][j + 1] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
  },

  shuffle: function () {
    num = [
      ['00', '01', '02'],
      ['10', '11', '12'],
      ['20', '21', '22']
    ]
    var row = 2
    var col = 2
    for (var i = 0; i < 100; i++) {
      var direction = Math.round(Math.random() * 3)
      if (direction == 0) {
        if (row != 0) {
          num[row][col] = num[row - 1][col]
          num[row - 1][col] = '22'
          row -= 1
        }
      } else if (direction == 1) {
        if (row != 2) {
          num[row][col] = num[row + 1][col]
          num[row + 1][col] = '22'
          row += 1
        }
      } else if (direction == 2) {
        if (col != 0) {
          num[row][col] = num[row][col - 1]
          num[row][col - 1] = '22'
          col -= 1
        }
      } else if (direction == 3) {
        if (col != 2) {
          num[row][col] = num[row][col + 1]
          num[row][col + 1] = '22'
          col += 1
        }
      }
    }
  },

  drawCanvas: function () {
    let ctx = this.ctx
    console.log(this.ctx)
    ctx.clearRect(0, 0, 300, 300)
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (num[i][j] != '22') {
          var row = parseInt(num[i][j] / 10)
          var col = num[i][j] % 10

          ctx.drawImage(this.data.url, col * 100, row * 100, 100, 100, j * w, i * w, w, w)
        }
      }
    }
    ctx.draw()
  },

  data: {
    isWin: false,
    url: "/img/pic01.jpg"
  },

  onLoad: function (options) {
    let turl = '/img/' + options.level
    this.setData({
      url: turl
    })
    this.ctx = wx.createCanvasContext('myCanvas')
    this.shuffle()
    this.drawCanvas()
  },
})