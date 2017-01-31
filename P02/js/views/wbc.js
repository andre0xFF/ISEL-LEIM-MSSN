class WBC_view {

  constructor() {
    this.view_model = WBC_view.generate()
    this.size = random(20 / 2, 20)
  }

  increase_size() { this.size++ }
  decrease_size() { this.size-- }

  draw(position) {
    this.position = position.copy()
    this.view_model.draw(position, this.size)
  }

  static generate() {
    let models = [
      new WBC_view_model_01(),
      new WBC_view_model_02()
    ]

    return models[floor(random(0, models.length))]
  }
}

class WBC_view_model_01 {

  constructor() {
    this.color = '#FBE5E5'
  }

  draw(position, size) {
    push()
    {
      translate(position.x, position.y)
      angleMode(RADIANS)
      noFill()
      stroke(this.color)
      strokeWeight(2)
      ellipseMode(CORNERS)
      for (let i = 0; i < 3 * 4; i++) {
        rotate(Math.PI / 6)
        ellipse(0, 0, size / 2, size / 2)
      }
    }
    pop()
  }
}

class WBC_view_model_02 {

  constructor() {
    this.color = '#FBE5E5'
    this.size = random(20 / 2, 20)
  }

  draw(position) {
    push()
    {
      translate(position.x, position.y)
      angleMode(RADIANS)
      noFill()
      stroke(this.color)
      strokeWeight(2)
      ellipseMode(CORNERS)
      for (let i = 0; i < 3 * 4; i++) {
        rotate(Math.PI / 6)
        ellipse(0, 0, this.size / 2, this.size / 2)
        line(0, 0, 0, this.size / 1.4)
      }
    }
    pop()
  }
}
