var INITIAL_HEIGHT;
var VERBOSE;

var frames = {

	previous: 0,
	current: 0,
	delta: 0
};

var engine;

/**
 * Divers:
 * 00 << Free falling
 * 01 << Free falling euler
 * 02 << Free falling with friction
 * 03 << Free falling with friction and parachute
 * 04 << Free falling and diving in the water
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
};

function draw() {

	if (engine.pause) {
		return;
	}

	frames.current = millis();
	frames.delta = frames.current - frames.previous;
	frames.previous = frames.current;
	engine.time = (frames.current - engine.initial_time) / 1000;

	background('#70c989');

	push();

	// translate the axis
	translate(0, height);
	// draw objects
	for (var i = 0; i < skydivers.length; i++) {
		skydivers[i].draw(height);
	}
	// apply forces and simulate
	skydivers[0] = ex_01_01(skydivers[0]);
	skydivers[1] = ex_01_02(skydivers[1]);
	skydivers[2] = ex_02(skydivers[2]);
	skydivers[3] = ex_03(skydivers[3]);
	// skydivers[4] = ex_04(skydivers[4]);

	pop();

	verbose(skydivers, frames);

	var x = function(n) {
		return ((width - 100) / 5) * n - ((width - 100) / 5) / 2;
	}
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

	text('FPS:' + (60 * 2 / frames.delta).toFixed(0), 5, 10);

	var x = function(n) {
		return ((width - 100) / 5) * n - ((width - 100) / 5) / 2;
	}
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

	skydiver = engine.apply_force(skydiver, GRAVITY);

	return engine.euler(skydiver, engine.time);
};

function ex_02(skydiver) {

	var area = Math.pow(skydiver.width / 2, 2) * Math.PI;
	var friction = get_friction(skydiver.velocity, area);

	skydiver = engine.apply_force(skydiver, p5.Vector.mult(GRAVITY, skydiver.mass));
	skydiver = engine.apply_force(skydiver, friction);

	return engine.simulate(skydiver, frames.delta);
};

function ex_03(skydiver) {

	var PARACHUTE_HEIGHT = 300;

	skydiver = engine.apply_force(skydiver, p5.Vector.mult(GRAVITY, skydiver.mass));

	if (skydiver.position.y <= PARACHUTE_HEIGHT) {
		skydiver.width = 6;
		var area = Math.pow(skydiver.width / 2, 2) * Math.PI;
		var friction = get_friction(skydiver.velocity, area);

		skydiver = engine.apply_force(skydiver, friction)
	}

	return engine.simulate(skydiver, frames.delta);
};

function ex_04(skydiver) {

	return ex_01_01(skydiver);
};

function get_friction(velocity, area) {

	var friction = velocity.copy();
	friction.mult((-0.5) * FRICTION.coefficient * FRICTION.density * area * friction.copy().mag());
	return friction;
}
