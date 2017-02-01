class RBC_view {

  constructor() {
    this.view_model = RBC_view.generate()
    this.height = random(12 / 1.2, 12)
    this.width = random(12 / 1.2, 12)
  }

  increase_size() {
    this.height++
    this.width++
  }

  decrease_size() {
    this.height--
    this.width--
  }

  draw(position) {
    this.view_model.draw(position, this.width, this.height)
  }

  static generate() {
    let models = [
      new RBC_view_model_02()
    ]

    return models[floor(random(0, models.length))]
  }
}

class RBC_view_model_02 {

  constructor() {
    this.inner_color = '#B30C0C'
    this.outter_color = '#EC0000'
    this.outter_size = 2
  }

  draw(position, width, height) {
    push()
    {
      ellipseMode(CENTER)
      stroke(this.outter_color)
      fill(this.inner_color)
      strokeWeight(this.outter_size)
      translate(position.x, position.y)
      ellipse(0, 0, width - this.outter_size, height - this.outter_size)
    }
    pop()
  }
}
