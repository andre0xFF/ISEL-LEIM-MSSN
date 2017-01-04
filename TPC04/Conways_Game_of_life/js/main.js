let CELL_SIZE = 8
let gol

function setup() {

  createCanvas(800, 300)

  gol = new GOL(width / CELL_SIZE, height / CELL_SIZE)
}

function draw() {

  background('#ffffff')
  gol.generate()
  gol.draw()
}

class GOL {

  constructor(rows, columns) {

    this.board = [,]
    this.cell_size = CELL_SIZE

    // Initialize multi-dimensional array
    for (var i = 0; i < rows; i++) {

      this.board[i] = new Array(this.columns)
    }

    // Initialize cells
    for (var x = 0; x < rows; x++) {

      for (var y = 0; y < columns; y++) {

        if (x === 0 || y === 0 || x === this.columns - 1 || y === this.rows - 1) {

          this.board[x][y] = 0;
        }
        else {

          this.board[x][y] = Math.floor(random(0, 2))
        }
      }
    }
  }

  generate() {

    let rows = this.board.length
    let columns = this.board[0].length
    let next_gen = [,]

    // Initialize multi-dimensional array
    for (var i = 0; i < rows; i++) {

      next_gen[i] = new Array(columns)
    }

    // Loop all cells to check for neighbors
    for (var x = 1; x < rows - 1; x++) {

      for (var y = 1; y < columns - 1; y++) {

        let c = 0
        // Count the number of the cell neighbors
        for (var i = -1; i < 2; i++) {

          for (var j = -1; j < 2; j++) {

            c += this.board[x + i][y + j]
          }
        }

        // Remove own cell state
        c -= this.board[x][y]
        // Apply game of life rules
        next_gen[x][y] = this.rules(this.board[x][y], c)
      }
    }

    this.board = next_gen
  }

  rules(cell_state, n_neighbors) {

    // Loneliness
    if (cell_state === 1 && n_neighbors < 2) { return 0 }
    // Overpopulation
    if (cell_state === 1 && n_neighbors > 3) { return 0 }
    // Reproduction
    if (cell_state === 0 && n_neighbors === 3) { return 1 }
    // Stasis
    return cell_state
  }

  draw() {

    let rows = this.board.length
    let columns = this.board[0].length

    for (var x = 0; x < rows; x++) {

      for (var y = 0; y < columns; y++) {

        this.board[x][y] === 1 ? fill(0) : fill(255)

        stroke('#b3b3b3')
        rect(x * this.cell_size, y * this.cell_size, this.cell_size, this.cell_size)
      }
    }
  }
}
