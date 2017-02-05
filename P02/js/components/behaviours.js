class Behaviours {

  constructor() {
    this.active = []
    this.priority = null
    // this.default = null
    this.passive = []
    this.queue = []
  }

  add_active(behaviour) { this.active.unshift(behaviour) }
  set_priority(behaviour) { this.priority = behaviour }
  rm_priority() { this.priority = null }
  add_passive(behaviour) { this.passive.unshift(behaviour) }
  rm_passive(behaviour) { this.passive.splice(this.passive.indexOf(behaviour), 1) }

  update() {
    if (this.priority !== null && this.priority.update()) {
      this.priority = null
    }
    if (this.priority === null && this.queue.length > 0) {
      this.priority = this.queue.pop()
    }
    if (this.priority !== null) {
      return
    }
    for (var i = 0; i < this.active.length; i++) {
      if (this.active[i].update()) {
        this.active.splice(i, 1)
      }
    }
    for (var i = 0; i < this.passive.length; i++) {
      this.passive[i].update()
    }
  }

  static vision(position, direction, radius, angle, target) {
    let dif = p5.Vector.sub(target, position)
    if (direction.x !== 0 && direction.y !== 0) {
      let theta = p5.Vector.angleBetween(dif, direction)
      return dif.mag() < radius && theta < angle / 2
    }

      return dif.mag() < radius
  }

  static steering_force(position, velocity, speed, target) {
    let dir = p5.Vector.sub(target, position)
    return p5.Vector.sub(dir.normalize().mult(speed), velocity)
  }

}

class Seek {

  constructor(mover_01, mover_02) {
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.accuracy = SPACING
  }

  update() {
    let steer = Behaviours.steering_force(this.m_01.get_position(), this.m_01.get_velocity(), this.m_01.get_max_speed(), this.m_02.get_position())

    this.m_01.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position()) < this.accuracy
  }

}

class Arrive {

  constructor(mover_01, mover_02, radius) {
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.speed = mover_01.get_max_speed()
    this.radius = radius
    this.accuracy = 0.02
  }

  update() {
    this.speed = this.m_01.get_max_speed()
    let dist = p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position())

    if (dist < this.radius) {
      this.speed = dist * this.speed / this.radius
    }

    let steer = Behaviours.steering_force(this.m_01.get_position(), this.m_01.get_velocity(), this.speed, this.m_02.get_position())

    this.m_01.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position()) < this.accuracy
  }

}

class Flee {

  constructor(mover_01, mover_02) {
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.distance = SPACING * 10
  }

  update() {
    let steer = Behaviours.steering_force(this.m_01.get_position(), this.m_01.get_velocity(), this.m_01.get_max_speed(), this.m_02.get_position())
    steer.mult(-1)

    this.m_01.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position()) > this.distance
  }

}

class Wander {

  constructor(mover) {
    this.mover = mover
    this.delta = 0.4
    this.r = 100
    this.theta = random(2 * Math.PI)
  }

  update() {
    let c = p5.Vector.add(this.mover.get_position(), p5.Vector.mult(this.mover.get_velocity(), this.delta))
    this.theta += random(- Math.PI / 10, Math.PI / 10)
    let t = p5.Vector.add(c, createVector(this.r * Math.cos(this.theta), this.r * Math.sin(this.theta)))
    let steer = Behaviours.steering_force(this.mover.get_position(), this.mover.get_velocity(), this.mover.get_max_speed(), t)

    this.mover.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return false
  }

}

class Pursuit {

  constructor(mover_01, mover_02) {
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.delta = 0.8
    this.accuracy = 1
  }

  update() {
    let steer = Pursuit.calculate(this.m_01.get_position(), this.m_01.get_velocity(), this.m_01.get_max_speed(), this.delta, this.m_02.get_position(), this.m_02.get_velocity())

    this.m_01.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position()) < this.accuracy
  }

  static calculate(position, velocity, speed, delta, target_position, target_velocity) {
    let new_position = p5.Vector.add(target_position, p5.Vector.mult(target_position, delta))
    let steer = Behaviours.steering_force(position, velocity, speed, new_position)
    return steer
  }
}

