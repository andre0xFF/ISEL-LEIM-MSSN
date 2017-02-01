class Mover {

  constructor(position, velocity) {
    this.position = position.copy()
    this.velocity = velocity.copy()
    this.acceleration = createVector(0, 0)
    this.direction = createVector(0, 0)
    this.mass = 1
  }

  get_position() { return this.position.copy() }
  get_velocity() { return this.velocity.copy() }
  get_direction() { return this.direction.copy() }
  set_position(position) { this.position = position.copy() }
  set_velocity(velocity) { this.velocity = velocity.copy() }

  add_force(vector) {
    let f = p5.Vector.div(vector, this.mass)
    this.acceleration.add(f)
  }

  move() {
    this.velocity.add(p5.Vector.mult(this.acceleration, system.delta))
    this.position.add(p5.Vector.mult(this.velocity, system.delta))
    this.acceleration.mult(0)
    this.direction = this.velocity.copy().normalize()
  }
}
