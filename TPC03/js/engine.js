var Engine = function() {

	GRAVITY = createVector(0, -9.81);
	AIR = {
		coefficient: 1,
		density: 1.29
	};
	WATER = {
		coefficient: 1,
		density: 1000
	};

	this.initial_time = 0;
	this.time = 0;
	this.pause = false;
};

/**
 * Calculate object's motion based on Euler calculation
 * Similar to skydiver's move
 */
Engine.prototype.euler = function(object, time) {

	object.velocity.y = 0 + object.acceleration.y * time;
	object.position.y = INITIAL_ALTITUDE + 0.5 * object.acceleration.y * Math.pow(time, 2);

	if (object.position.y - object.height * 10 / 2 <= 0) {
		object.position.y = object.height * 10 / 2;
		object.velocity.y = 0;
	} else {
		object.flight_time = (millis() - object.flight_time) / 1000;
	}

	object.acceleration.mult(0);
	return object;
};

/**
 * Simulate object's motion in the environment
 */
Engine.prototype.simulate = function(object, delta) {

	object.move(delta);
	return object;
};

/**
 * Apply an external force to the object
 */
Engine.prototype.apply_force = function(object, force) {

	var f = p5.Vector.div(force, object.mass);
	object.acceleration.add(f);
	return object;
};

/**
 * Get friction vector
 */
Engine.prototype.get_friction = function(velocity, coefficient, density, area) {

	return p5.Vector.mult(velocity.copy(), velocity.copy().mag() * coefficient * -0.5 * density * area);
}
