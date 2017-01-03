// http://mathworld.wolfram.com/CellularAutomaton.html

let ca;

function setup() {

  createCanvas(1300, 160);
  background('#ffffff');
  frameRate(30);

  let rule_set = [0, 1, 0, 1, 1, 0, 1, 0];
  ca = new CA(width / 10, rule_set);
}

function draw() {

  ca.draw();
  ca.generate();

  // Generate a random rule set when CA reaches the bottom
  if (ca.generation >= 35) {

    let rule_set = []

    for (var i = 0; i < 8; i++) {

      rule_set.push(Math.floor(random(0, 2)))
    }
    ca = new CA(width / 10, rule_set);
  }
}

class CA {

  constructor(cells, rule_set) {

    this.rule_set = rule_set;
    this.cells = [];
    this.cell_size = 5;

    // init cells
    for (let i = 0; i < cells; i++) {

      this.cells[i] = 0;
    }

    this.cells[this.cells.length / 2] = 1;
    this.generation = 0;
  }

  generate() {

    let next_gen = [];

    for (let i = 1; i < this.cells.length - 1; i++) {

      let left = this.cells[i - 1];
      let middle = this.cells[i];
      let right = this.cells[i + 1];

      next_gen[i] = this.rules(left, middle, right);
    }

    this.cells = next_gen;
    this.generation++;
  }

  rules(a, b, c) {

    if (a === 1 && b === 1 && c === 1) return this.rule_set[0];
    if (a === 1 && b === 1 && c === 0) return this.rule_set[1];
    if (a === 1 && b === 0 && c === 1) return this.rule_set[2];
    if (a === 1 && b === 0 && c === 0) return this.rule_set[3];
    if (a === 0 && b === 1 && c === 1) return this.rule_set[4];
    if (a === 0 && b === 1 && c === 0) return this.rule_set[5];
    if (a === 0 && b === 0 && c === 1) return this.rule_set[6];
    if (a === 0 && b === 0 && c === 0) return this.rule_set[7];

    return 0;
  }

  draw() {

    for (let i = 0; i < this.cells.length; i++) {

      this.cells[i] === 1 ? fill(0) : fill(255);
      noStroke();
      rect(i * this.cell_size, this.generation * this.cell_size, this.cell_size, this.cell_size);
    }
  }
}
