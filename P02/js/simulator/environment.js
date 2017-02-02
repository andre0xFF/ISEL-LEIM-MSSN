const SPACING = 16
const DEBUG = true

class Environment {


  constructor() {
    this.rbc = []
    this.wbc = []
    this.cho = []
    this.virus = []

    for (let i = 0; i < 80; i++) {
      this.rbc.push(new RBC(createVector(random(0, width), random(0, height))))
    }

    for (let i = 0; i < 5; i++) {
      this.cho.push(new CHO(createVector(random(0, width), random(0, height))))
      this.wbc.push(new WBC(createVector(400, 800)))
    }
    this.virus.push(new Virus(createVector(400 + 300 * Math.round(random(-1, 1)), 300)))
  }
  update() {
    background('#352828')

    if (DEBUG) {
      this.grib_debug()
    }

    for (let i = 0; i < this.cho.length; i++) {
      this.cho[i].update()
    }
    for (let i = 0; i < this.rbc.length; i++) {
      this.rbc[i].update()
    }
    for (let i = 0; i < this.wbc.length; i++) {
      if (!this.wbc[i].get_boid().is_alive()) {
        this.wbc.splice(i, 1)
        break
      }

      if (this.wbc[i].get_boid().replicate()) {
        this.wbc.push(this.wbc[i].generate_replica())
      }

      this.wbc[i].update()
    }
    for (let i = this.virus.length - 1; i >= 0; i--) {
      if (!this.virus[i].get_boid().is_alive()) {
        this.virus.splice(i, 1)
        continue
      }

      if (this.virus[i].get_boid().replicate()) {
        this.virus.push(this.virus[i].generate_replica())
      }

      this.virus[i].update()
    }
  }

  grib_debug() {
    push()
    {
      fill('#A57B9A')
      for (let i = SPACING; i < width; i += SPACING) {
        line(i, 0, i, height)
      }
      for (let i = SPACING; i < height; i += SPACING) {
        line(0, i, width, i)
      }

      let mouse = createVector(mouseX, mouseY)
      let coords = Mover.calc_grid_coordinates(mouse)
      let pos = Mover.calc_grid_position(mouse)
      translate(mouse.x, mouse.y)
      let s = `Grid coords: ${coords.x} ${coords.y}\nGrid position: ${pos.x} ${pos.y}\nReal position: ${mouse.x} ${mouse.y}`
      text(s, 16, 0)
    }
    pop()
  }
}
