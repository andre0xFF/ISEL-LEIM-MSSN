var INITIAL_HEIGHT;
var VERBOSE;

var frames = {

	previous: 0,
	current: 0,
	delta: 0,
	fps: 0
};

var engine;

/**
 * Divers:
 * 00 << Free falling
 * 01 << Free falling (euler)
 * 02 << Free falling with friction
 * 03 << Free falling with friction and parachuting
 * 04 << Free falling with friction and water diving
 */
var skydivers = [];

function setup() {

	INITIAL_HEIGHT = 1000;
	VERBOSE = true;

	createCanvas(800, 850);

	engine = new Engine();

	for (var i = 0; i < 5; i++) {
		skydivers[i] = new Skydiver(createVector(((width - 100) / 5) * (i + 1), INITIAL_HEIGHT), createVector(0, 0), createVector(0, 0));
	}

	skydivers[2].mass = 80;
	skydivers[3].mass = 80 + 20;
	skydivers[4].mass = 80 + 20;
};

function draw() {

	if (engine.pause) {
		return;
	}

	// Engine and frames calculations
	frames.current = millis();
	frames.delta = frames.current - frames.previous;
	frames.previous = frames.current;
	frames.fps = (1000 * 2 / frames.delta).toFixed(0);
	engine.time = (frames.current - engine.initial_time) / 1000;

	background('#70c989');

	push();

	// Translate the axis in 2D. The y-axis is still inverted
	translate(0, height);
	// Draw all objects
	for (var i = 0; i < skydivers.length; i++) {
		skydivers[i].draw(height);
	}
	// Apply forces and simulate
	skydivers[0] = ex_01_01(skydivers[0]);
	skydivers[1] = ex_01_02(skydivers[1]);
	skydivers[2] = ex_02(skydivers[2]);
	skydivers[3] = ex_03(skydivers[3]);
	skydivers[4] = ex_04(skydivers[4]);

	pop();
	// Show objects' variables
	verbose(skydivers, frames);
	// Show objects' conditions
	var x = function(n) {
		return ((width - 100) / 5) * n - ((width - 100) / 5) / 2;
	};
	var y = 150;

	text('Falling', x(1), y);
	text('Falling (Euler)', x(2), y);
	text('Friction', x(3), y);
	text('Parachuting', x(4), y);
	text('Water diving', x(5), y);
};

function verbose(skydivers, frames) {

	if (!VERBOSE) {
		return;
	}

	textSize(10);
	text('FPS: ' + frames.fps, 5, 10);

	var x = function(n) {
		return ((width - 100) / 5) * n - ((width - 100) / 5) / 2;
	};
	var y = 40;

	for (var i = 0; i < skydivers.length; i++) {
		s = skydivers[i].verbose();
		text(s, x(i + 1), y)
	}
};

function ex_01_01(skydiver) {

	skydiver = engine.apply_force(skydiver, p5.Vector.mult(GRAVITY, skydiver.mass));

	return engine.simulate(skydiver, frames.delta);
};

function ex_01_02(skydiver) {

	skydiver = engine.apply_force(skydiver, p5.Vector.mult(GRAVITY, skydiver.mass));

	return engine.euler(skydiver, engine.time);
};

function ex_02(skydiver) {

	var area = Math.pow(skydiver.width / 2, 2) * Math.PI;
	var air_friction = engine.get_friction(skydiver.velocity, AIR_FRICTION.coefficient, AIR_FRICTION.density, area);

	skydiver = engine.apply_force(skydiver, p5.Vector.mult(GRAVITY, skydiver.mass));
	skydiver = engine.apply_force(skydiver, air_friction);

	return engine.simulate(skydiver, frames.delta);
};

function ex_03(skydiver) {

	var PARACHUTE_HEIGHT = 300;

	skydiver = ex_02(skydiver);

	if (skydiver.position.y <= PARACHUTE_HEIGHT) {
		var area = Math.pow(skydiver.width / 2, 2) * Math.PI;
		var friction = engine.get_friction(skydiver.velocity, AIR_FRICTION.coefficient, AIR_FRICTION.density, area);

		skydiver.width = 6;
		skydiver = engine.apply_force(skydiver, friction);
	}

	return engine.simulate(skydiver, frames.delta);
};

function ex_04(skydiver) {

	var PARACHUTE_HEIGHT = 300;

	skydiver = ex_02(skydiver);

	if (skydiver.position.y <= PARACHUTE_HEIGHT && !skydiver.parachute_open) {
		var area = Math.pow(skydiver.width / 2, 2) * Math.PI;
		var water_friction = engine.get_friction(skydiver.velocity, WATER_FRICTION.coefficient, WATER_FRICTION.density, area);

		skydiver = engine.apply_force(skydiver, water_friction)
	}

	return engine.simulate(skydiver, frames.delta);
};
