// F: move forward
// +: turn right
// -: turn left
// [: save position
// ]: restore position

let axiom = 'F'
let generation = 0
let length = 100
let MAX_GENERATIONS = 3

function setup() {

  createCanvas(600, 600)
  background('#125A87')
  stroke('#0A94E9')
  strokeWeight(3)

  let rules = { 'F': 'FF+[+F-F-F]-[-F+F+F]' }
  let l_system = new L_system('F', rules)
  let length = 100

  for (var i = 0; i < MAX_GENERATIONS; i++) {

    l_system.generate()
    push()
    // Turtle.run(width / 2, height, l_system.axiom, length, random(Math.PI / 6, Math.PI / 8))
    // or
    Turtle.run(width / 2, height, l_system.axiom, length, noise(Math.PI / 8))
    pop()
    length *= .5
    console.log(`G ${l_system.generation}: ${l_system.axiom}`)
  }
}

class L_system {

  constructor(axiom, ruleset) {

    this.axiom = axiom
    this.ruleset = ruleset
    this.generation = 0
  }

  generate() {

    let next_gen = ''

    for (let i = 0; i < this.axiom.length; i++) {

      next_gen += this.ruleset[this.axiom[i]] || this.axiom[i]
    }

    this.axiom = next_gen
    this.generation++
  }
}

class Turtle {

  static run(x, y, axiom, initial_length, rotation_angle) {

    let rules = {

      '+': function () { rotate(rotation_angle) },
      '-': function () { rotate(-1 * rotation_angle) },
      'F': function () {

        line(0, 0, 0, -1 * initial_length)
        translate(0, -1 * initial_length)
        ellipse(0, 0, 8, 16)
      },
      '[': function () { push() },
      ']': function () { pop() }
    }

    translate(x, y)
    for (var i = 0; i < axiom.length; i++) {

      rules[axiom[i]]()
    }
  }
}
