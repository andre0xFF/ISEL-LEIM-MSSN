class RBC {

  get_boid() { return this.boid }
  get_mover() { return this.mover }

  constructor(position) {
    this.mover = new Mover(position, createVector(0, 0))
    this.boid = new Boid(this.mover, 60)
    this.view = new RBC_view()
    this.regeneration_time = random(15, 60)
  }

  update() {
    if (!this.boid.is_alive()) {
      this.regenerate()
      return
    }
    this.mover.update()
    this.boid.update()
    this.view.draw(this.mover.get_position())
  }

  regenerate() {
    this.regeneration_time -= system.delta

    if (this.regeneration_time <= 0) {
      this.boid = new Boid(this.mover, 60)
      this.regeneration_time = random(15, 30)
    }
  }

}

class WBC {

  get_boid() { return this.boid }
  get_mover() { return this.mover }
  get_vision() { return this.vision }

  constructor(position) {
    this.mover = new Mover(position, createVector(0, 0))
    this.mover.max_speed = 80
    this.boid = new Boid(this.mover, 60)
    this.boid.set_replication_rate(0)
    this.view = new WBC_view()
    this.vision = {
      radius: 16 * 10,
      angle: Math.PI / 2
    }
    this.vision_view = new Vision_view(this.vision.radius, this.vision.angle)
  }

  update() {
    this.mover.update()
    this.boid.update()
    this.boid.damage(1)
    this.view.draw(this.mover.get_position())
  }

  generate_replica() {
    let energy = this.boid.get_energy() / 2
    let replica = new WBC(this.mover.get_position())
    replica.get_boid().set_energy(energy)
    this.boid.set_energy(energy)
    return replica
  }

  get_replica() {
    let energy_rate = 0.012 * Math.exp(9.217 * Math.pow(10, -3) * this.boid.get_energy())

    this.boid.set_replication_rate(energy_rate)
    if (this.boid.replicate()) {
      return this.generate_replica()
    }
  }

  enable_behaviours(cho, virus, wbc) {
    this.boid.add(new Wander(this.mover))
    this.boid.add(new Avoid(this.mover, this.vision, cho))
    this.boid.add(new Attack(this.boid, virus))
  }

}

class CHO {

  get_mover() { return this.mover }
  get_boid() { return this.boid }
  get_vision() { return this.vision }

  constructor(position) {
    this.mover = new Mover(position, createVector(0, 0))
    this.boid = new Boid(this.mover, 60)
    this.boid.set_attack(20)
    this.view = new CHO_view()
  }

  update() {
    this.boid.update()
    this.view.draw(this.mover.get_position())
  }

  enable_behaviours(wbc, virus) {
    this.boid.add(new Attack(this.boid, virus))
    this.boid.add(new Attack(this.boid, wbc))
  }

}

class Virus {

  get_boid() { return this.boid }
  get_mover() { return this.mover }
  get_vision() { return this.vision }

  constructor(position) {
    this.mover = new Mover(position, createVector(0, 0))
    this.boid = new Boid(this.mover, 60)
    this.view = new Virus_view()
    this.vision = {
      radius: 16 * 10,
      angle: Math.PI / 2
    }
    this.vision_view = new Vision_view(this.vision.radius, this.vision.angle)
  }

  update() {
    // this.mouse.mover.position = createVector(mouseX, mouseY)
    this.mover.update()
    this.boid.update()
    this.boid.damage(1)
    this.view.draw(this.mover.get_position(), this.mover.get_direction())
  }

  generate_replica() {
    let energy = this.boid.get_energy() / 2
    let replica = new Virus(this.mover.get_position())
    replica.get_boid().set_energy(energy)
    this.boid.set_energy(energy)
    return replica
  }

  get_replica() {
    let rate = 1.543 * Math.pow(10, -8) * Math.pow(this.boid.get_energy(), 3) - 5.556 * Math.pow(10, -6) * Math.pow(this.boid.get_energy(), 2) + 7.778 * Math.pow(10, -4) * this.boid.get_energy() + 0.02

    this.boid.set_replication_rate(rate)
    if (this.boid.replicate()) {
      return this.generate_replica()
    }
  }

  enable_behaviours(cho, rbc, wbc) {
    this.boid.add(new Wander(this.mover))
    this.boid.add(new Avoid(this.mover, this.vision, cho))
    this.boid.add(new Attack(this.boid, rbc))
    this.boid.add(new Evade(this.mover, wbc))
    // this.mouse = new Boid(new Mover(createVector(mouseX, mouseY), createVector(3, 3)), 1000)
    // this.boid.set_priority(new Arrive(this.mover, 200, [this.mouse]))
  }

}
