class CHO_view {

  constructor() {
    this.view_model = View.generate([new CHO_view_model_01(), new CHO_view_model_02()])
    this.size = 16
  }

  set_size(percentage) { this.size = percentage * 16 }

  draw(position) {
    this.view_model.draw(position.copy(), this.size)
  }

}

class CHO_view_model_01 {

  constructor() {
    this.color = '#FFEB3B'
    this.t = Math.round(random(-1, 1))
  }

  draw(position, size) {
    push()
    {
      fill(this.color)
      noStroke()
      ellipseMode(CENTER)
      translate(position.x, position.y)
      ellipse(this.t * (size / 4), -this.t * (size / 4), size / 2, size / 2)
      ellipse(-this.t * (size / 4), this.t * (size / 4), size / 4, size / 4)
    }
    pop()
  }

}

class CHO_view_model_02 {

  constructor() {
    this.color = '#FFEB3B'
  }

  draw(position, size) {
    push()
    {
      translate(position.x, position.y)
      fill(this.color)
      noStroke()
      ellipseMode(CENTER)
      ellipse(- (size / 4), - (size / 4), size / 4, size / 4)
      ellipse(- (size / 4), + (size / 4), size / 2, size / 2)
      ellipse(+ (size / 4), - (size / 4), size / 2, size / 2)
      ellipse(+ (size / 4), + (size / 4), size / 4, size / 4)
    }
    pop()
  }

}
