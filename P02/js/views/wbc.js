class WBC_view {

  constructor() {
    this.view_model = WBC_view.generate()
    this.size = random(16 / 2, 16)
  }

  set_size(percentage) { this.size = percentage * 16 }

  draw(position) {
    this.view_model.draw(position, this.size)
  }

  static generate() {
    let models = [
      new WBC_view_model_01()
    ]

    return models[floor(random(0, models.length))]
  }
}

class WBC_view_model_01 {

  constructor() {
    this.color = '#FFFFFF'
  }

  draw(position, size) {
    push()
    {
      translate(position.x, position.y)
      rectMode(CENTER)
      ellipseMode(CENTER)
      fill(this.color)
      stroke(this.color)
      ellipse(0, 0, size / 2, size / 2)
      for (let i = 0; i < 2 * 2; i++) {
        rotate(Math.PI / 4)
        rect(0, 0, size / 2, size / 2)
      }
    }
    pop()
  }
}
