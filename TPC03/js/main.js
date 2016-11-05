var INITIAL_HEIGHT;
var VERBOSE;

var frames = {

	previous: 0,
	current: 0,
	delta: 0
};

var engine;

/**
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

	skydivers[0] = ex_01_01(skydivers[0]);
	skydivers[1] = ex_01_02(skydivers[1]);
	skydivers[2] = ex_02(skydivers[2]);
	skydivers[3] = ex_03(skydivers[3]);
	skydivers[4] = ex_04(skydivers[4]);

	pop();

	verbose();

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

function verbose() {

	if (!VERBOSE) {
		return;
	}

	textSize(10);

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
	// update object
	skydiver.draw(height);
	// calculate forces
	skydiver = engine.apply_force(skydiver, GRAVITY.copy());
	// simulate movement
	skydiver = engine.simulate(skydiver, frames.delta);

	return skydiver;
};

function ex_01_02(skydiver) {

	skydiver.draw(height);
	skydiver = engine.apply_force(skydiver, GRAVITY.copy());
	skydiver = engine.euler(skydiver, engine.time);

	return skydiver;
};

function ex_02(skydiver) {

	skydiver.draw(height);

	var area = (skydiver.diameter / 2) * Math.PI;
	var fa = skydiver.velocity.copy();
	fa.mult(skydiver.velocity.mag());
	fa.mult(area);
	fa.mult(FRICTION.density);
	fa.mult(FRICTION.coefficient);
	fa.mult(-0.5);

	skydiver = engine.apply_force(skydiver, GRAVITY.copy());
	skydiver = engine.apply_force(skydiver, fa.copy());
	skydiver = engine.simulate(skydiver, frames.delta);

	return skydiver;
};

function ex_03(skydiver) {

	if (skydiver.position.y > 300) {
		return ex_01_02(skydiver)
	}

	skydiver.width = 6;

	return ex_01_02(skydiver);
};

function ex_04(skydiver) {

	return ex_01_01(skydiver);
};
