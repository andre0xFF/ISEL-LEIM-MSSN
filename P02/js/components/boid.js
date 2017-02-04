// https://processing.org/examples/flocking.html
class Boid {

  get_energy() { return this.energy }
  get_attack() { return this.attack }
  get_mover() { return this.mover }
  get_behaviours() { return this.behaviours }
  set_replication_rate(rate) { this.replication_rate = rate }
  set_attack(dmg) { this.attack = dmg }

  constructor(mover, energy) {
    this.mover = mover
    this.energy = energy
    this.attack = energy / 2
    this.birth_rate = 0
    this.behaviours = new Behaviours()
  }

  is_alive() { return this.energy > 0 }
  damage(dmg) { this.energy = this.energy <= 0 ? 0 : this.energy - dmg * system.delta }
  replicate() { return (random(1) < this.replication_rate * system.delta) }

  update() {
    if (!this.is_alive()) {
      return
    }

    this.behaviours.update()
  }
}
