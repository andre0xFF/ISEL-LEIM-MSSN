class RBC {

  get_boid() { return this.boid }
  get_mover() { return this.mover }

  constructor(position) {
    this.mover = new Mover(position, createVector(0, 0))
    this.boid = new Boid(this.mover, 60)
    this.view = new RBC_view()
    this.regeneration_time = random(15, 30)
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

  constructor(position) {
    this.mover = new Mover(position, createVector(random(-5, 5), random(-5, 5)))
    this.boid = new Boid(this.mover, 60)
    this.boid.set_replication_rate(0)
    this.view = new WBC_view()
    this.vision_view = new Vision_view(16 * 10, Math.PI / 2)

    // this.mouse = new Mover(createVector(mouseX, mouseY), createVector(0, 0))
    // this.boid.get_behaviours().add_passive(new Avoid(this.mover, 16 * 10, Math.PI / 2, this.mouse))
  }

  update() {
    // this.mouse.position = createVector(mouseX, mouseY)
    this.mover.update()
    this.boid.update()
    this.boid.damage(1)
    this.view.draw(this.mover.get_position())
  }

  generate_replica() {
    let energy = this.boid.get_energy() / 2
    let replica = new WBC(this.mover.get_position())
    replica.get_boid().eat(energy)
    this.boid.damage(energy)
    return replica
  }

  get_replica() {
    return
    if (this.boid.replicate()) {
      return this.generate_replica()
    }
  }

  add_avoid(objects) {
    for (let i = 0; i < objects.length; i++) {
      this.boid.get_behaviours().add_passive(new Avoid(this.mover, 16 * 10, Math.PI / 2, objects[i].get_mover()))
    }
    this.vision_view = new Vision_view(16 * 10, Math.PI / 2)
  }

}

class CHO {

  get_mover() { return this.mover }

  constructor(position) {
    this.mover = new Mover((position), createVector(0, 0))
    this.view = new CHO_view()
  }

  update() {
    this.view.draw(this.mover.get_position())
  }

}

class Virus {

  get_boid() { return this.boid }
  get_mover() { return this.mover }

  constructor(position) {
    this.mover = new Mover(position, createVector(0, 0))
    this.boid = new Boid(this.mover, 60)
    this.boid.set_replication_rate(0.3)
    this.view = new Virus_view()
    this.vision_view = null

    this.mouse = new Mover(createVector(mouseX, mouseY), createVector(0, 0))
  }

  update() {
    this.mouse.position = createVector(mouseX, mouseY)
    this.mover.update()
    this.boid.update()
    this.boid.damage(1)
    this.view.draw(this.mover.get_position(), this.mover.get_direction())
  }

  generate_replica() {
    let energy = this.boid.get_energy() / 2
    let replica = new Virus(this.mover.get_position())
    replica.get_boid().damage(energy)
    this.boid.damage(energy)
    return replica
  }

  get_replica() {
    if (this.boid.replicate()) {
      return this.generate_replica()
    }
  }

  add_avoid(objects) {
    for (let i = 0; i < objects.length; i++) {
      this.boid.get_behaviours().add_passive(new Avoid(this.mover, 16 * 10, Math.PI / 2, objects[i].get_mover()))
    }
    this.vision_view = new Vision_view(16 * 10, Math.PI / 2)
  }

  add_wander() {
    this.boid.get_behaviours().set_default(new Wander(this.mover))
  }

}
