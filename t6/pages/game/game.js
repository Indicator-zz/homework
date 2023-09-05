// pages/game/game.js
var mapData = require('../../utils/data/map.js')
var w = 75 * wx.getSystemInfoSync().windowWidth / 750
//1墙0路2终点
var map = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]
//1box
var box = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]
var x = 0
var y = 0
Page({
  data: {
    Win: false,
    level: "1"
  },
  drawCanvas: function () {
    let ctx = this.ctx
    ctx.clearRect(0, 0, w * 8, w * 8)
    // console.log(map)
    for (var i = 0; i < 8; ++i) {
      for (var j = 0; j < 8; ++j) {
        if (map[i][j] == 0) {
          ctx.drawImage("../../img/icons/ice.png", w * j, w * i, w, w)
        } else if (map[i][j] == 1) {
          ctx.drawImage("../../img/icons/stone.png", w * j, w * i, w, w)
        } else {
          ctx.drawImage("../../img/icons/pig.png", w * j, w * i, w, w)
        }
        if (box[i][j] == 1) {
          ctx.drawImage("../../img/icons/box.png", w * j, w * i, w, w)
        }

      }
    }
    ctx.drawImage("../../img/icons/bird.png", w * y, w * x, w, w)
    ctx.draw();
    this.checkWin()
  },
  tapUp() {
    if (x == 0) {} else if (map[x - 1][y] != 1 && box[x - 1][y] == 0) {
      x -= 1
    } else if (box[x - 1][y] == 1) {
      if (x == 1) {} else if (map[x - 2][y] != 1 && box[x - 2][y] == 0) {
        box[x - 1][y] = 0;
        box[x - 2][y] = 1;
        x -= 1;
      }
    }
    this.drawCanvas()
  },
  tapLeft() {
    if (y == 0) {} else if (map[x][y-1] != 1 && box[x][y-1] == 0) {
      y -= 1
    } else if (box[x][y-1] == 1) {
      if (y == 1) {} else if (map[x][y-2] != 1 && box[x][y-2] == 0) {
        
        box[x][y-1] = 0;
        box[x][y-2] = 1;
        y -= 1;
      }
    }
    this.drawCanvas()
  },
  tapDown() {
    if (x == 7) {} else if (map[x + 1][y] != 1 && box[x + 1][y] == 0) {
      x += 1
    } else if (box[x + 1][y] == 1) {
      if (x == 6) {} else if (map[x + 2][y] != 1 && box[x + 2][y] == 0) {
        
        box[x + 1][y] = 0;
        box[x + 2][y] = 1;
        x += 1;
      }
    }
    this.drawCanvas()
  },
  tapRight() {
    if (y == 7) {} else if (map[x][y+1] != 1 && box[x][y+1] == 0) {
      y += 1
    } else if (box[x][y+1] == 1) {
      if (y == 6) {} else if (map[x][y+2] != 1 && box[x][y+2] == 0) {
        
        box[x][y+1] = 0;
        box[x][y+2] = 1;
        y += 1;
      }
    }
    this.drawCanvas()
  },
  restartGame: function () {
    this.readMap(Number(this.data.level) - 1)
    this.drawCanvas()
  },
  isWin: function () {
    for(var i = 0 ; i < 8 ; i++)
    {
      for(var j = 0 ; j < 8 ; j++)
      {
        if(box[i][j]== 1 && map[i][j] != 2){return false}
      }
    }
    return true
  },
  checkWin:function()
  {
    if(this.isWin())
    {
      wx.showModal({
        title: '恭喜',
        content: '通关',
        showCancel:false
      })
    }
  },
  readMap: function (num) {
    let tmpMap=mapData.maps[num]
    map
    for(var i = 0; i < 8; ++i) {
      for(var j = 0; j < 8; ++j) {
        if (tmpMap[i][j] == 1) {
          map[i][j] = 1
          box[i][j] = 0
        } else if (tmpMap[i][j] == 3) {
          map[i][j] = 2
          box[i][j] = 0
        }  
        else if (tmpMap[i][j] == 4) {
          map[i][j] = 0
          box[i][j] = 1
        }
        else  if (tmpMap[i][j] == 5) {
          map[i][j] = 0
          box[i][j] = 0
          x = i;
          y = j
        } else {
          box[i][j] = 0
          map[i][j] = 0
        }

      }
    }
    console.log(map)
  },
  onLoad: function (options) {
    let num = Number(options.level)
    console.log(options.level)
    this.readMap(num)
    this.setData({
      level: num + 1
    })
    this.ctx = wx.createCanvasContext('myCanvas')
    this.drawCanvas()
  },
})