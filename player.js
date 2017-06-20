var gameBegun = false

function Player() {
  const PLAYER_SIZE = width / 11
  var score = 0
  var candies = -1
  var playerMoveSpeed = 3.55
  var touchedLeftWall = true
  var once = true
  var playerFacingRight = true
  this.pos.set(width / 2, height / 2)

  this.run = function() {
    this.updatePhysicsWithLimit(6)

    setFacingDirection.call(this)

    handleWallCollision.call(this)
    boundsChecker.call(this)

    candyCollisionChecker.call(this)

    updateCandyView.call(this)
    updateScoreView.call(this)

    show.call(this)

    if (gameBegun) {
      move.call(this)
      this.applyGravity()
      once = true
    } else {
      this.hover()
      this.acc.set(0, 0)
      this.vel.set(0, 0)
      score = 0
      this.restart()
    }
  }

  function show() {
    noStroke()
    fill(252, 4, 80)
    triangle(this.firstPoint.x, this.firstPoint.y, this.secondPoint.x, this.secondPoint.y, this.front.x, this.front.y)
  }

  function move() {
    this.pos.x += playerMoveSpeed
  }

  function setFacingDirection() {
    if (touchedLeftWall) {
      this.firstPoint.set(this.pos.x, this.pos.y)
      this.secondPoint.set(this.pos.x, this.pos.y + PLAYER_SIZE)
      this.front.set(this.pos.x + PLAYER_SIZE / 1.5, this.pos.y + PLAYER_SIZE / 2)
      this.middlePoint.set(this.pos.x + PLAYER_SIZE / 4, this.pos.y + PLAYER_SIZE / 2)
      playerFacingRight = true
    } else {
      this.firstPoint.set(this.pos.x + PLAYER_SIZE, this.pos.y)
      this.secondPoint.set(this.pos.x + PLAYER_SIZE, this.pos.y + PLAYER_SIZE)
      this.front.set(this.pos.x - PLAYER_SIZE / 1.5 + PLAYER_SIZE, this.pos.y + PLAYER_SIZE / 2)
      this.middlePoint.set(this.pos.x + PLAYER_SIZE / 1.35, this.pos.y + PLAYER_SIZE / 2)
      playerFacingRight = false
    }
    this.topSideMid.set((this.firstPoint.x + this.front.x) / 2, (this.firstPoint.y + this.front.y) / 2)
    this.bottomSideMid.set((this.secondPoint.x + this.front.x) / 2, (this.secondPoint.y + this.front.y) / 2)
  }

  function handleWallCollision() {
    if (gameBegun) {
      if (this.front.x >= width - PLAYER_SIZE / 3) {
        touchedLeftWall = false
        updateWall.call(this)
        playerMoveSpeed *= -1
        score += 1
        candy.spawn(touchedLeftWall)
      } else if (this.front.x <= 0 + PLAYER_SIZE / 4) {
        touchedLeftWall = true
        updateWall.call(this)
        playerMoveSpeed *= -1
        score += 1
        candy.spawn(touchedLeftWall)
      }
    }
  }

  function updateWall() {
    if (score <= 1) {
      spikeWall.slideSpikes(2, touchedLeftWall)
    } else if (score >= 1 && score < 4) {
      spikeWall.slideSpikes(3, touchedLeftWall)
    } else if (score >= 4 && score < 11) {
      spikeWall.slideSpikes(4, touchedLeftWall)
    } else if (score >= 11 && score < 24) {
      spikeWall.slideSpikes(5, touchedLeftWall)
    } else if (score >= 24 && score < 40) {
      spikeWall.slideSpikes(6, touchedLeftWall)
    } else if (score >= 40) {
      spikeWall.slideSpikes(7, touchedLeftWall)
    }
  }

  function updateScoreView() {
    UI.updateScoreView(score)
  }

  function updateCandyView() {
    if (candies > 0) {
      UI.updateCandyView(candies)
    }
  }

  function candyCollisionChecker() {
    if (score > 0) {
      if (pointCollisionCircle(candy.pos, this, candy.diameter)) {
        candy.gotEaten()
        candies += 1
      }
    }
  }

  function boundsChecker() {
    if (this.secondPoint.y <= PLAYER_SIZE || this.secondPoint.y >= height) {
      gameBegun = false
    }
  }

  this.restart = function() {
    if (once) {
      spikeWall.respawn()
      gameBegun = false
      this.pos.set(width / 2, height / 2)
      candies = 0
      candy.gotEaten()
      once = false
    }
  }

  this.jump = function() {
    gameBegun = true
    this.vel.set(0, 0)
    var j = createVector(0, -6.52)
    this.applyForce(j)
  }
}
