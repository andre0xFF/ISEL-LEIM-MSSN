var Collider = function () {}

Collider.pulse_planet = function (pulse, planet) {

  return (
    pulse.position.x >= planet.position.x - planet.radius &&
    pulse.position.x <= planet.position.x + planet.radius &&
    pulse.position.y >= planet.position.y - planet.radius &&
    pulse.position.y <= planet.position.y + planet.radius
  );
}

Collider.laser_planet = function (laser, planet) {

  return (
    planet.position.x > laser.origin.x - laser.offset &&
    planet.position.x < laser.origin.x + laser.offset
  );
}
