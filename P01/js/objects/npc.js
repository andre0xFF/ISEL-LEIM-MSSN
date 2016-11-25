var Attractor = function (position, mass) {

  this.position = position;
  this.mass = mass;
  this.G = .2;
  this.color = 'rgb(227, 22, 194)'
  this.glow = 'rgba(227, 22, 194, 0.63)'
  this.glow_effect = 1;
}
Attractor.prototype.draw = function () {

  var amplified_glow = map(noise(this.glow_effect), 0, 1, 10, 100);

  push();
  {
    stroke(this.glow);
    strokeWeight(amplified_glow);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.mass * 2);
  }
  pop();

  this.glow_effect += 0.01;
}
Attractor.prototype.light_beam = function () {
  //TODO
}
var Mover = function (position, mass) {

  this.position = position;
  this.velocity = createVector(1, 0);
  this.acceleration = createVector(0, 0);
  this.mass = mass;
  this.color = 'rgb(81, 205, 190)'
  this.glow = 'rgba(227, 22, 194, 0.63)';
  this.health = 100;
}
Mover.prototype.draw = function () {

  push();
  {
    stroke(this.glow);
    strokeWeight(3);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.mass * 3);
  }
  pop();
}
Mover.prototype.update = function () {

  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
}
var Nebula = function (position) {

  this.position = position;
  this.color = 'rgba(60, 51, 51, 0.1)';
}
Nebula.prototype.draw = function () {

  push();
  {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, 500);
  }
  pop();
}
