new p5()

var spikeWall
var candy
var player
var UI

function setup() {
  createCanvas(400, 550)
  spikeWall = new SpikeWall(height / 12)
  candy = new Candy()
  player = new Player()
  UI = new UI()
}

function draw() {
  background(210)
  spikeWall.run()
  candy.run()
  player.run()
}

function keyPressed() {
  if (keyCode == 32) {
    player.jump()
  }
}
