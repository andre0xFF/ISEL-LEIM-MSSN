function setup() {

	createCanvas(220, 220)
}

function draw() {

	background('#29d968')

	strokeWeight(5)

	// face
	push()
	beginShape()
	fill('#a544da')
	vertex(30, 80)
	vertex(120, 12)
	vertex(120, 115)
	vertex(200, 170)
	vertex(50, 200)
	endShape(CLOSE)
	pop()

	// eye
	ellipse(45, 70, 15 * 2)
	ellipse(110, 70, 15 * 2)

	//inner eye
	x_left = map(mouseX, 0, width, 45 - 10, 45 + 10)
	x_left = constrain(x_left, 45 - 10, 45 + 10)

	y = map(mouseY, 0, height, 70 - 10, 70 + 1)
	y = constrain(y, 70 - 10, 70 + 10)

	ellipse(x_left, y, 5 * 2)
	ellipse(x_left + (100 - 45 + 10), y, 5 * 2)

	// mouth
	var mouth_size = mouseY > 135 && mouseY < 180 ? mouseY : mouseY > 180 ? 180 : 135
	beginShape()
	vertex(55, 135)
	vertex(55, mouth_size)
	vertex(115, mouth_size)
	vertex(115, 135)
	endShape(CLOSE)
}
