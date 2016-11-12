var INITIAL_ALTITUDE;
var VERBOSE;
var NUM_OBJECTS;
var PARACHUTE_ALTITUDE;

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
 * 05 << Free falling with friction, water diving and parachute drop
 */
var skydivers = [];

function setup() {

	VERBOSE = true;
	NUM_OBJECTS = 6;
	INITIAL_ALTITUDE = 1000;
	PARACHUTE_ALTITUDE = 300;

	createCanvas(1000, 850);

	engine = new Engine();

	for (var i = 0; i < NUM_OBJECTS; i++) {
		skydivers[i] = new Skydiver(createVector(((width - 100) / NUM_OBJECTS) * (i + 1), INITIAL_ALTITUDE), createVector(0, 0), createVector(0, 0));
	}

	skydivers[2].mass = 80;
	skydivers[3].mass = 80 + 20;
	skydivers[4].mass = 80 + 20;
	skydivers[5].mass = 80 + 20;
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

	background('#70b4c9');

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
	skydivers[4] = ex_04_01(skydivers[4]);
	skydivers[5] = ex_04_02(skydivers[5]);

	pop();
	// Show objects' variables
	verbose(skydivers, frames);
	// Show objects' conditions
	var x = function(n) {
		return ((width - 100) / NUM_OBJECTS) * n - ((width - 100) / NUM_OBJECTS) / 2;
	};
	var y = 150;

	text('Falling', x(1), y);
	text('Falling (Euler)', x(2), y);
	text('Friction', x(3), y);
	text('Parachuting', x(4), y);
	text('Water diving', x(5), y);
	text('Water diving + Parachute drop', x(6), y)

	var y = map(INITIAL_ALTITUDE - PARACHUTE_ALTITUDE, 0, INITIAL_ALTITUDE, 0, height);
	line(0, y, width, y);
	text('Parachuting altitude / Water level', 5, y - 10);
};

function verbose(skydivers, frames) {

	if (!VERBOSE) {
		return;
	}

	textSize(10);
	text('FPS: ' + frames.fps, 5, 10);

	var x = function(n) {
		return ((width - 100) / NUM_OBJECTS) * n - ((width - 100) / NUM_OBJECTS) / 2;
	};
	var y = 40;

	for (var i = 0; i < skydivers.length; i++) {
		s = skydivers[i].verbose();
		text(s, x(i + 1), y)
	}
};

/**
 * Free falling
 */
function ex_01_01(skydiver) {

	skydiver = engine.apply_force(skydiver, p5.Vector.mult(GRAVITY, skydiver.mass));

	return engine.simulate(skydiver, frames.delta);
};

/**
 * Free falling (euler)
 */
function ex_01_02(skydiver) {

	skydiver = engine.apply_force(skydiver, p5.Vector.mult(GRAVITY, skydiver.mass));

	return engine.euler(skydiver, engine.time);
};

/**
 * Free falling with friction
 */
function ex_02(skydiver) {

	var area = Math.pow(skydiver.width / 2, 2) * Math.PI;
	var air_friction = engine.get_friction(skydiver.velocity, AIR.coefficient, AIR.density, area);

	skydiver = engine.apply_force(skydiver, air_friction);
	skydiver = engine.apply_force(skydiver, p5.Vector.mult(GRAVITY, skydiver.mass));

	return engine.simulate(skydiver, frames.delta);
};

/**
 * Free falling with friction and parachuting
 */
function ex_03(skydiver) {

	if (skydiver.position.y <= PARACHUTE_ALTITUDE) {
		skydiver.width = 6;
		skydiver.height = 3;
	}

	return ex_02(skydiver);
};

/**
 * Free falling with friction and water diving
 */
function ex_04_01(skydiver) {

	if (skydiver.position.y > PARACHUTE_ALTITUDE) {
		return ex_02(skydiver);
	}

	var area = Math.pow(skydiver.width / 2, 2) * Math.PI;
	var water_friction = engine.get_friction(skydiver.velocity, WATER.coefficient, WATER.density, area);

	skydiver = engine.apply_force(skydiver, water_friction);
	skydiver = engine.apply_force(skydiver, p5.Vector.mult(GRAVITY, skydiver.mass));

	return engine.simulate(skydiver, frames.delta);
};

/**
 * Free falling with friction, water diving and parachute drop
 */
function ex_04_02(skydiver) {

	if (skydiver.position.y <= PARACHUTE_ALTITUDE && skydiver.parachute) {
		skydiver.mass -= 20;
		skydiver.parachute = false;
	}

	return ex_04_01(skydiver);
}

/**
 * Free falling with friction, water diving and parachute drop
 */
function mouseWheel(event) {

	for (var i = 0; i < skydivers.length; i++) {
		if (i == 1) {
			continue;
		}
		skydivers[i].position.y -= event.delta / 5;
	}
}
