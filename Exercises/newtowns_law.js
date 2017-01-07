var RandomWalker = function(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector()
}

RandomWalker.prototype.draw = function() {
    fill('#000000')
    ellipse(this.position.x, this.position.y, 10, 10)
}

RandomWalker.prototype.move = function() {
    this.acceleration = createVector(random(-1, 1), random(-1, 1))
    force = createVector(0, 10)
    mass = 10
    this.acceleration = force.div(mass)
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
}

var ant

function setup() {
    createCanvas(400, 400)
    x = width / 2
    y = height - 10

    ant = new RandomWalker(width / 2, 0)
}

function draw() {
    // Animation
    background('#ffffff')

    // Ant initial position
    fill('#c2bc2c')
    ellipse(width / 2, height - 20, 10, 10)

    // Red target
    fill('#d94343')
    ellipse(width / 2, height / 6, 20, 20)

    ant.move()
    ant.draw()
}
