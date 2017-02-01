let rbc = []
let wbc = []
let virus = []
let cho = []
let system

function setup() {

  createCanvas(1900, 1050)

  system = new System()

  for (let i = 0; i < 80; i++) {
    rbc.push(new RBC(createVector(random(0, width), random(0, height))))
  }

  for (let i = 0; i < 30; i++) {
    cho.push(new CHO(createVector(random(0, width), random(0, height))))
    wbc.push(new WBC(createVector(600, 800)))
    virus.push(new Virus(createVector(400 + 300 * Math.round(random(-1, 1)), 300)))
  }
}

function draw() {
  system.update()
  background('#352828')

  for (let i = 0; i < cho.length; i++) {
    cho[i].draw()
  }
  for (let i = 0; i < rbc.length; i++) {
    rbc[i].move()
    rbc[i].draw()
  }
  for (let i = 0; i < wbc.length; i++) {
    wbc[i].move()
    wbc[i].draw()
  }
  for (let i = 0; i < virus.length; i++) {
    virus[i].move()
    virus[i].draw()
  }
}
