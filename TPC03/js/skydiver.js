var Skydiver = function(position, velocity, acceleration) {

	this.position = position
	this.velocity = velocity
	this.acceleration = acceleration
	this.diameter = 20
	this.total_time = 0
}

Skydiver.prototype.draw = function() {

	ellipse(this.position.x, this.position.y, this.diameter, this.diameter)
}

Skydiver.prototype.move = function(delta) {

	this.velocity.add(p5.Vector.mult(this.acceleration, delta / 1000))
	this.position.add(p5.Vector.mult(this.velocity, delta / 1000))
	this.acceleration.mult(0)
}

Skydiver.prototype.verbose = function() {

	return (
		`Position ${this.position.x.toFixed(0)} ${this.position.y.toFixed(0)}\n` +
		`Velocity ${this.velocity.x.toFixed(0)} ${this.velocity.y.toFixed(0)}\n`
	)
}

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

var GRAVITY
var INITIAL_HEIGHT = 1000
var SIMULATION = 0
var EULER = 1
var MODE = EULER
var VERBOSE = true
var skydiver_01
var skydiver_02

function setup() {

	createCanvas(400, 1000)
	skydiver_01 = new Skydiver(createVector(width * 1 / 4, 0), createVector(0, 0), createVector(0, 0))
	skydiver_02 = new Skydiver(createVector(width * 3 / 4, 0), createVector(0, 0), createVector(0, 0))
	GRAVITY = createVector(0, -9.81)
}

function draw() {

	if (engine.pause) {
		return
	}

	frames.current = millis()
	frames.delta = frames.current - frames.previous
	frames.previous = frames.current
	engine.time = (frames.current - engine.initial_time) / 1000

	background('#626770')

	// update object
	skydiver_01.draw()
	skydiver_02.draw()

	// calculate forces
	skydiver_01 = apply_force(skydiver_01, GRAVITY)
	skydiver_02 = apply_force(skydiver_02, GRAVITY)

	skydiver_01 = euler(skydiver_01, engine.time)
	skydiver_02 = simulate(skydiver_02, frames.delta)


	// verbose
	if (!VERBOSE) {
		return
	}

	textSize(10)
	s = skydiver_01.verbose() + `Total time ${(engine.time).toFixed(2)} s`
	text(s, 1, 10)
	s = skydiver_02.verbose() + `Total time ${(engine.time).toFixed(2)} s`
	text(s, width / 2, 10)
}

function euler(object, time) {

	object.velocity.y = Math.abs(0 + object.acceleration.y * time)
	x = INITIAL_HEIGHT + 0.5 * object.acceleration.y * Math.pow(time, 2)
	object.position.y = INITIAL_HEIGHT - x
	object.acceleration.mult(0)
	return object
}

function simulate(object, delta) {

	object.acceleration.y *= -1
	object.move(delta)
	return object
}

function apply_force(object, force) {

	object.acceleration.add(force)
	return object
}
