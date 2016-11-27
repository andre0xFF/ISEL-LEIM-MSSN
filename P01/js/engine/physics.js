var Physics = function () {}

Physics.apply_force = function (mover, force) {

  var f = p5.Vector.div(force, mover.mass);
  mover.acceleration.add(f);
}

Physics.apply_acceleration = function (mover) {

  mover.velocity.add(mover.acceleration);
  mover.position.add(mover.velocity);
  mover.acceleration.mult(0);
}

Physics.calculate_attraction = function (attractor, mover) {

  var r = p5.Vector.sub(attractor.position, mover.position);
  var r_magn = r.copy().mag();
  var r_norm = r.copy().normalize();

  var fr = attractor.mass * mover.mass;
  fr /= r_magn;
  fr *= attractor.G;

  return p5.Vector.mult(r_norm, fr);
}

Physics.calculate_friction = function (frictioner, mover) {

  var v_magn = mover.velocity.copy().mag();
  var v_norm = mover.velocity.copy().normalize();
  v_norm.mult(v_magn);
  v_norm.mult(frictioner.ca);
  v_norm.mult(-1);
  return v_norm;
}
