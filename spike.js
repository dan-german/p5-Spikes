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
    strokeWeight(3)
  }

  function checkPlayerCollision() {
    var p1 = pointCollisionTriangle(player.front, this)
    var p2 = pointCollisionTriangle(player.firstPoint, this)
    var p3 = pointCollisionTriangle(player.secondPoint, this)
    var p4 = pointCollisionTriangle(player.middlePoint, this)

    if (p1 || p2 || p3 || p4)
      player.restart()
  }

  function setPoints() {
    this.firstPoint.set(x - spikeSize, y)
    this.secondPoint.set(x - spikeSize, y + spikeSize)
    this.front.set(x + spikeSize / 1.5 - spikeSize, y + spikeSize / 2)
    this.middlePoint.set(this.pos.x + spikeSize / 4 - spikeSize, this.pos.y + spikeSize / 2)
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
