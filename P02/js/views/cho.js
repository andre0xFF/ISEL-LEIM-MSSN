class CHO_view {

  constructor() {
    this.view_model = CHO_view.generate()
    this.size = 20
  }

  draw(position) {
    this.position = position.copy()
    this.view_model.draw(position, this.size)
  }

  static generate() {
    let models = [
      new CHO_view_model_01(),
      new CHO_view_model_02()
    ]

    return models[floor(random(0, models.length))]
  }
}

class CHO_view_model_01 {

  constructor() {
    this.color = '#F57F17'
  }

  draw(position, size) {
    push()
    {
      translate(position.x, position.y)
      fill(this.color)
      noStroke()
      rectMode(CENTER)
      rect(0 - (size / 2 - 3), 0 - (size / 2 - 3), size / 2, size / 2)
      rect(0 - (size / 2 - 3), 0 + (size / 2 - 3), size / 4, size / 4)
      rect(0 + (size / 2 - 3), 0 - (size / 2 - 3), size / 4, size / 4)
      rect(0 + (size / 2 - 3), 0 + (size / 2 - 3), size / 2, size / 2)
    }
    pop()
  }
}

class CHO_view_model_02 {

  constructor() {
    this.color = '#F57F17'
  }

  draw(position, size) {
    push()
    {
      translate(position.x, position.y)
      fill(this.color)
      noStroke()
      rectMode(CENTER)
      rect(0 - (size / 2 - 3), 0 - (size / 2 - 3), size / 4, size / 4)
      rect(0 - (size / 2 - 3), 0 + (size / 2 - 3), size / 2, size / 2)
      rect(0 + (size / 2 - 3), 0 - (size / 2 - 3), size / 2, size / 2)
      rect(0 + (size / 2 - 3), 0 + (size / 2 - 3), size / 4, size / 4)
    }
    pop()
  }
}
