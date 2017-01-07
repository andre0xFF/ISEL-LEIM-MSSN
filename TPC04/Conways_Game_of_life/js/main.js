let CELL_SIZE = 8
let gol
let fps = 10

function setup() {

  createCanvas(600, 400)

  frameRate(fps)
  background('#000000')
  noStroke()
  gol = new GOL(width / CELL_SIZE, height / CELL_SIZE)
}

function draw() {

  gol.generate()
  gol.draw()
}

function mousePressed() {

  let x = Math.ceil(mouseX / CELL_SIZE)
  let y = Math.ceil(mouseY / CELL_SIZE)

  for (var row = -2; row < 3; row++) {

    for (var column = -2; column < 3; column++) {

      if (x + row > 0 && x + row < width / CELL_SIZE && y + column > 0 && y + column < height / CELL_SIZE) {

        console.log(x + row, y + column)
        gol.board[x + row][y + column] = new Cell(Math.ceil(random(0, 2)))
      }
    }
  }
}

function mouseWheel(event) {

  fps = constrain(fps + event.delta / 3, 0, 90)
  frameRate(fps)
  console.log(`Frame rate: ${fps}`)
}

class Cell {

  constructor(state) {

    this.set_state(state)
  }

  set_state(new_state) {

    if (this.state == 0 && new_state == 1) {
      // born
      this.color = '#719bf9'
    }
    else if (new_state == 1) {
      // alive
      this.color = '#0234a4'
    }
    else if (this.state == 1 && new_state == 0) {
      // died
      this.color = '#c40796'
    }
    else {
      // dead
      this.color = '#001441'
    }

    this.state = new_state
  }
}

class GOL {

  constructor(rows, columns) {

    this.board = []
    this.cell_size = CELL_SIZE

    // Initialize multi-dimensional array
    for (let i = 0; i < rows; i++) {

      this.board[i] = new Array(this.columns)
    }

    // Initialize cells
    for (let x = 0; x < rows; x++) {

      for (let y = 0; y < columns; y++) {

        if (x === 0 || y === 0 || x === this.columns - 1 || y === this.rows - 1) {

          this.board[x][y] = new Cell(0);
        } else {

          this.board[x][y] = new Cell(Math.floor(random(0, 2)))
        }
      }
    }
  }

  generate() {

    let rows = this.board.length
    let columns = this.board[0].length
    let next_gen = []

    // Loop all cells to check for neighbors
    for (let x = 0; x < rows; x++) {

      // Initialize aux multi-dimensional array
      next_gen[x] = new Array(columns)

      for (let y = 0; y < columns; y++) {
        // Apply game of life rules
        let neighbors = this.count_neighbors(x, y)
        let new_state = this.get_next_state(this.board[x][y].state, neighbors)

        next_gen[x][y] = new Cell(this.board[x][y].state)
        next_gen[x][y].set_state(new_state)
      }
    }

    this.board = next_gen
  }

  count_neighbors(row, column) {

    let c = 0
    let rows = this.board.length
    let columns = this.board[0].length

    for (let i = -1; i < 2; i++) {

      if (row + i < 0 || row + i >= rows) {

        continue
      }

      for (let j = -1; j < 2; j++) {

        if (column + j < 0 || column + j >= columns || column + j === column && row + i === row) {

          continue
        }

        c += this.board[row + i][column + j].state
      }
    }

    return c
  }

  get_next_state(cell_state, n_neighbors) {

    if (cell_state === 1 && n_neighbors < 2) {
      // Loneliness
      return 0
    }
    if (cell_state === 1 && n_neighbors > 3) {
      // Overpopulation
      return 0
    }
    if (cell_state === 0 && n_neighbors === 3) {
      // Reproduction
      return 1
    }
    // Stasis
    return cell_state
  }

  draw() {

    let rows = this.board.length
    let columns = this.board[0].length

    for (let x = 0; x < rows; x++) {

      for (let y = 0; y < columns; y++) {

        fill(this.board[x][y].color)
        ellipse(x * this.cell_size, y * this.cell_size, this.cell_size)
      }
    }
  }
}
