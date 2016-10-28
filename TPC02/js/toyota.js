CANVAS_WIDTH = 440
CANVAS_HEIGHT = 300
STROKE_WEIGHT = 20
STROKE = '#ff0000'

function setup() {

	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)

	var outter_ellipse = {
		center: createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2),
		width: CANVAS_WIDTH - STROKE_WEIGHT * 2,
		height: CANVAS_HEIGHT - STROKE_WEIGHT * 2
	}
	var upper_ellipse = {
		center: createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4),
		width: (CANVAS_WIDTH - STROKE_WEIGHT) / 1.5,
		height: (CANVAS_HEIGHT - STROKE_WEIGHT) / 3
	}
	var middle_ellipse = {
		center: createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2),
		width: (CANVAS_WIDTH - STROKE_WEIGHT) / 5,
		height: (CANVAS_HEIGHT - STROKE_WEIGHT) - 75
	}
	var toyota = [outter_ellipse, middle_ellipse, upper_ellipse]

	noFill()
	stroke(STROKE)
	strokeWeight(STROKE_WEIGHT)

	for (var i = 0; i < toyota.length; i++) {
		setTimeout(drawEllipse(toyota[i]), i * 2000)
	}
}

function drawEllipse(object) {
	ellipse(
		object.center.x,
		object.center.y,
		object.width,
		object.height
	)
}
