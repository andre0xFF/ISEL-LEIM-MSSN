
var galaxy = []

function setup() {

  var spaceship_position = createVector(width / 2, height - 10)
  galaxy.push(new Spaceship(spaceship_position))

}

function draw() {

  for (var i = 0; i < galaxy.length; i++) {
    galaxy[i].draw()
  }
  
}