class Evade {

  constructor(mover_01, mover_02) {
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.delta = 0.8
    this.distance = SPACING * 10
  }

  update() {
    let steer = Pursuit.calculate(this.m_01.get_position(), this.m_01.get_velocity(), this.m_01.get_max_speed(), this.delta, this.m_02.get_position(), this.m_02.get_velocity())
    steer.mult(-1)

    this.m_01.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position()) > this.distance
  }

}

class Avoid {

  constructor(mover_01, radius, angle, mover_02) {
    this.m_01 = mover_01
    this.radius = radius
    this.angle = angle
    this.m_02 = mover_02
  }

  update() {
    let r = Behaviours.vision(this.m_01.get_position(), this.m_01.get_direction(), this.radius, this.angle, this.m_02.get_position())

    if (!r) {
      return false
    }

    let vd = createVector(this.m_01.get_velocity().y, - this.m_01.get_velocity().x)
    this.m_01.add_force(p5.Vector.sub(vd, this.m_01.get_velocity()))

    return true
  }

  exit() { }

}

class Attack {

  constructor(boid_01, boid_02) {
    this.b_01 = boid_01
    this.b_02 = boid_02
    this.position_accuracy = SPACING
  }

  update() {
    if (p5.Vector.dist(this.b_01.get_mover().get_position(), this.b_02.get_mover().get_position()) > this.position_accuracy) {
      return
    }

    let attack = this.b_01.get_attack()
    let dmg = this.b_02.damage(attack)
    this.b_01.increase_energy(dmg)
    return this.exit()
  }

  exit() {
    return !this.b_02.is_alive()
  }

}

class Separate {

  constructor(mover_01, radius, angle, mover_02) {
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.radius = radius
    this.angle = angle
  }

  update() {
    let r = Behaviours.vision(this.m_01.get_position(), this.m_01.get_direction(), this.radius, this.angle, this.m_02.get_position())

    if (!r) {
      return false
    }

    let f = Separate.calculate(this.m_01.get_position(), this.m_01.get_velocity(), this.m_02.get_position())
    this.m_01.add_force(f)

    return true
  }

  exit() { }

  static calculate() {
    let dif = p5.Vector.sub(position, velocity, target)
    let mag = dig.mag()
    dif.normalize().div(d)

    return p5.Vector.sub(dif, velocity)
  }

}

class Align {

  constructor(mover_01, radius, angle, mover_02) {
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.radius = radius
    this.angle = angle
  }

  update() {
    let r = Behaviours.vision(this.m_01.get_position(), this.m_01.get_direction(), this.radius, this.angle, this.m_02.get_position())

    if (!r) {
      return false
    }

    let f = Align.calculate(this.m_01.get_velocity(), this.m_01.get_max_speed(), this.m_02.get_velocity())

    return true
  }

  exit() {
    return false
  }

  static calculate(velocity, speed, target_velocity) {
    let new_direction = p5.Vector.add(velocity, target_velocity)
    new_direction.normalize().mult(speed)
    return p5.Vector.sub(new_direction, velocity)
  }

}

class Cohesion {

  constructor(mover_01, radius, angle, mover_02) {
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.radius = radius
    this.angle = angle
  }

  update() {
    let r = Behaviours.vision(this.m_01.get_position(), this.m_01.get_direction(), this.radius, this.angle, this.m_02.get_position())

    if (!r) {
      return false
    }

    let steer = Cohesion.calculate(this.m_01.get_position(), this.m_01.get_velocity(), this.radius, this.angle, this.m_02.get_position())

    this.m_01.add_force(steer)
    return true
  }

  exit() { }

  static calculate(position, velocity, radius, angle, target) {
    let new_position = p5.Vector.add(position, target)
    new_position.div(2)
    return Behaviours.steering_force(position, velocity, radius, angle, new_position)
  }

}
