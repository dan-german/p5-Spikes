function SpikeWall(size) {
  const MAX_SPIKES = 12
  var spikes = []

  spawn.call(this)

  this.run = function() {
    for (var i = 0; i < spikes.length; i++) {
      spikes[i].run()
    }
  }

  function spawn() {
    for (var i = 0; i < MAX_SPIKES; i++) {
      spikes.push(new Spike(i * size))
      spikes[i].placeBehindRightWall()
    }
  }

  this.slideSpikes = function(spikesToSlide, touchedLeftWall) {
    for (var i = 0; i < spikes.length; i++) {
      if (touchedLeftWall) {
        spikes[i].placeBehindRightWall()
      } else {
        spikes[i].placeBehindLeftWall()
      }

      spikes[i].animateable = false
    }

    if (spikesToSlide > 11)
      spikesToSlide = 11

    const EMPTY_SPOTS = MAX_SPIKES - spikesToSlide
    var spawnPoint = round(random(0, EMPTY_SPOTS))
    var maxStep = MAX_SPIKES - spikesToSlide - spawnPoint + 1
    var step = round(random(1, maxStep))

    for (var i = 0; i < spikesToSlide; i++) {
      spikes[spawnPoint].animateable = true
      spawnPoint += step
      step = round(random(1, MAX_SPIKES - spikesToSlide - spawnPoint + 1))

      if (step <= 0)
        step = 1
    }
  }

  this.respawn = function() {
    spikes = []
    spawn.call(this)
  }

  this.isSpikesEmpty = function() {
    return spikes.length == 0
  }

  this.returnSpikeArray = function() {
    return spikes
  }
}
