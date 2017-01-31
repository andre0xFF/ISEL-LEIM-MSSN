let rbc = []
let wbc = []
let virus = []
let cho = []
let system

function setup() {

  createCanvas(1900, 950)

  system = new System()

  for (let i = 0; i < 10; i++) {
    cho.push(new CHO())
    rbc.push(new RBC())
    wbc.push(new WBC())
    virus.push(new Virus())
  }
}

function draw() {
  system.update()
  background('#D62929')

  for (let i = 0; i < cho.length; i++) {
    cho[i].draw()
  }
  for (let i = 0; i < rbc.length; i++) {
    let d = system.get_delta()
    rbc[i].move(d)
    rbc[i].draw()
  }
  for (let i = 0; i < wbc.length; i++) {
    wbc[i].move(system.get_delta())
    wbc[i].draw()
  }
  for (let i = 0; i < virus.length; i++) {
    virus[i].move(system.get_delta())
    virus[i].draw()
  }
}
