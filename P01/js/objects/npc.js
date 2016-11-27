var Attractor = function (position, mass) {

  this.position = position;
  this.mass = mass;
  this.radius = mass * 2;
  this.shot_direction = createVector(0, 0);
  this.amplified_shot = 90;
  this.G = .2;
  this.color = 'rgb(227, 22, 194)'
  this.glow = 'rgba(227, 22, 194, 0.63)'
  this.glow_effect = 1;
}
Attractor.prototype.draw = function () {

  var amplified_glow = map(noise(this.glow_effect), 0, 1, 10, 100);
  this.glow_effect += 0.01;

  push();
  {
    stroke(this.glow);
    strokeWeight(amplified_glow);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius);
  }
  pop();
}

Attractor.prototype.light_beam_collision = function (target) {
  // TODO
  return (
    laser.collision(this.position, this.shot_direction, target) ||
    laser.collision(this.position, p5.Vector.add(this.shot_direction, 0.2), target) ||
    laser.collision(this.position, p5.Vector.add(this.shot_direction, -0.2), target)
  );
}
var Mover = function (position, mass) {

  this.position = position;
  this.velocity = createVector(1, 0);
  this.acceleration = createVector(0, -.1);
  this.mass = mass;
  this.radius = mass * 3;
  this.color = 'rgb(81, 205, 190)'
  this.glow = 'rgba(227, 22, 194, 0.63)';
  this.health = 100;
  this.active = true;
}
Mover.prototype.draw = function () {

  if (this.active && this.health <= 0) {

    this.active = false;
    return;
  }

  push();
  {
    stroke(this.glow);
    strokeWeight(3);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius);
  }
  pop();
}
var Nebula = function (position) {

  this.position = position;
  this.radius = 250;
  this.ca = .05;
  this.color = 'rgba(60, 51, 51, 0.1)';
}
Nebula.prototype.draw = function () {

  push();
  {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
  pop();
}
