class View {

  static generate(models) {
    return models[floor(random(0, models.length))]
  }
}

class Vision_view {

  constructor(radius, angle) {
    this.view_model = View.generate([new Vision_view_model_01()])
    this.radius = radius
    this.angle = angle
  }

  draw(position, direction) {
    this.view_model.draw(position.copy(), direction.copy(), this.radius, this.angle)
  }
}

class Vision_view_model_01 {

  constructor() {
    this.color = 'rgba(53, 30, 30, 0.54)'
  }

  draw(pos, dir, radius, angle) {
    push()
    {
      fill(this.color)
      translate(pos.x, pos.y)
      noStroke()
      rotate(dir.heading())
      arc(0, 0, radius * 2, radius * 2, - angle / 2, angle / 2)
    }
    pop()
  }

}
