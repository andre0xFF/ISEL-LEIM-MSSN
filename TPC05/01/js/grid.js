class Grid {

  constructor(n_rows, n_columns) {

    this.cells = []

    // Initialize multi-dimensional array
    for (let i = 0; i < n_rows; i++) {

      this.cells[i] = new Array(n_columns)
      for (let j = 0; j < n_columns; j++) {

        this.cells[i][j] = new Cell(i, j, width / n_columns, height / n_rows)
      }
    }

    update_neighbors() {

      for (let i = 0; i < this.cells.length; i++) {

        for (let j = 0; j < this.cells[0].length; j++) {

          for (let ii = -1; ii < array.length; ii++) {

            for (let jj = -1; jj < array.length; jj++) {

              let row = (i + ii) % this.cells.length
              if (row < 0) { row += this.cells.length }

              let columns = (j + jj) % this.cells[0].length
              if (columns < 0) { column += this.cells[0].length }

              this.cells[i][j].set_neighbors(this.cells[row][column])
            }
          }
        }
      }
    }

    initialize(probability) {

      for (let i = 0; i < this.cells.length; i++) {

        for (let j = 0; j < this.cells[0].length; j++) {

          if (random(1.) < probability) {

            this.cells[i][j].state = true
          }
        }
      }
    }

    kill_all() {

      for (let i = 0; i < this.cells.length; i++) {

        for (let j = 0; j < this.cells[0].length; j++) {

          this.cells[i][j] = false
        }
      }
    }

    draw() {

      for (let i = 0; i < this.cells.length; i++) {

        for (let j = 0; j < this.cells[0].length; j++) {

          this.cells[i][j].draw()
        }
      }
    }

    get_cell(x, y) {

      let w = this.canvas_width / this.cells[0].length
      let h = this.height / this.cells.length
      let row = (y / h) > this.cells.length ? this.cells.length : y / h
      let column = (x / w) > this.cells[0].length ? this.cells.length[0] : x / w

      return this.cells[row][column]
    }

    reset_animal_lists() {


    }
  }
}

class Cell {

  constructor(row, column, width, height) {

    this.STATES = {

      ALIVE: { value: 0, color: 192 },
      DEAD: { value: 1, color: 64 }
    }

    this.row = row
    this.column = column
    this.width = width
    this.height = height
    this.neighbors = []
    this.animals = []
    this.state = this.STATES.DEAD
  }

  flip_state() {

    this.state = this.state.value === 0 ? this.STATES.DEAD : this.STATES.ALIVE
  }

  set_state(state) { this.state = state }

  add_animal(animal) { this.animals.push(animal) }

  reset_animals() { this.animals = [] }

  draw() {

    push()
    fill(this.state.color)
    rect(this.column * this.width, this.line * this.height, this.width, this.height)
    pop()
  }
}
