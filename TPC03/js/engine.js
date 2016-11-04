var Engine = function() {

	GRAVITY = createVector(0, -9.81);
	FRICTION = {
		coefficient: 1,
		density: 1.29
	};

	this.initial_time = 0;
	this.time = 0;
	this.pause = false;
}

Engine.prototype.euler = function(object, time) {

	object.velocity.y = 0 + object.acceleration.y * time;
	object.position.y = INITIAL_HEIGHT + 0.5 * object.acceleration.y * Math.pow(time, 2);

	if (object.position.y - object.diameter / 2 <= 0) {
		object.position.y = object.diameter / 2;
		object.velocity.y = 0;
	}

	object.acceleration.mult(0);
	return object;
}

Engine.prototype.simulate = function(object, delta) {

	object.move(delta);
	return object;
}

Engine.prototype.apply_force = function(object, force) {

	force.x /= object.mass;
	force.y /= object.mass;
	object.acceleration.add(force);
	return object;
}
