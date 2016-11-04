var INITIAL_HEIGHT
var VERBOSE

var frames = {

	previous: 0,
	current: 0,
	delta: 0
}

var engine
	// Free falling
var skydiver_01
	// Free falling euler
var skydiver_02
	// Free falling with friction
var skydiver_03
	// Free falling with friction and parachute
var skydiver_04
	// Free falling and diving in the water
var skydiver_05

function setup() {

	INITIAL_HEIGHT = 1000
	VERBOSE = true

	createCanvas(800, 900)

	engine = new Engine()
	skydiver_01 = new Skydiver(createVector(((width - 100) / 5) * 1, INITIAL_HEIGHT), createVector(0, 0), createVector(0, 0))
	skydiver_02 = new Skydiver(createVector(((width - 100) / 5) * 2, INITIAL_HEIGHT), createVector(0, 0), createVector(0, 0))
	skydiver_03 = new Skydiver(createVector(((width - 100) / 5) * 3, INITIAL_HEIGHT), createVector(0, 0), createVector(0, 0))
	skydiver_04 = new Skydiver(createVector(((width - 100) / 5) * 4, INITIAL_HEIGHT), createVector(0, 0), createVector(0, 0))
	skydiver_05 = new Skydiver(createVector(((width - 100) / 5) * 5, INITIAL_HEIGHT), createVector(0, 0), createVector(0, 0))

	// skydiver_03.mass = 80
	// skydiver_04.mass = 80
}

function draw() {

	if (engine.pause) {
		return
	}

	frames.current = millis()
	frames.delta = frames.current - frames.previous
	frames.previous = frames.current
	engine.time = (frames.current - engine.initial_time) / 1000

	background('#70c989')

	push()

	// translate the axis
	translate(0, height)

	skydiver_01 = ex_01_01(skydiver_01)
	skydiver_02 = ex_01_02(skydiver_02)
	skydiver_03 = ex_02(skydiver_03)
	skydiver_04 = ex_03(skydiver_04)
	skydiver_05 = ex_04(skydiver_05)

	if (
		(skydiver_01.position.y - skydiver_01.diameter / 2) === 0 &&
		(skydiver_02.position.y - skydiver_02.diameter / 2) === 0 &&
		(skydiver_03.position.y - skydiver_03.diameter / 2) === 0 &&
		(skydiver_04.position.y - skydiver_04.diameter / 2) === 0 &&
		(skydiver_05.position.y - skydiver_05.diameter / 2) === 0
	) {
		engine.pause = true
	}

	pop()

	verbose()
}

function verbose() {

	if (!VERBOSE) {
		return
	}

	textSize(10)

	var x = function(n) {
		return ((width - 100) / 5) * n - ((width - 100) / 5) / 2
	}
	var y = 40

	var time_string = `Total time ${(engine.time).toFixed(2)} [ s ]`

	s = skydiver_01.verbose() + time_string
	text(s, x(1), y)

	s = skydiver_02.verbose() + time_string
	text(s, x(2), y)

	s = skydiver_03.verbose() + time_string
	text(s, x(3), y)

	s = skydiver_04.verbose() + time_string
	text(s, x(4), y)

	s = skydiver_05.verbose() + time_string
	text(s, x(5), y)
}

function ex_01_01(skydiver) {
	// update object
	skydiver.draw(height)
		// calculate forces
	skydiver = engine.apply_force(skydiver, GRAVITY)
		// simulate movement
	skydiver = engine.simulate(skydiver, frames.delta)

	return skydiver
}

function ex_01_02(skydiver) {

	skydiver.draw(height)
	skydiver = engine.apply_force(skydiver, GRAVITY)
	skydiver = engine.euler(skydiver, engine.time)

	return skydiver
}

function ex_02(skydiver) {

	return ex_01_02(skydiver)

	// skydiver.draw(height)
	// 
	// skydiver = engine.apply_force(skydiver, GRAVITY)
	//
	// var area = (skydiver.diameter / 2) * Math.PI
	// var abs_velocity = createVector(Math.abs(skydiver.velocity.x), Math.abs(skydiver.velocity.y))
	// var p = skydiver.acceleration.copy()
	// p.mult(skydiver.mass)
	// var fa = skydiver.velocity.copy()
	// fa.mult(abs_velocity)
	// fa.mult(area)
	// fa.mult(FRICTION.density)
	// fa.mult(FRICTION.coefficient)
	// fa.mult(-0.5)
	// fa.add(p)
	//
	// skydiver = engine.apply_force(skydiver, fa)
	// skydiver = engine.simulate(skydiver, frames.delta)
	//
	// return skydiver
}

function ex_03(skydiver) {

	return ex_01_02(skydiver)
}

function ex_04(skydiver) {

	return ex_01_02(skydiver)
}
