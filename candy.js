function Candy() {
  const DIAMETER = width / 19
  var sinPos = 0
  var eaten = true
  var once = true
  this.diameter = DIAMETER

  this.run = function() {
    show.call(this)
    this.hover()
  }

  function show(){
    if (eaten || player.score < 0 || spikeWall.isSpikesEmpty())
      return
    noStroke()
    fill(253, 155, 6)
    ellipse(this.pos.x, this.pos.y, DIAMETER, DIAMETER)
  }

  this.gotEaten = function() {
    eaten = true
    if (once) {
      once = false
    }
    this.pos.set(width - 100, height - 100)
  }

  this.spawn = function(leftWall) {
    if (eaten) {
      if (leftWall) {
        this.pos.set(width - width / 7.5, random(DIAMETER * 4, height - DIAMETER * 4))
      } else if (!leftWall) {
        this.pos.set(width / 7.5, random(DIAMETER * 4, height - DIAMETER * 4))
      }
      eaten = false
      once = true
    }
  }
}
