var INITIAL_HEIGHT
var VERBOSE

var frames = {

	previous: 0,
	current: 0,
	delta: 0
}

var engine
var skydiver_01
var skydiver_02

function setup() {

	INITIAL_HEIGHT = 1000
	VERBOSE = true

	createCanvas(400, INITIAL_HEIGHT)

	engine = new Engine()
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
	skydiver_01 = engine.apply_force(skydiver_01, GRAVITY)
	skydiver_02 = engine.apply_force(skydiver_02, GRAVITY)

	// simulate movement
	skydiver_01 = engine.euler(skydiver_01, engine.time)
	skydiver_02 = engine.simulate(skydiver_02, frames.delta)

	if ((skydiver_01.position.y - skydiver_01.diameter / 2) === 0 && 0 === (skydiver_02.position.y - skydiver_02.diameter / 2)) {
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
	s = skydiver_01.verbose() + `Total time ${(engine.time).toFixed(2)} [ s ]`
	text(s, 1, 20)
	console.log(s)
	s = skydiver_02.verbose() + `Total time ${(engine.time).toFixed(2)} [ s ]`
	text(s, width / 2, 20)
	console.log(s + '\n*************************')
}
