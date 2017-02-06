// https://processing.org/examples/flocking.html
class Boid {

  get_energy() { return this.energy }
  get_attack() { return this.attack }
  get_mover() { return this.mover }
  get_behaviours() { return this.behaviours }
  set_replication_rate(rate) { this.replication_rate = rate }
  set_attack(dmg) { this.attack = dmg }
  set_energy(energy) { this.energy = energy }

  constructor(mover, energy) {
    this.mover = mover
    this.energy = energy
    this.attack = energy * 1.5
    this.replication_rate = 0
    this.behaviours = []
    this.priority = null
  }

  update() {
    if (!this.is_alive()) {
      return
    }

    if (this.priority !== null && this.priority.update()) {
      this.priority = null
    }

    for (var i = 0; i < this.behaviours.length && this.priority === null; i++) {
      if (this.behaviours[i].update()) {
        this.behaviours.splice(this.behaviours[i], 1)
      }
    }
  }

  is_alive() { return this.energy > 0 }
  replicate() { return (random(1) < this.replication_rate * system.delta) }
  increase_energy(energy) { this.energy += energy }

  damage(dmg) {
    this.energy -= dmg * system.delta

    if (this.energy < 0) {
      this.energy = 0
    }

    return dmg * system.delta
  }

  print() {
    return (
      `Energy: ${(this.energy).toFixed(0)}\nReplication: ${(this.replication_rate).toFixed(3)}`
    )
  }

  add(behaviour) {
    this.behaviours.push(behaviour)
  }

  set_priority(behaviour) {
    this.priority = behaviour
  }

  static vision(position, direction, radius, angle, target_position) {
    let dif = p5.Vector.sub(target_position, position)
    if (direction.x !== 0 && direction.y !== 0) {
      let theta = p5.Vector.angleBetween(dif, direction)
      return dif.mag() < radius && theta < angle / 2
    }

    return dif.mag() < radius
  }

  static steering_force(position, velocity, speed, target_position) {
    let dir = p5.Vector.sub(target_position, position)
    return p5.Vector.sub(dir.normalize().mult(speed), velocity)
  }

}
