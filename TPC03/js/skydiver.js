var Skydiver = function(position, velocity, acceleration) {

	this.initial_altitude = position.y;
	this.position = position;
	this.velocity = velocity;
	this.acceleration = acceleration;
	this.width = 2;
	this.height = 2;
	this.mass = 10;
	this.flight_time = millis();
};

Skydiver.prototype.draw = function(canvas_height) {

	var y = map(this.position.y, 0, this.initial_altitude, 0, canvas_height);
	ellipse(this.position.x, y * -1, this.width * 10, this.height * 10);

	if (this.position.y - this.height * 10 / 2 > 0) {
		this.flight_time = (millis() - this.flight_time) / 1000;
	}
};

/**
 * Calculates the new position based on the current acceleration and velocity
 * based on Newton's laws
 * Input:
 * 	delta << Time difference between frames
 */
Skydiver.prototype.move = function(delta) {

	this.velocity.add(p5.Vector.mult(this.acceleration, delta / 1000));
	this.position.add(p5.Vector.mult(this.velocity, delta / 1000));
	this.acceleration.mult(0);

	if (this.position.y - this.height * 10 / 2 <= 0) {
		this.position.y = this.height * 10 / 2;
		this.velocity.y = 0;
	}
};

/**
 * Output skydiver's info
 */
Skydiver.prototype.verbose = function() {

	var direction = this.velocity.copy().normalize();
	var horizontal = direction.x != 0 ? direction.x == 1 ? '↠' : '↞' : '#';
	var vertical = direction.y != 0 ? direction.y == 1 ? '↟' : '↡' : '#';

	return (
		`Position ${this.position.x.toFixed(0)}, ${this.position.y.toFixed(0)} [ m ]\n` +
		`Velocity ${Math.abs(this.velocity.x.toFixed(0))}, ${Math.abs(this.velocity.y.toFixed(0) * -1)} [ m/s ]\n` +
		`Direction ${horizontal}, ${vertical}\n` +
		`Flight time ${this.flight_time.toFixed(2)} [ s ]\n` +
		`Mass ${this.mass} [ kg ]\n`
	);
};
