const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 920;
const SYSTEM_RADIUS = 100;
const COSMOS_COLOR = 'rgb(26, 26, 26)';
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;

var sun;
var nebula;
var player;
var planets = [];
var level = 1;
var n_planets = 6;
var particles_systems = [];

function setup() {

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  init();
}
function init() {

  var rand = function (min, max) {

    return Math.floor(Math.random() * max + min)
  };
  {
    // Sun
    var position = createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    var mass = 40;
    sun = new Attractor(position, mass);
  };
  {
    // Nebula
    var position = createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    nebula = new Nebula(position);
  }
  {
    // Player
    player = new Player();
  };
  {
    // Planets
    for (var i = 0; i < n_planets; i++) {

      var position = createVector(rand(SYSTEM_RADIUS, width - SYSTEM_RADIUS), rand(SYSTEM_RADIUS, height - SYSTEM_RADIUS));
      var mass = rand(5, 10);

      planets[i] = new Mover(position, mass);
    }
  };
}
function draw() {

  background(COSMOS_COLOR);
  do_physics();
  do_controllers();
  do_views();

  if (planets.length === 0) {

    level += 1;
    n_planets += 2;
    init();
  }
}
function do_physics() {

  Physics.apply_acceleration(player);

  for (var i = 0; i < player.pulses.length; i++) {

    if (Collider.pulse_planet(player.pulses[i], nebula)) {

      var f = Physics.calculate_friction(nebula, player.pulses[i]);
      Physics.apply_force(player.pulses[i], f);
    }

    for (var j = 0; j < planets.length; j++) {

      if (Collider.pulse_planet(player.pulses[i], planets[j])) {

        planets[j].health -= player.pulses[i].damage;
      }
    }

    Physics.apply_force(player.pulses[i], createVector(0, -1 * player.pulses[i].propulsion));
    Physics.apply_acceleration(player.pulses[i]);
  }

  for (var i = 0; i < planets.length; i++) {

    var force = Physics.calculate_attraction(sun, planets[i]);
    Physics.apply_force(planets[i], force);
    Physics.apply_acceleration(planets[i]);
    // planets[i].update();
  }
}
function do_controllers() {

  if (keyIsDown(LEFT_ARROW)) {

    Physics.apply_force(player, createVector(-.1, 0));
  }

  if (keyIsDown(RIGHT_ARROW)) {

    Physics.apply_force(player, createVector(.1, 0));
  }

  if (keyIsDown(KEY_S)) {

    player.light_beam();

    for (var i = 0; i < planets.length; i++) {

      if (Collider.laser_planet(player.laser, planets[i])) {

        planets[i].health -= player.laser.damage;
      }
    }
  }

  if (keyIsDown(KEY_A)) {

    player.recharge();
  }

  if (keyIsDown(KEY_D)) {

    player.light_pulse();
  }

  if (player.position.x < 0 || player.position.x > CANVAS_WIDTH) {

    player.velocity.mult(-1);
    player.acceleration.mult(0);
  }
}
function do_views() {

  nebula.draw();
  sun.draw();
  player.draw();

  for (var i = 0; i < planets.length; i++) {

    if (planets[i].active) {

      planets[i].draw();
    }
    else {

      var ps = new Particle_System(planets[i].position);
      ps.addParticles(random(7, 20));
      particles_systems.push(ps);
      planets.splice(i, 1);
    }
  }

  for (var i = 0; i < particles_systems.length; i++) {

    if (particles_systems[i].particles.length > 0) {

      particles_systems[i].run();
    }
    else {

      particles_systems.splice(i, 1);
    }
  }

  for (var i = 0; i < player.pulses.length; i++) {

    player.pulses[i].active ? player.pulses[i].draw() : player.pulses.splice(i, 1);
  }
}
