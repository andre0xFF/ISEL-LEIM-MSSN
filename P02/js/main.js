let system
let environment
let metrics
let debug

function setup() {

  let options = {
    mouse: false,
    grid: false,
    cho: {
      log: false
    },
    rbc: {
      log: false
    },
    wbc: {
      log: false, vision: false
    },
    virus: {
      log: false, vision: false
    }
  }

  createCanvas(1900, 1050)
  system = new System()
  environment = new Environment(width, height)
  debug = new Debug(environment, options)
  metrics = new Metrics(environment, 1.5, false)
}

function draw() {
  system.update()
  environment.update()
  debug.update()
  metrics.update()
}
