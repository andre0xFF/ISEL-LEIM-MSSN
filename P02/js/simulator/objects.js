class RBC {

  constructor(position) {
    this.mover = new Mover(position, createVector(0, 0))
    this.view = new RBC_view()
  }

  move() {
    this.mover.move()
  }

  draw() {
    this.view.draw(this.mover.get_position())
  }
}

class WBC {

  constructor(position) {
    this.mover = new Mover(position, createVector(random(-5, 5), random(-5, 5)))
    this.boid = new Boid(this.mover.get_position(), this.mover.get_velocity(), 100)
    this.view = new WBC_view()
  }

  move() {
    this.mover.move()
    this.boid.update(this.mover.get_position(), this.mover.get_velocity())
  }

  draw() {
    this.view.draw(this.mover.get_position())
  }
  replicate() {
    return new WBC(this.mover.get_position())
  }
}

class CHO {

  constructor(position) {
    this.mover = new Mover((position), createVector(0, 0))
    this.view = new CHO_view()
  }

  draw() {
    this.view.draw(this.mover.get_position())
  }
}

class Virus {

  constructor(position) {
    this.mover = new Mover(position, createVector(random(-5, 5), random(-5, 5)))
    this.boid = new Boid(this.mover.get_position(), this.mover.get_velocity(), 100)
    this.view = new Virus_view()
  }

  move() {
    this.mover.move()
    this.boid.update(this.mover.get_position(), this.mover.get_velocity())
  }

  draw() {
    this.view.draw(this.mover.get_position(), this.mover.get_direction())
  }
  replicate() {
    return new Virus(this.mover.get_position())
  }
}
