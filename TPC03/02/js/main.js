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

var skydiver

function setup() {

	createCanvas(400, 100)
	GRAVITY = createVector(0, -9.81)
	skydiver_01 = new Skydiver(createVector(width * 1 / 4, 0), createVector(0, 0), createVector(0, 0))

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
	skydiver.draw()

}
