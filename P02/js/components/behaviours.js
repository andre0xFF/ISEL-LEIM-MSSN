class Behaviours {

  constructor() {
    this.active = null
    this.priority = null
    this.queue = {
      active: [],
      passive: []
    }

    this.active = null
    this.priority = null
    this.default = null
    this.passive = []
    this.queue = []
  }

  add(behaviour) { this.queue.unshift(behaviour) }
  rm() { this.active = null }
  set_default(behaviour) { this.default = behaviour }
  set_priority(behaviour) { this.priority = behaviour }
  rm_priority() { this.priority = null }
  add_passive(behaviour) { this.passive.unshift(behaviour) }
  rm_passive(behaviour) { this.passive.splice(this.passive.indexOf(behaviour), 1) }

  update() {
    // Update all passive behaviours
    for (var i = 0; i < this.passive.length; i++) {
      this.passive[i].update()
    }
    // Check if there is any behaviour with priority
    if (this.priority !== null) {
      this.active = this.priority
      this.priority = null
    }
    // Check if there is any behaviour to start
    if (this.active === null && this.queue.length > 0) {
      this.active = this.queue.pop()
    }
    // If there are no behaviours at all then fall back to default
    if (this.active === null) {
      this.active = this.default
    }
    // Update the current behaviour
    if (this.active !== null && this.active.update()) {
      this.active = null
    }
  }

}

class Seek {

  constructor(mover_01, mover_02) {
    this.time = millis()
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.accuracy = SPACING
  }

  update() {
    let steer = Seek.calc_steering_force(this.m_01.get_position(), this.m_01.get_velocity(), this.m_01.get_max_speed(), this.m_02.get_position())

    this.m_01.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position()) < this.accuracy
  }

  static calc_steering_force(pos, vel, desired_speed, target_pos) {
    let dir = p5.Vector.sub(target_pos, pos)
    return p5.Vector.sub(dir.normalize().mult(desired_speed), vel)
  }

}

class Arrive {

  constructor(mover_01, mover_02, radius) {
    this.time = millis()
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

    let steer = Seek.calc_steering_force(this.m_01.get_position(), this.m_01.get_velocity(), this.speed, this.m_02.get_position())

    this.m_01.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position()) < this.accuracy
  }

}

class Flee {

  constructor(mover_01, mover_02) {
    this.time = millis()
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.distance = SPACING * 10
  }

  update() {
    let steer = Seek.calc_steering_force(this.m_01.get_position(), this.m_01.get_velocity(), this.m_01.get_max_speed(), this.m_02.get_position())
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
    let steer = Seek.calc_steering_force(this.mover.get_position(), this.mover.get_velocity(), this.mover.get_max_speed(), t)

    this.mover.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return false
  }

}

class Pursuit {

  constructor(mover_01, mover_02) {
    this.time = millis()
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.delta = 0.8
    this.accuracy = 1
  }

  update() {
    let target = p5.Vector.add(this.m_02.get_position(), p5.Vector.mult(this.m_02.get_velocity(), this.delta))
    let steer = Seek.calc_steering_force(this.m_01.get_position(), this.m_01.get_velocity(), this.m_01.get_max_speed(), target)

    this.m_01.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position()) < this.accuracy
  }

}

class Evade {

  constructor(mover_01, mover_02) {
    this.time = millis()
    this.m_01 = mover_01
    this.m_02 = mover_02
    this.delta = 0.8
    this.distance = SPACING * 10
  }

  update() {
    let target = p5.Vector.add(this.m_02.get_position(), p5.Vector.mult(this.m_02.get_velocity(), this.delta))
    let steer = Seek.calc_steering_force(this.m_01.get_position(), this.m_01.get_velocity(), this.m_01.get_max_speed(), target)
    steer.mult(-1)

    this.m_01.add_force(steer.copy())
    return this.exit()
  }

  exit() {
    return p5.Vector.dist(this.m_01.get_position(), this.m_02.get_position()) > this.distance
  }

}

class Separate {

  constructor(mover_01, mover_02) {
    this.time = millis()
    this.m_01 = mover_01
    this.m_02 = mover_02
  }

  update() {

  }

  exit() {
    return true
  }

}

class Avoid {

  constructor(mover_01, radius, angle, mover_02) {
    this.time = millis()
    this.m_01 = mover_01
    this.radius = radius
    this.angle = angle
    this.m_02 = mover_02
  }

  update() {
    let r = Avoid.has_vision(this.m_01.get_position(), this.m_01.get_direction(), this.radius, this.angle, this.m_02.get_position())

    if (r) {
      let vd = createVector(this.m_01.get_velocity().y, - this.m_01.get_velocity().x)
      this.m_01.add_force(p5.Vector.sub(vd, this.m_01.get_velocity()))
    }

    return r
  }

  exit() { }

  static has_vision(position, direction, radius, angle, target) {
    let dif = p5.Vector.sub(target, position)
    let theta = p5.Vector.angleBetween(dif, direction)
    return dif.mag() < radius && theta < angle / 2
  }

  static avoid_objects(position, velocity, radius, angle, targets) {
    let c = 0
    let cm = createVector(0, 0)
    for (let i = 0; i < targets.length; i++) {
      let dir = velocity.copy()
      if(!Avoid.has_vision(position, dir.normalize(), radius, angle, target[i])) {
        continue
      }
      c++
      cm.add(target[i])
    }

    if (c === 0) {
      return cm
    }

    cm.div(c)
    let r = p5.Vector.sub(cm, position)
    let vd = createVector(velocity.y, - velocity.x)
    return p5.Vector.dot(vd, r)
  }

}

class Attack {

  constructor(mover_01, mover_02) {
    this.time = millis()
    this.m_01 = mover_01
    this.m_02 = mover_02
  }

  update() {

  }

  exit() {
    return true
  }

}
