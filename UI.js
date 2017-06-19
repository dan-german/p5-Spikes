function UI() {
  var candyScorePos = createVector(width / 7, height - height / 14, 57, 23)

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
    textAlign(CENTER)
    textSize(60)
    fill(180)
    noStroke()
    if (score > 0)
      text(score, width / 2, height / 2)
  }
}
