class RBC_view {

  constructor() {
    this.view_model = RBC_view.generate()
    this.height = random(20 / 2, 20)
    this.width = random(20 / 2, 20)
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
    this.position = position.copy()
    this.view_model.draw(position, this.width, this.height)
  }

  static generate() {
    let models = [
      new RBC_view_model_01()
    ]

    return models[floor(random(0, models.length))]
  }
}

class RBC_view_model_01 {

  constructor() {
    this.inner_color = '#880303'
    this.outter_color = '#AD0404'
    this.noise = random(0, 1)
  }

  draw(position, width, height) {
    push()
    {
      translate(position.x, position.y)
      ellipseMode(CENTER)
      noStroke()
      this.noise += 0.01
      let r = noise(this.noise)

      fill(this.inner_color)
      ellipse(0, 0, width, height)

      stroke(this.outter_color)
      strokeWeight(2)
      ellipse(0, 0, r * width, r * height)
    }
    pop()
  }
}
