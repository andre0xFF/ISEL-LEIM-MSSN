class Avoid {

  constructor(mover, vision, objects) {
    this.mover = mover
    this.vision = vision
    this.targets = objects
    this.persistent = true
    this.skip = []
  }

  update() {
    for (let i = 0; i < this.targets.length; i++) {
      if (this.skip.includes(i)) {
        continue
      }

      let r = Boid.vision(this.mover.get_position(), this.mover.get_direction(), this.vision.radius, this.vision.angle, this.targets[i].mover.get_position())

      if (r) {
        let f = Avoid.calculate(this.mover.get_velocity())
        this.mover.add_force(f)

      } else if (!this.persistent) {
        this.skip.push(i)
      }
    }
  }

  static calculate(velocity) {
    let vd = createVector(velocity.y, - velocity.x)
    return p5.Vector.sub(vd, velocity)
  }

}

class Wander {

  constructor(mover) {
    this.mover = mover
    this.delta = 0.4
    this.r = 100
    this.theta = random(2 * Math.PI)
    this.persistent = true
  }

  update() {
    let f = Wander.calculate(this.mover.get_position(), this.mover.get_velocity(), this.mover.get_max_speed(), this.r, this.delta, this.theta)

    this.mover.add_force(f)
    this.theta += random(- Math.PI / 10, Math.PI / 10)

    return !this.persistent
  }

  static calculate(position, velocity, speed, radius, delta, theta) {
    let c = p5.Vector.add(position, p5.Vector.mult(velocity, delta))
    let t = p5.Vector.add(c, createVector(radius * Math.cos(theta), radius * Math.sin(theta)))
    let steer = Boid.steering_force(position, velocity, speed, t)
    return steer
  }

}

class Evade {

  constructor(mover, objects) {
    this.mover = mover
    this.targets = objects
    this.delta = 0.8
    this.distance = SPACING * 2
    this.persistent = true
    this.skip = []
  }

  update() {
    for (let i = 0; i < this.targets.length; i++) {
      if (!this.skip.includes(i) && p5.Vector.dist(this.mover.get_position(), this.targets[i].mover.get_position()) <= this.distance) {
        let f = Evade.calculate(this.mover.get_position(), this.mover.get_velocity(), this.mover.get_max_speed(), this.delta, this.targets[i].mover.get_position(), this.targets[i].mover.get_velocity())
        this.mover.add_force(f)
      }
      else if (!this.persistent) {
        this.skip.push(i)
      }
    }
  }

  static calculate(position, velocity, speed, delta, target_position, target_velocity) {
    let steer = Pursuit.calculate(position, velocity, speed, delta, target_position, target_velocity)
    steer.mult(-1)
    return steer
  }

}

class Seek {

  constructor(mover, objects) {
    this.mover = mover
    this.targets = objects
    this.accuracy = SPACING
    this.target = this.targets[0]
    this.persistent = false
    this.skip = []
  }

  update() {
    if (this.targets.length === 0) { return true }

    for (var i = 0; i < this.targets.length; i++) {
      if (!this.skip.includes(i) && p5.Vector.dist(this.targets[i].mover.get_position(), this.mover.get_position()) < p5.Vector.dist(this.target.mover.get_position(), this.mover.get_position())) {
        this.target = this.targets[i]
      }
    }

    let f = Seek.calculate(this.mover.get_position(), this.mover.get_velocity(), this.mover.get_max_speed(), this.target.mover.get_position())
    this.mover.add_force(f)

    if (!this.persistent && p5.Vector.dist(this.mover.get_position(), this.target.mover.get_position()) < this.accuracy) {
      this.skip.push(this.targets.indexOf(this.target))
    }
  }

  static calculate(position, velocity, speed, target_position) {
    let steer = Boid.steering_force(position, velocity, speed, target_position)
    return steer
  }

}

class Pursuit {

