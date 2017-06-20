function Spike(y) {
  const SPIKE_SIZE = height / 12
  var spikeSize = SPIKE_SIZE
  var x
  var placedBehindRightWall
  var sinPos = -1
  this.animateable = false

  this.run = function() {
    checkPlayerCollision.call(this)
    show.call(this)
    setPoints.call(this)
    this.handleSliding()
  }

  function show() {
    noStroke()
    fill(100)
    triangle(this.firstPoint.x, this.firstPoint.y, this.secondPoint.x, this.secondPoint.y, this.front.x, this.front.y)
  }

  function checkPlayerCollision() {
    var c1 = pointCollisionCircle(this.middlePoint, player, 30)
    var c2 = pointCollisionCircle(this.firstPoint, player, 10)
    var c3 = pointCollisionCircle(this.secondPoint, player, 10)
    var c4 = pointCollisionCircle(this.front, player, 10)
    var c5 = pointCollisionCircle(this.topSideMid, player, 10)
    var c6 = pointCollisionCircle(this.bottomSideMid, player, 10)

    var p1 = pointCollisionTriangle(this.middlePoint, player)
    var p2 = pointCollisionTriangle(this.firstPoint, player)
    var p3 = pointCollisionTriangle(this.secondPoint, player)
    var p4 = pointCollisionTriangle(this.front, player)
    var p5 = pointCollisionTriangle(this.topSideMid, player)
    var p6 = pointCollisionTriangle(this.bottomSideMid, player)


    if (c1 || c2 || c3 || c4 || c5 || c6 || p1 || p2 || p3 || p4 || p5 || p6 )
      player.restart()
  }

  function setPoints() {
    this.firstPoint.set(x - spikeSize, y)
    this.secondPoint.set(x - spikeSize, y + spikeSize)
    this.front.set(x + spikeSize / 1.5 - spikeSize, y + spikeSize / 2)
    this.middlePoint.set(x + spikeSize / 1.5 - spikeSize - spikeSize / 2.5, y + spikeSize / 2)

    this.topSideMid.set((this.firstPoint.x + this.front.x) / 2, (this.firstPoint.y + this.front.y) / 2)
    this.bottomSideMid.set((this.secondPoint.x + this.front.x) / 2, (this.secondPoint.y + this.front.y) / 2)
  }

  this.handleSliding = function() {
    if (!this.animateable)
      return

    if (placedBehindRightWall) {
      if (x >= width + spikeSize + 2.5) {
        x -= 5
      }
    } else {
      if (x <= spikeSize - 2.5) {
        x += 2.5
      }
    }
  }

  this.placeBehindLeftWall = function() {
    placedBehindRightWall = false
    x = 0
    spikeSize = SPIKE_SIZE
    y -= SPIKE_SIZE
  }

  this.placeBehindRightWall = function() {
    placedBehindRightWall = true
    x = width
    spikeSize = -SPIKE_SIZE
    y += SPIKE_SIZE
  }
}
