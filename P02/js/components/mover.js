class Mover {

  get_position() { return this.position.copy() }
  get_velocity() { return this.velocity.copy() }
  get_direction() { return this.direction.copy() }
  get_max_speed() { return this.max_speed }
  set_position(position) { this.position = position.copy() }
  set_velocity(velocity) { this.velocity = velocity.copy() }

  constructor(position, velocity) {
    this.position = position.copy()
    this.velocity = velocity.copy()
    this.acceleration = createVector(0, 0)
    this.direction = createVector(0, 0)
    this.coordinates = position.copy()
    this.override_coordinates = false
    this.mass = 1
    this.max_speed = 8 * 4
  }

  set_coordinates(coordinates) {
    this.override_coordinates = true
    this.coordinates = coordinates.copy()
  }

  add_force(vector) {
    let f = p5.Vector.div(vector, this.mass)
    this.acceleration.add(f)
  }

  update() {
    // move the mover
    this.velocity.add(p5.Vector.mult(this.acceleration, system.delta))
    this.position.add(p5.Vector.mult(this.velocity, system.delta))
    this.acceleration.mult(0)
    this.direction = this.velocity.copy().normalize()

    if (!this.override_coordinates) {
      this.coordinates = this.position.copy()
    }
  }

  print() {
    return (
      `Pos: ${(this.position.x).toFixed(0)} ${(this.position.y).toFixed(0)}\nSpeed: ${(this.velocity.mag()).toFixed(0)}\nCoord: ${this.coordinates.x} ${this.coordinates.y}`
    )
  }
}