  constructor(mover, objects) {
    this.mover = mover
    this.targets = objects
    this.delta = 0.8
    this.accuracy = 1
    this.target = this.targets[0]
    this.skip = []
    this.persistent = false
  }

  update() {
    if (this.targets.length === 0) { return true }

    for (var i = 0; i < this.targets.length; i++) {
      if (!this.skip.includes(i) && p5.Vector.dist(this.targets[i].mover.get_position(), this.mover.get_position()) < p5.Vector.dist(this.target.mover.get_position(), this.mover.get_position())) {
        this.target = this.targets[i]
      }
    }

    let f = Pursuit.calculate(this.mover.get_position(), this.mover.get_velocity(), this.mover.get_max_speed(), this.delta, this.target.mover.get_position(), this.target.mover.get_velocity())
    this.mover.add_force(f)

    if (!this.persistent && p5.Vector.dist(this.mover.get_position(), this.target.mover.get_position()) < this.accuracy) {
      this.skip.push(this.targets.indexOf(this.target))
    }
  }

  static calculate(position, velocity, speed, delta, target_position, target_velocity) {
    let new_position = p5.Vector.add(target_position, p5.Vector.mult(target_position, delta))
    let steer = Boid.steering_force(position, velocity, speed, new_position)
    return steer
  }
}

class Arrive {

  constructor(mover, slow_down_radius, objects) {
    this.mover = mover
    this.targets = objects
    this.radius = slow_down_radius
    this.accuracy = 0.65
    this.persistent = false
    this.target = this.targets[0]
    this.skip = []
  }

  update() {
    if (this.targets.length === 0) { return true }

    for (var i = 0; i < this.targets.length; i++) {
      if (!this.skip.includes(i) && p5.Vector.dist(this.targets[i].mover.get_position(), this.mover.get_position()) < p5.Vector.dist(this.target.mover.get_position(), this.mover.get_position())) {
        this.target = this.targets[i]
      }
    }

    let f = Arrive.calculate(this.mover.get_position(), this.mover.get_velocity(), this.mover.get_max_speed(), this.radius, this.target.mover.get_position())
    this.mover.add_force(f)

    if (!this.persistent && p5.Vector.dist(this.mover.get_position(), this.target.mover.get_position()) < this.accuracy) {
      this.skip.push(this.targets.indexOf(this.target))
    }
  }

  static calculate(position, velocity, current_speed, slow_down_radius, target_position) {
    let dist = p5.Vector.dist(position, target_position)

    if (dist < slow_down_radius) {
      current_speed = dist * current_speed / slow_down_radius
    }

    let steer = Boid.steering_force(position, velocity, current_speed, target_position)

    return steer
  }

}

class Flee {

  constructor(mover, objects) {
    this.mover = mover_01
    this.targets = objects
    this.distance = SPACING * 10
    this.skip = []
  }

  update() {
    for (let i = 0; i < this.targets.length; i++) {
      if (!this.skip.includes(i) && p5.Vector.dist(this.mover.get_position(), this.targets[i].mover.get_position()) <= this.distance) {
        let f = Flee.calculate(this.mover.get_position(), this.mover.get_velocity(), this.mover.get_max_speed(), this.targets[i].mover.get_position())
        this.mover.add_force(f)
      }
      else if (!this.persistent) {
        this.skip.push(i)
      }
    }
  }

  static calculate(position, velocity, speed, target_position) {
    let steer = Boid.steering_force(position, velocity, speed, target_position)
    steer.mult(-1)
    return steer
  }

}

class Attack {

  constructor(boid, objects) {
    this.boid = boid
    this.targets = objects
    this.position_accuracy = SPACING
    this.persistent = false
    this.skip = []
  }

