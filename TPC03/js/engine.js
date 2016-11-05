var Engine = function() {

	GRAVITY = createVector(0, -9.81);
	FRICTION = {
		coefficient: 1,
		density: 1.29
	};

	this.initial_time = 0;
	this.time = 0;
	this.pause = false;
};

Engine.prototype.euler = function(object, time) {

	object.velocity.y = 0 + object.acceleration.y * time;
	object.position.y = INITIAL_HEIGHT + 0.5 * object.acceleration.y * Math.pow(time, 2);

	if (object.position.y - object.height * 10 / 2 <= 0) {
		object.position.y = object.height * 10 / 2;
		object.velocity.y = 0;
	}

	object.acceleration.mult(0);
	return object;
};

Engine.prototype.simulate = function(object, delta) {

	object.move(delta);
	return object;
};

Engine.prototype.apply_force = function(object, force) {

	var f = p5.Vector.div(force, object.mass);
	object.acceleration.add(f);
	return object;
};
