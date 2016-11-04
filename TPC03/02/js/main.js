var INITIAL_HEIGHT
var VERBOSE

var frames = {

	previous: 0,
	current: 0,
	delta: 0
}

var engine
var skydiver

function setup() {

	INITIAL_HEIGHT = 1000
	VERBOSE = true

	createCanvas(400, INITIAL_HEIGHT)

	engine = new Engine()
	skydiver = new Skydiver(createVector(width * 1 / 2, INITIAL_HEIGHT), createVector(0, 0), createVector(0, 0))
}

function draw() {

	if (engine.pause) {
		return
	}

	frames.current = millis()
	frames.delta = frames.current - frames.previous
	frames.previous = frames.current
	engine.time = (frames.current - engine.initial_time) / 1000

	background('#2c7058')

	push()

	// translate the axis
	translate(0, INITIAL_HEIGHT)

	// update object
	skydiver.draw()

	// calculate forces
	skydiver = engine.apply_force(skydiver, GRAVITY)

	// simulate movement
	skydiver = engine.simulate(skydiver, frames.delta)

	pop()

	if (!VERBOSE) {
		return
	}

	textSize(10)
	s = skydiver.verbose() + `Total time ${(engine.time).toFixed(2)} [ s ]`
	text(s, 1, 20)
	console.log(s + '\n*************************')
}
