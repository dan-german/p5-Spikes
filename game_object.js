function GameObject() {
  this.firstPoint = createVector()
  this.secondPoint = createVector()
  this.front = createVector()
  this.middlePoint = createVector()

  this.topSideMid = createVector()
  this.bottomSideMid = createVector()

  this.pos = createVector()
  this.vel = createVector()
  this.acc = createVector()
  this.sinPos = random()

  this.updatePhysicsWithLimit = function(limit) {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.vel.limit(limit)
  }

  this.applyGravity = function() {
    this.applyForce(createVector(0, 0.2))
  }

  this.applyForce = function(force) {
    this.acc = force
  }

  this.hover = function() {
    this.sinPos += 0.08
    this.pos.y = map(sin(this.sinPos), -1, 1, this.pos.y - 2, this.pos.y + 2)
  }
}

Candy.prototype = new GameObject()
Player.prototype = new GameObject()
Spike.prototype = new GameObject()
