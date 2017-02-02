class Mover {

  get_position() { return this.position.copy() }
  get_velocity() { return this.velocity.copy() }
  get_direction() { return this.direction.copy() }
  get_max_speed() { return this.max_speed }
  get_grid() { return Mover.calc_grid_coordinates(this.position) }
  set_position(position) { this.position = position.copy() }
  set_velocity(velocity) { this.velocity = velocity.copy() }

  constructor(position, velocity) {
    this.position = position.copy()
    this.velocity = velocity.copy()
    this.acceleration = createVector(0, 0)
    this.direction = createVector(0, 0)
    this.mass = 1
    this.max_speed = 8 * 4
    this.test = 0
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
  }
  static calc_grid_coordinates(position) {
    return createVector(parseInt(position.x / (SPACING)), parseInt(position.y / (SPACING)))
  }

  static calc_grid_position(position) {
    return Mover.calc_grid_coordinates(position).mult(SPACING).add(SPACING)
  }
}
