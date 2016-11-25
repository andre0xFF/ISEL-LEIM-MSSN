const N_PLANETS = 6;
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
    var mass = 30;
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
    for (var i = 0; i < N_PLANETS; i++) {

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
}
function do_physics() {

  player.update();

  for (var i = 0; i < planets.length; i++) {

    var force = calculate_attraction(sun, planets[i]);
    apply_force(planets[i], force);
    planets[i].update();
  }
}
function do_controllers() {

  if (keyIsDown(LEFT_ARROW)) {

    apply_force(player, createVector(-.1, 0));
  }

  if (keyIsDown(RIGHT_ARROW)) {

    apply_force(player, createVector(.1, 0));
  }

  if (keyIsDown(KEY_S)) {

    player.light_beam();
  }

  if (keyIsDown(KEY_A)) {

    player.recharge();
  }

  if (keyIsDown(KEY_D)) {

    player.light_pulse();
  }
}
function do_views() {

  nebula.draw();
  sun.draw();
  player.draw();

  for (var i = 0; i < planets.length; i++) {

    planets[i].draw();
  }
}
function apply_force(mover, force) {

  var f = p5.Vector.div(force, mover.mass);
  mover.acceleration.add(f);
}
function calculate_attraction(attractor, mover) {

  var r = p5.Vector.sub(attractor.position, mover.position);
  var r_magn = r.copy().mag();
  var r_norm = r.copy().normalize();

  var fr = attractor.mass * mover.mass;
  fr /= r_magn;
  fr *= attractor.G;

  return p5.Vector.mult(r_norm, fr);
}
// function calculate_attraction_02(attractor, mover) {
//
//   // Calculate direction of force
//   var force = p5.Vector.sub(attractor.position, mover.position);
//   // Distance between objects
//   var distance = force.mag();
//   // Limiting the distance to eliminate "extreme" results
//   // for very close or very far objects
//   distance = constrain(distance, 5, 25);
//   // Normalize vector
//   force.normalize();
//   // Calculate gravitional force magnitude
//   var strength = (attractor.G * attractor.mass * mover.mass) / (distance * distance);
//   // Get force vector --> magnitude * direction
//   force.mult(strength);
//   return force;
// }
function check_collision() {}
