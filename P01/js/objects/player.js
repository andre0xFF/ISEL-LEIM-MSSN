const MAX_ENERGY = 20;

/**
 * Player controller/model
 */
var Player = function () {

  // Physics
  this.position = createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 20);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.mass = 1;
  // Views
  this.body = new Spaceship();
  this.laser = new Laser();
  this.pulses = [];
  // Rules
  this.energy = 10;
}
Player.prototype.draw = function () {

  this.body.draw(this.position);
}
Player.prototype.recharge = function () {

  if (this.energy >= MAX_ENERGY) {

    return;
  }
  this.laser.recharge(this.position, createVector(0, -1));
  this.energy += this.laser.consumption;
}
Player.prototype.light_beam = function () {

  if (this.energy <= 0) {

    return;
  }
  this.laser.shoot(this.position, createVector(0, -1));
  this.energy -= this.laser.consumption;
}
Player.prototype.light_pulse = function () {

  if (this.energy <= 0) {

    return;
  }

  this.pulses.push(new Pulse(this.position));
  this.energy -= this.pulses[0].consumption;
}

/**
 * Spaceship view
 */
var Spaceship = function () {

  this.color = 'rgb(179, 255, 0)'
  this.width = 40;
  this.height = 15;
}
Spaceship.prototype.draw = function (position) {

  var vertices = [
    // left wing
    [-27, -9, -25, -11, -16, -11, -18, -9],
    // right wing
    [+27, -9, +25, -11, +16, -11, +18, -9],
    // engine
    [-18, -9, -15, -13, +15, -13, +18, -9],
    // fuel tank
    [-20, +0, +20,  +0, +27,  -9, -27, -9]
    // cockpit
  ];
  var scale = 1;

  push();
  {
    translate(position.x, position.y);

    stroke(COSMOS_COLOR);
    strokeWeight(1);
    fill(this.color);
    ellipse(0, 0, 40, 40);
    fill(COSMOS_COLOR);
    rectMode(CORNERS);
    rect(-27, -1 * -9, 27, -1 * -20);
    fill(this.color);

    for (var i = 0; i < vertices.length; i++) {

      beginShape();
      {
        for (var j = 0; j < vertices[i].length - 1; j++) {
            vertex(vertices[i][j] * scale, -1 * vertices[i][++j] * scale);
        }
      }
      endShape(CLOSE);
    }
  }
  pop();
}

/**
 * Laser view
 */
var Laser = function () {

  this.magnitude = 1000;
  this.in_color = 'rgba(230, 204, 33, 0.55)'
  this.out_color = 'rgba(0, 64, 255, 0.54)';
  this.glow = 'rgba(227, 22, 194, 0.63)';
  this.offset = 10;
  this.damage = 100/6;
  this.consumption = 0.5;
}
Laser.prototype.shoot = function (origin, direction) {

  this.origin = origin;
  this.direction = direction;

  var target = p5.Vector.add(origin, p5.Vector.mult(direction, this.magnitude));

  push();
  {
    stroke(this.out_color);
    strokeWeight(this.offset);
    fill(this.out_color);
    line(origin.x, origin.y, target.x, target.y);
  }
  pop();
}
Laser.prototype.recharge = function (origin, direction) {

  var target = p5.Vector.add(origin, p5.Vector.mult(direction, this.magnitude));

  push();
  {
    stroke(this.in_color);
    strokeWeight(10);
    fill(this.out_color);
    line(origin.x, origin.y, target.x, target.y);
  }
  pop();
}

/**
 * Pulse view/model
 */
var Pulse = function (position) {

  this.active = true;
  this.position = position.copy();
  this.velocity = createVector(0, -1);
  this.acceleration = createVector(0, 0);
  this.mass = 1;
  this.color = 'rgba(0, 64, 255, 0.54)';
  this.glow = 'rgba(227, 22, 194, 0.63)';
  this.offset = 5;
  this.position_offset = 25;
  this.damage = 1;
  this.propulsion = 0.1;
  this.consumption = 0.25;
}
Pulse.prototype.draw = function () {

  if (!this.active) {
    return;
  }

  this.active = this.check_active();

  push();
  {
    rectMode(CENTER);
    stroke(this.glow);
    strokeWeight(3);
    fill(this.color);
    rect(this.position.x, this.position.y - this.position_offset, this.offset, this.offset);
  }
}
Pulse.prototype.check_active = function () {

  return (
    this.position.x > 0 &&
    this.position.x < CANVAS_WIDTH &&
    this.position.y > 0 &&
    this.position.y < CANVAS_HEIGHT
  );
}
