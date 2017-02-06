class Virus_view {

  constructor() {
    this.view_model = View.generate([new Virus_view_model_01()])
    this.size = 12
  }

  set_size(percentage) { this.size = percentage * 16 }

  draw(position, direction) {
    this.view_model.draw(position.copy(), this.size, direction)
  }
}

class Virus_view_model_01 {

  constructor() {
    this.color = '#FFEB3B'
    this.stroke = '#4CAF50'
    this.angle = 0
    this.angular_velocity = 0.005 * Math.round(random(-1, 1))
  }

  draw(position, size, direction) {
    push()
    {
      ellipseMode(CENTER)
      fill(this.color)
      stroke(this.stroke)
      translate(position.x, position.y)
      rotate(direction.heading() + this.angle)
      strokeWeight(2)
      line(0, - size / 4, - size / 4, + size / 4)
      line(- size / 4, + size / 4, + size / 4, + size / 4)
      line(+ size / 4, + size / 4, 0, - size / 4)
      ellipse(0, - size / 4, size / 3, size / 3)
      ellipse(- size / 4, + size / 4, size / 3, size / 3)
      ellipse(+ size / 4, + size / 4, size / 3, size / 3)
    }
    pop()

    this.angle += this.angular_velocity
  }
}
