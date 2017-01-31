class Mover {

  constructor(position, velocity) {
    this.position = position.copy()
    this.velocity = velocity.copy()
    this.acceleration = createVector(0, 0)
    this.mass = 1
  }

  get_position() { return this.position.copy() }
  get_velocity() { return this.velocity.copy() }
  set_position(position) { this.position = position }
  set_velocity(velocity) { this.velocity = velocity }

  add_force(vector) {
    let f = p5.Vector.div(vector, this.mass)
    this.acceleration.add(f)
  }

  move(delta) {
    this.velocity.add(p5.Vector.mult(this.acceleration, delta))
    this.position.add(p5.Vector.mult(this.velocity, delta))
    this.acceleration.mult(0)
  }
}
