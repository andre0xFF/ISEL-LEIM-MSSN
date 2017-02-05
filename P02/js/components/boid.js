// https://processing.org/examples/flocking.html
class Boid {

  get_energy() { return this.energy }
  get_attack() { return this.attack }
  get_mover() { return this.mover }
  get_behaviours() { return this.behaviours }
  set_replication_rate(rate) { this.replication_rate = rate }
  set_attack(dmg) { this.attack = dmg }
  set_energy(energy) { this.energy = energy }
  increase_energy(energy) { this.energy += energy }

  constructor(mover, energy) {
    this.mover = mover
    this.energy = energy
    this.attack = energy
    this.replication_rate = 0
    this.behaviours = new Behaviours()
  }

  is_alive() { return this.energy > 0 }
  replicate() { return (random(1) < this.replication_rate * system.delta) }

  damage(dmg) {
    this.energy -= dmg * system.delta

    if (this.energy < 0) {
      this.energy = 0
    }

    return dmg * system.delta
  }

  update() {
    if (!this.is_alive()) {
      return
    }

    this.behaviours.update()
  }

  print() {
    return (
      `Energy: ${(this.energy).toFixed(0)}\nReplication: ${(this.replication_rate).toFixed(3)}`
    )
  }
}
