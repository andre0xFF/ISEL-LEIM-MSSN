var Particle = function (position) {

  this.acceleration = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = position.copy();
  this.timeToLive = 255;
}

Particle.prototype.run = function () {

  this.update();
  this.display();
}

Particle.prototype.update = function () {

  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.timeToLive -= 2;
}

Particle.prototype.display = function () {

  stroke(255, 255, 255, this.timeToLive);
  strokeWeight(2);
  fill(210, 210, 255, this.timeToLive);
  ellipse(this.position.x, this.position.y, 5, 5);
}

Particle.prototype.isDead = function () {

  if (this.timeToLive < 0) {

    return true;
  }
  else {
    return false;
  }
}

var Particle_System = function (position) {

  this.origin = position.copy();
  this.particles = [];
}

Particle_System.prototype.addParticles = function (number) {

  for (var i = 0; i < number; i++) {

    this.particles.push(new Particle(this.origin));
  }
}

Particle_System.prototype.run = function () {

  for (var i = this.particles.length - 1; i >= 0; i--) {

    var p = this.particles[i];
    p.run();

    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
}
