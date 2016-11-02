var Skydiver = function(position, velocity, acceleration) {

	this.position = position
	this.velocity = velocity
	this.acceleration = acceleration
	this.diameter = 10
}

Skydiver.prototype.draw = function() {

	ellipse(this.position.x, this.position.y, this.diameter, this.diameter)
}

Skydiver.prototype.move = function(delta_time) {

	this.velocity.add(p5.Vector.mult(this.acceleration, delta_time / 1000))
	this.position.add(p5.Vector.mult(this.velocity, delta_time / 1000))
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
	total_time: 0,
	pause: false
}

var skydiver
var GRAVITY
var SIMULATION = 0
var EULER = 1
var MODE = SIMULATION
var VERBOSE = true

function setup() {

	createCanvas(400, 1000)
	skydiver = new Skydiver(createVector(width / 2, 0), createVector(0, 0), createVector(0, 0))
	GRAVITY = createVector(0, 9.81)
}

function draw() {

	frames.current = millis()
	frames.delta = frames.current - frames.previous
	frames.previous = frames.current
	engine.total_time = frames.current - engine.initial_time

	background('#626770')

	if (MODE === EULER) {
		euler()
	} else {
		simulate()
	}

	// update object
	skydiver.draw()

	// verbose
	if (!VERBOSE) {
		return
	}

	s = skydiver.verbose() + `Total time ${(engine.total_time / 1000).toFixed(2)} s`
	textSize(10)
	text(s, 5, 10)
}

function euler() {

}

function simulate() {

	// calculate forces
	skydiver = apply_force(skydiver, GRAVITY)
	skydiver.move(frames.delta)
}

function apply_force(object, force) {

	object.acceleration.add(force)
	return object
}
