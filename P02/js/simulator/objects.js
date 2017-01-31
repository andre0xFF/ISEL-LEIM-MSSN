class RBC {

  constructor() {
    this.mover = new Mover(createVector(random(0, 800), random(0, 800)), createVector(0, 0))
    this.view = new RBC_view()
  }

  get_mover() { return this.mover }
  get_view() { return this.view }

  move(delta) {
    this.mover.move(delta)
  }

  draw() {
    this.view.draw(this.mover.get_position())
  }
}

class WBC {

  constructor() {
    this.mover = new Mover(createVector(random(0, 800), random(0, 800)), createVector(random(-5, 5), random(-5, 5)))
    this.view = new WBC_view()
  }

  get_mover() { return this.mover }
  get_view() { return this.view }

  move(delta) {
    this.mover.move(delta)
  }

  draw() {
    this.view.draw(this.mover.get_position())
  }
}

class CHO {

  constructor() {
    this.mover = new Mover(createVector(random(0, 800), random(0, 800)), createVector(0, 0))
    this.view = new CHO_view()
  }

  get_view() { return this.view }

  draw() {
    this.view.draw(this.mover.get_position())
  }
}

class Virus {

  constructor() {
    this.mover = new Mover(createVector(random(0, 800), random(0, 800)), createVector(random(-5, 5), random(-5, 5)))
    this.view = new Virus_view()
  }

  get_mover() { return this.mover }
  get_view() { return this.view }

  move(delta) {
    this.mover.move(delta)
  }

  draw() {
    this.view.draw(this.mover.get_position())
  }
}
