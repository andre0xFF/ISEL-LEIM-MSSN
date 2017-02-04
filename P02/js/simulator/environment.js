const SPACING = 16

class System {

  constructor() {
    this.time = millis()
    this.update()
  }

  get_delta() { return this.delta }

  update() {
    this.delta = (millis() - this.time) / 1000
    this.time = millis()
  }
}

class Environment {

  constructor(width, height) {
    this.rbc = []
    this.wbc = []
    this.cho = []
    this.virus = []
    this.width = width
    this.height = height

    for (let i = 0; i < 80; i++) {
      this.rbc.push(new RBC(createVector(random(0, width), random(0, height))))
    }

    for (let i = 0; i < 8; i++) {
      this.cho.push(new CHO(createVector(random(0, width), random(0, height))))
      this.wbc.push(new WBC(createVector(400, 800)))
      this.virus.push(new Virus(createVector(400 + 300 * Math.round(random(-1, 1)), 300)))
    }
  }

  update() {
    background('#352828')

    // CHO
    for (let i = 0; i < this.cho.length; i++) {
      this.cho[i].update()
      this.apply_coordinates(this.cho[i].get_mover())
    }
    // RBC
    for (let i = 0; i < this.rbc.length; i++) {
      this.rbc[i].update()
      this.apply_coordinates(this.rbc[i].get_mover())
    }
    // WBC
    for (let i = 0; i < this.wbc.length; i++) {
      if (!this.wbc[i].get_boid().is_alive()) {
        this.wbc.splice(i, 1)
        continue
      }

      if (this.wbc[i].get_boid().replicate()) {
        this.wbc.push(this.wbc[i].generate_replica())
      }

      this.wbc[i].update()
      this.apply_toroidal_rules(this.wbc[i].get_mover())
      this.apply_coordinates(this.wbc[i].get_mover())
    }
    // Virus
    for (let i = this.virus.length - 1; i >= 0; i--) {
      if (!this.virus[i].get_boid().is_alive()) {
        this.virus.splice(i, 1)
        continue
      }

      if (this.virus[i].get_boid().replicate()) {
        this.virus.push(this.virus[i].generate_replica())
      }

      this.virus[i].update()
      this.apply_toroidal_rules(this.virus[i].get_mover())
      this.apply_coordinates(this.virus[i].get_mover())
    }
  }

  apply_toroidal_rules(mover) {
    let pos = mover.get_position()
    mover.set_position(createVector(
      (pos.x + this.width) % this.width,
      (pos.y + this.height) % this.height
    ))
  }

  apply_coordinates(mover) {
    mover.set_coordinates(
      Environment.parse_coordinates(mover.get_position()
    ))
  }

  static parse_coordinates(position) {
    return createVector(parseInt(position.x / (SPACING)), parseInt(position.y / (SPACING)))
  }

  static parse_coordinates_position(position) {
    return Environment.parse_coordinates(position).mult(SPACING).add(SPACING)
  }
}

class Debug {

  constructor(environment, enabled_objects) {
    this.env = environment
    this.e_objects = enabled_objects
    this.color = '#A57B9A'
  }

  update() {
    if (Object.keys(this.e_objects).length === 0) {
      return
    }

    if (this.e_objects.grid) { this.grid() }
    if (this.e_objects.mouse) { this.mouse() }

    this.objects()
  }

  grid() {
    push()
    {
      fill(this.color )
      for (let i = SPACING; i < width; i += SPACING) {
        line(i, 0, i, height)
      }
      for (let i = SPACING; i < height; i += SPACING) {
        line(0, i, width, i)
      }
    }
    pop()
  }

  mouse() {
    push()
    {
      fill(this.color)
      let mouse = createVector(mouseX, mouseY)
      let coords = Environment.parse_coordinates(mouse)
      let pos = Environment.parse_coordinates_position(mouse)
      translate(mouse.x, mouse.y)
      let s = `Grid coords: ${coords.x} ${coords.y}\nGrid position: ${pos.x} ${pos.y}\nReal position: ${mouse.x} ${mouse.y}`
      text(s, 16, 0)
    }
    pop()
  }

  objects() {
    push()
    {
      fill(this.color)

      if (this.e_objects.cho) {
        for (let i = 0; i < this.env.cho.length; i++) {
          let mover = this.env.cho[i].get_mover()
          text(mover.print(), mover.get_position().x + 16, mover.get_position().y)
        }
      }
      if (this.e_objects.rbc) {
        for (let i = 0; i < this.env.rbc.length; i++) {
          let mover = this.env.rbc[i].get_mover()
          text(mover.print(), mover.get_position().x + 16, mover.get_position().y)
        }
      }
      if (this.e_objects.wbc) {
        for (let i = 0; i < this.env.wbc.length; i++) {
          let mover = this.env.wbc[i].get_mover()
          text(mover.print(), mover.get_position().x + 16, mover.get_position().y)
        }
      }
      if (this.e_objects.virus) {
        for (let i = 0; i < this.env.virus.length; i++) {
          let mover = this.env.virus[i].get_mover()
          text(mover.print(), mover.get_position().x + 16, mover.get_position().y)
        }
      }
    }
    pop()
  }
}

class Metrics {

  constructor(environment, print_time, logger) {
    this.env = environment
    this.color = '#FFFFFF'
    this.print_time = print_time
    this.elapsed_time = print_time
    this.time = (millis() / 1000).toFixed(2)
    this.buffer = ''
    this.log = {}
    this.logger = logger
  }

  record() {
    let row = {}

    let rbc = 0
    for (let i = 0; i < this.env.rbc.length; i++) {
      if (this.env.rbc[i].get_boid().is_alive()) {
        rbc++
      }
    }

    row.cho = this.env.cho.length
    row.rbc = rbc
    row.wbc = this.env.wbc.length
    row.virus = this.env.virus.length
    this.log = row
  }

  update() {
    this.record()
    this.time = (millis() / 1000).toFixed(2)
    this.draw(this.time)

    if (!this.logger) {
      return
    }

    this.elapsed_time -= system.delta
    if (this.elapsed_time <= 0) {
      this.print()
      this.elapsed_time = this.print_time
    }
  }

  draw() {
    push()
    {
      fill(this.color)
      text(`Time: ${this.time}\nCHO: ${this.log.cho}\nRBC: ${this.log.rbc}\nWBC: ${this.log.wbc}\nVirus: ${this.log.virus}`, 16, 16)
    }
    pop()
  }

  print() {
    // CSV format
    let row = `${this.time},${this.log.cho},${this.log.rbc},${this.log.wbc},${this.log.virus}`
    console.log(row)
    this.buffer += row + '\n'
  }

}
