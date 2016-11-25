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
  // Rules
  this.energy = 10;
}
Player.prototype.draw = function () {

  this.body.draw(this.position);
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
  this.energy -= 0.5;
  this.laser.light_beam(this.position, createVector(this.position.x, 0));
}
Player.prototype.light_pulse = function () {

  if (this.energy <= 0) {

    return;
  }
  this.energy -= 0.1;
  this.laser.light_pulse(this.position, createVector(this.position.x, 0));
}
Player.prototype.recharge_laser = function () {

  if (this.energy >= MAX_ENERGY) {

    return;
  }
  this.energy += 0.25;
  this.laser.recharge(this.position, createVector(this.position.x, 0));
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
  this.width = 5;
  this.offset = 5;

}
Laser.prototype.light_beam = function (position, target) {

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
Laser.prototype.light_pulse = function (position, target) {
  //TODO

  push();
  {}
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
