let rbc = []
let wbc = []
let virus = []
let cho = []
let system
let environment

function setup() {

  createCanvas(1900, 1050)
  system = new System()
  environment = new Environment()
}

function draw() {
  system.update()
  environment.update()
}
