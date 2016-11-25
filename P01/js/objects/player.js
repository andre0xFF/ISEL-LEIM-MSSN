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

  for (var i = 0; i < this.pulses.length; i++) {

    this.pulses[i].active ? this.pulses[i].draw() : this.pulses.splice(i, 1);
  }
}
Player.prototype.update = function () {

  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
}
Player.prototype.light_beam = function () {

  if (this.energy <= 0) {

    return;
  }
  this.laser.shoot(this.position, createVector(this.position.x, 0));
  this.energy -= this.laser.consumption;
}
Player.prototype.light_pulse = function () {

  if (this.energy <= 0) {

    return;
  }


  this.pulses.push(new Pulse(this.position));
  this.energy -= this.pulses[0].consumption;
}
Player.prototype.recharge = function () {

  if (this.energy >= MAX_ENERGY) {

    return;
  }
  this.laser.recharge(this.position, createVector(this.position.x, 0));
  this.energy += this.laser.consumption;
}

/**
 * Spaceship view
 */
var Spaceship = function () {

  this.color = 'rgb(212, 32, 32)'
  this.width = 40;
  this.height = 15;
}
Spaceship.prototype.draw = function (position) {

  push();
  {
    stroke('rgb(68, 9, 43)');
    fill(this.color);
    rectMode(CENTER);
    rect(position.x, position.y - this.height * 0, this.width, this.height, 10);
    rect(position.x, position.y - this.height * 1, this.width / 1.5, this.height, 10);
    rect(position.x, position.y - this.height * 2, this.width / 2, this.height, 10);
    fill(COSMOS_COLOR);
    ellipse(position.x, position.y, 3, 3);
  }
  pop();
}

/**
 * Laser view
 */
var Laser = function (position) {

  this.in_color = 'rgba(230, 204, 33, 0.55)'
  this.out_color = 'rgba(0, 64, 255, 0.54)';
  this.glow = 'rgba(227, 22, 194, 0.63)';
  this.offset = 5;
  this.damage = 4;
  this.consumption = 0.5;
}
Laser.prototype.shoot = function (position, target) {

  push();
  {
    rectMode(CORNERS);
    stroke(this.glow);
    strokeWeight(3);
    fill(this.out_color);
    rect(position.x - this.offset, position.y - this.offset, target.x + this.offset, target.y + this.offset);
  }
  pop();
}
Laser.prototype.recharge = function (position, target) {

  push();
  {
    rectMode(CORNERS);
    stroke(this.glow);
    strokeWeight(3);
    fill(this.in_color);
    rect(position.x - this.offset, position.y - this.offset, target.x + this.offset, target.y + this.offset);
  }
  pop();
}

/**
 * Pulse view/model
 */
var Pulse = function (position) {

  this.active = true;
  this.position = position.copy();
  this.velocity = createVector(0, -0.5);
  this.acceleration = createVector(0, -0.1);
  this.out_color = 'rgba(0, 64, 255, 0.54)';
  this.glow = 'rgba(227, 22, 194, 0.63)';
  this.offset = 5;
  this.position_offset = 15 * 2;
  this.damage = 1;
  this.consumption = 0.25;
}
Pulse.prototype.draw = function () {

  if(!this.active) {
    return;
  }

  this.update();

  push();
  {
    rectMode(CENTER);
    stroke(this.glow);
    strokeWeight(3);
    fill(this.out_color);
    rect(this.position.x, this.position.y - this.position_offset, this.offset, this.offset);
  }
}
Pulse.prototype.update = function () {

  if (this.position.x < 0 || this.position.x > CANVAS_HEIGHT || this.position.y < 0 || this.position.y > CANVAS_WIDTH) {
    this.active = false;
  }

  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  // this.acceleration.mult(0);
}
