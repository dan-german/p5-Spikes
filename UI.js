function UI() {
  var candyScorePos = createVector(width / 7, height - height / 14, 57, 23)
  var textColor = 255

  this.updateCandyView = function(candies) {
    textSize(20)
    fill(0)
    noStroke()
    textAlign(LEFT)
    fill(100)
    text(candies, candyScorePos.x + 3, candyScorePos.y + 19)

    noStroke()
    fill(253, 155, 6)
    ellipse(candyScorePos.x + 45, candyScorePos.y + 12.5, 16, 16)

    noFill()
    stroke(100)
    strokeWeight(2)
    rect(width / 7, height - height / 14 + 1, 57, 22)
  }

  this.updateScoreView = function(score) {

    noStroke()
    fill(255)
    ellipse(width / 2, height / 2, 175, 175)

    if (!gameBegun)
      return

    if (textColor >= 210) {
      textColor -= 1
    }

    textAlign(CENTER)
    textSize(100)
    fill(textColor)
    noStroke()
    if (score < 10) {
      text("0" + score, width / 2, height / 2 + 32)
    } else {
      text(score, width / 2, height / 2 + 32)
    }
  }

  this.restartTextColor = function() {
    textColor = 255
  }
}
