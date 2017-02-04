let system
let environment
let metrics
let debug

function setup() {

  createCanvas(1900, 1050)
  system = new System()
  environment = new Environment(width, height)
  debug = new Debug(environment, { mouse: false, grid: true, cho: true, rbc: false, wbc: true, virus: true })
  metrics = new Metrics(environment, 1.5, false)
}

function draw() {
  system.update()
  environment.update()
  debug.update()
  metrics.update()
}
