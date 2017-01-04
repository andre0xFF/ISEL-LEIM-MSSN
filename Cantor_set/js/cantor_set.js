// Example 08_04

function setup() {

  createCanvas(800, 600)
  strokeWeight(2)

  cantor(10, 5, width - 10)
}

function cantor(x, y, length) {

  if (length < 1) {

    return
  }

  line(x, y, x + length, y)

  y += 20

  cantor(x, y, length * 1/3)
  cantor(x + length * 2/3, y, length * 1/3)
}