  update() {
    if (this.targets.length === 0) { return true }

    for (let i = 0; i < this.targets.length; i++) {
      if (!this.skip.includes(i) && this.targets[i].boid.is_alive() && p5.Vector.dist(this.targets[i].mover.get_position(), this.boid.mover.get_position()) < this.position_accuracy) {
        let attack = this.boid.get_attack()
        let dmg = this.targets[i].boid.damage(attack)
        this.boid.increase_energy(dmg)
      }
      else if (!this.targets[i].boid.is_alive() && !this.persistent) {
        this.skip.push(i)
      }
    }
  }

}

class Separate {

  constructor(mover, vision, objects) {
    this.mover = mover
    this.targets = objects
    this.vision = vision
    this.persistent = true
  }

  update() {
    let f = Separate.calculate(this.mover, this.vision, this.objects)
    this.mover.add_force(f)

    return !this.persistent
  }


  static calculate(mover, vision, targets) {
    let in_vision = []

    for (let i = 0; i < targets.length; i++) {
      if (Boid.vision(mover.get_position(), mover.get_direction(), vision.radius, vision.angle, targets[i].mover.get_position())) {
        in_vision.push(targets[i])
      }
    }

    let vd = createVector(0, 0)
    for (var i = 0; i < in_vision.length; i++) {
      let r = p5.Vector.sub(mover.get_position(), in_vision[i].mover.get_position())
      let d = r.mag()
      r.normalize()
      r.div(d)
      vd.add(r)
    }

    vd.normalize()
    vd.mult(mover.get_max_speed())
    return p5.Vector.sub(vd, mover.get_velocity())
  }

}

class Align {

  constructor(mover, vision, objects) {
    this.mover = mover
    this.objects = objects
    this.vision = vision
    this.persistent = true
  }

  update() {
    let f = Align.calculate(this.mover, this.vision, this.objects)
    this.mover.add_force(f)

    return !this.persistent
  }

  static calculate(mover, vision, targets) {
    let in_vision = []

    for (let i = 0; i < targets.length; i++) {
      if (Boid.vision(mover.get_position(), mover.get_direction(), vision.radius, vision.angle, targets[i].mover.get_position())) {
        in_vision.push(targets[i])
      }
    }

    let vd = createVector(0, 0)
    for (let i = 0; i < in_vision.length; i++) {
      vd.add(in_vision[i].mover.get_velocity())
    }

    vd.normalize().mult(mover.get_max_speed())
    return p5.Vector.sub(vd, mover.get_velocity())
  }

}

class Cohesion {

  constructor(mover, vision, objects) {
    this.mover = mover
    this.objects = objects
    this.vision = vision
    this.persistent = true
  }

  update() {
    let f = Cohesion.calculate(this.mover, this.vision, this.objects)
    this.mover.add_force(f)

    return !this.persistent
  }


  static calculate(mover, vision, targets) {
    let in_vision = []

    for (let i = 0; i < targets.length; i++) {
      if (Boid.vision(mover.get_position(), mover.get_direction(), vision.radius, vision.angle, targets[i].mover.get_position())) {
        in_vision.push(targets[i])
      }
    }

    let pos = createVector(0, 0)
    for (let i = 0; i < in_vision.length; i++) {
      pos.add(in_vision[i].mover.get_position())
    }

    pos.div(in_vision.length)
    return Seek.calculate(mover.get_position(), mover.get_velocity(), mover.get_max_speed(), pos)
  }

}

class Flock {

  constructor(objects) {
    this.objects = objects
    this.persistent = true
  }

  update() {
    for (let i = 0; i < this.objects.length; i++) {
      let a = Align.calculate(this.objects[i].mover, this.objects[i].get_vision(), this.objects)
      let s = Separate.calculate(this.objects[i].mover, this.objects[i].get_vision(), this.objects)
      let c = Cohesion.calculate(this.objects[i].mover, this.objects[i].get_vision(), this.objects)
      s.mult(1.5)
      a.mult(1)
      c.mult(1.5)
      s.add(a)
      s.add(c)
      this.objects[i].mover.add_force(s)
    }

    return !this.persistent
  }
}
