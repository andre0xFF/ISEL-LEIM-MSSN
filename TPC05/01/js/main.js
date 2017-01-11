let world

function setup() {

  createCanvas(800, 600)
  world = new World(75, 100)
}

function draw() {

  background('#FFFFFF')
  world.run()
  world.draw()
}
