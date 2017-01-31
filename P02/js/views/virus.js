class Virus_view {

  constructor() {
    this.view_model = Virus_view.generate()
    this.size = random(5, 20)
  }

  increase_size() { this.size++ }
  decrease_size() { this.size-- }

  draw(position) {
    this.position = position.copy()
    this.view_model.draw(position, this.size)
  }

  static generate() {
    let models = [
      new Virus_view_model_01()
    ]

    return models[floor(random(0, models.length))]
  }
}

class Virus_view_model_01 {

  constructor() {
    this.color_stages = [ '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107' ]
  }

  draw(position, size) {
    push()
    translate(position.x, position.y)
    angleMode(RADIANS)
    noFill()
    rectMode(CENTER)
    stroke(this.color_stages[floor(size * this.color_stages.length / 20)])
    strokeWeight(1)
    for (let i = 0; i < 3 * 2; i++) {
      rotate(Math.PI / 6)
      rect(0, 0, size, size)
      rect(0, 0, size / 1.5, size / 1.5)
      rect(0, 0, size / 3, size / 3)
    }
    pop()
  }
}
