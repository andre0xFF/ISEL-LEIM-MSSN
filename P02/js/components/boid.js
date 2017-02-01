// https://processing.org/examples/flocking.html
class Boid {
  constructor(position, velocity, energy) {
    this.position = position
    this.velocity = velocity
    this.energy = energy
  }

  eat(energy) {
    this.energy += energy
  }

  damage(delta) {
    this.energy -= 5 * delta
  }

  replicate() {

  }

  update(position, velocity, delta) {
    this.position = position
    this.velocity = velocity
    this.energy -= 1 * system.delta
  }

  seek(target, speed) {
    let dir = p5.Vector.sub(target, this.position)
    return p5.Vector.sub(dir.normalize().mult(speed), this.velocity)
  }

  flee(target) {
    let steer = this.seek(target, target.velocity.mag())
    return steer.mult(-1)
  }

  arrive(target, speed, radius) {
    let dir = p5.Vector.sub(target, this.position)

    if (dir.mag() < radius) {
      speed = dir.mag() * speed / radius
    }

    return p5.Vector.sub(dir.normalize().mult(speed), this.velocity)
  }

  pursuit() {

  }

  evade() {

  }

  separate() {

  }

  wander() {

  }

  avoid() {

  }

  inside_vision() {

  }
}
