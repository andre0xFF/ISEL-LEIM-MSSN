var GRAVITY
var INITIAL_HEIGHT = 1000
var VERBOSE = true

var frames = {

	previous: 0,
	current: 0,
	delta: 0
}

var engine = {

	initial_time: 0,
	time: 0,
	pause: false
}

var skydiver_01
var skydiver_02

function setup() {

	createCanvas(400, INITIAL_HEIGHT)
	GRAVITY = createVector(0, -9.81)
	skydiver_01 = new Skydiver(createVector(width * 1 / 4, INITIAL_HEIGHT), createVector(0, 0), createVector(0, 0))
	skydiver_02 = new Skydiver(createVector(width * 3 / 4, INITIAL_HEIGHT), createVector(0, 0), createVector(0, 0))
}

function draw() {

	if (engine.pause) {
		return
	}

	frames.current = millis()
	frames.delta = frames.current - frames.previous
	frames.previous = frames.current
	engine.time = (frames.current - engine.initial_time) / 1000

	background('#2c6670')

	push()

	// translate the axis
	translate(0, INITIAL_HEIGHT)

	// update object
	skydiver_01.draw()
	skydiver_02.draw()

	// calculate forces
	skydiver_01 = apply_force(skydiver_01, GRAVITY)
	skydiver_02 = apply_force(skydiver_02, GRAVITY)

	// simulate movement
	skydiver_01 = euler(skydiver_01, engine.time)
	skydiver_02 = simulate(skydiver_02, frames.delta)

	if ((skydiver_01.position.y - skydiver_01.diameter / 2) === 0 && 0 === (skydiver_02.position.y - skydiver_02.diameter / 2)) {
		engine.pause = true
	}

	pop()

	if (!VERBOSE) {
		return
	}

	textSize(10)
	s = skydiver_01.verbose() + `Total time ${(engine.time).toFixed(2)} [ s ]`
	text(s, 1, 20)
	console.log(s + '\n*************************')
	s = skydiver_02.verbose() + `Total time ${(engine.time).toFixed(2)} [ s ]`
	text(s, width / 2, 20)
}

function euler(object, time) {

	object.velocity.y = 0 + object.acceleration.y * time
	object.position.y = INITIAL_HEIGHT + 0.5 * object.acceleration.y * Math.pow(time, 2)

	if (object.position.y - object.diameter / 2 <= 0) {
		object.position.y = object.diameter / 2
		object.velocity.y = 0
	}

	object.acceleration.mult(0)
	return object
}

function simulate(object, delta) {

	object.move(delta)
	return object
}

function apply_force(object, force) {

	object.acceleration.add(force)
	return object
}
