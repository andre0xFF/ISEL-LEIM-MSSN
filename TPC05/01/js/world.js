class World {

  constructor(n_rows, n_columns) {

    this.INITIAL_POPULATION = 50

    this.last_time = millis()
    this.update_time = 150
    // TODO graph
    this.terrain = new Grid(n_rows, n_columns)
    this.animals = []
    this.flows = {

      emigration = 8.0,
      immigration = 7.0
    }

    for (let i = 0; i < INITIAL_POPULATION; i++) {

      let animal = createVector(random(width), random(height)), '#FF0000', 15
      animal.velocity = createVector(50, 0)
      this.animals.push(animal)
    }
  }

  run() {

    let time = millis()
    if (time > this.last_time + this.update_time) {

      // TODO add time and total animals to graph
      console.log(`Time: ${this.time / 1000}; Population: ${this.animals.length};`)

      this.update((time - this.last_time) / 1000)
      this.last_time = time
    }
  }

  die(delta_time) {

    for (let i = 0; i < this.animals.length; i++) {

      if (animals[i].dying()) {

        this.animals.splice(i, 1)
      }
    }
  }

  reproduce(delta_time) {

    for (let i = 0; i < this.animals.length; i++) {

      let child = this.animals[i].reproducing(delta_time)

      if (child.is_alive()) {

        child.velocity = createVector(random(-10, 10), random(-10, 10))
        this.animals.push(child)
      }
    }
  }

  emigration(delta_time) {

    if (this.animals.length <= 0) {

      return
    }

    let n = parseInt(flows.emmigration * delta_time)
    let f = flows.emmigration * delta_time - n

    for (var i = 0; i < n; i++) {

      let r = Math.ceil(random(this.animals.length))
      this.animals.splice(i, 1)
    }

    if (random(1) < f) {

      let r = Math.ceil(random(this.animals.length))
      this.animals.splice(i, 1)
    }
  }

  immigration(delta_time) {

    let n = parseInt(flows.immigrationFlow * delta_time)
    let f = flows.immigration * delta_time - n

    for (var i = 0; i < n; i++) {

      let animal = new Animal(createVector(0, random(height), '#64FF00', 15))
      animal.velocity = createVector(20, 0)
      this.animals.push(animal)
    }

    if (random(1) < f) {

      let animal = new Animal(createVector(0, random(height), '#64FF00', 15))
      animal.velocity = createVector(20, 0)
      this.animals.push(animal)
    }
  }

  draw() {

    this.terrain.draw()

    for (var i = 0; i < this.animals.length; i++) {

      this.animals[i].draw()
      // TODO this.graph.draw()
    }
  }

  update(delta_time) {

    this.immigration(delta_time)
    this.emigration(delta_time)
    this.reproduce(delta_time)
    this.die(delta_time)
    this.move_objects(delta_time)
    this.update_death_rate(this.terrain)
  }

  move_objects(delta_time) {

    for (let i = 0; i < this.animals.length; i++) {

      this.animals[i].move(delta_time)
    }
  }

  update_death_rate(terrain) {

    for (var i = 0; i < this.animals.length; i++) {

      let animal = this.animals[i]
      let cell = terrain.get_cell(parseInt(animal.position.x), parseInt(animal.position.y))
      cell.add_animal(animal)
    }

    for (var i = 0; i < this.animals.length; i++) {

      let animal = this.animals[i]
      let cell = terrain.get_cell(parseInt(animal.position.x), parseInt(animal.position.y))

      let death_rate = animal.rate.death.min

      if (this.animals.length > 1) {

          death_rate = animal.rate.death.max
      }

      animal.rate.death.value = .8 * animal.rate.death.value + .2 * death_rate
    }

    terrain.reset_animal_lists()
  }
}

class Animal {

  constructor(position, velocity, color, radius) {

    this.position = position
    this.color = color
    this.radius = radius
    this.velocity = createVector(0, 0)
    this.birth_time = millis()

    // TODO shape
  }

  move(delta_time) {

      this.position.add(p5.Vector.mult(this.velocity, delta_time))

      if (this.position.x < 0) {

        this.position.x += width
      }
      if (this.position.x > width) {

        this.position.x -= width
      }
      if (this.position.y < 0) {

        this.position.y += height
      }
      if (this.position > height) {

        this.position.x -= height
      }
  }

  draw() {

    push()
    translate(this.position.x, this.position.y)
    rotate(this.velocity.heading())
    // TODO shape
    pop()
  }
}
