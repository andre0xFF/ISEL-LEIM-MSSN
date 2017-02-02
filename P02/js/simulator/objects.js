class RBC {

  get_boid() { return this.boid }

  constructor(position) {
    this.mover = new Mover(position, createVector(0, 0))
    this.boid = new Boid(this.mover.get_position(), this.mover.get_velocity(), 60)
    this.view = new RBC_view()
  }
  update() {
    this.mover.update()
    this.boid.update()
    this.view.draw(this.mover.get_position())
  }
}

class WBC {

  get_boid() { return this.boid }

  constructor(position) {
    this.mover = new Mover(position, createVector(random(-5, 5), random(-5, 5)))
    this.boid = new Boid(this.mover, 60)
    this.view = new WBC_view()
  }
  update() {
    this.mover.update()
    this.boid.update()
    this.view.draw(this.mover.get_position())
  }
  replicate() {
    return new WBC(this.mover.get_position())
  }
  is_alive() {
    return this.boid.get_energy() > 0
  }
}

class CHO {

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

  constructor(position) {
    this.mover = new Mover(position, createVector(0, 0))
    this.boid = new Boid(this.mover, 60)
    this.boid.set_birth_rate(0.3)
    this.view = new Virus_view()

    this.mouse = new Mover(createVector(mouseX, mouseY), createVector(0, 0))
    this.boid.get_behaviours().add(new Seek(this.mover, this.mouse), 'active')
  }
  update() {
    this.mouse.position = createVector(mouseX, mouseY)
    this.mover.update()
    this.boid.update()
    this.view.draw(this.mover.get_position(), this.mover.get_direction())
  }
  generate_replica() {
    let energy = this.boid.get_energy() / 2
    let replica = new Virus(this.mover.get_position())
    replica.get_boid().eat(energy)
    this.boid.damage(energy)
    return replica
  }
}
