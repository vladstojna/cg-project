// Ball

class Ball extends THREE.Object3D {

	constructor(field, rad, color, x, y, vel, rot) {
		super();

		this.rad = rad;

		this.x = x;
		this.y = y;

		this.vel = vel;
		this.rot = rot;

		this.createBall(field, rad, color, x, y, rot);
	}

	createBall(field, rad, color, x, y, rot) {
		var geometry = new THREE.SphereGeometry(rad, 24, 24);
		
		var material = new THREE.MeshBasicMaterial({color: color,
			wireframe: true});

		var sphere = new THREE.Mesh(geometry, material);

		this.add(sphere);
		field.add(this);

		this.add(new THREE.AxesHelper(100))

		// Reset ball rotation as it's initially altered once the ball is added to the field
		this.rotation.x = Math.PI / 2;
		// Update ball direction
		this.rotation.y = rot;
		// Set initial position
		this.position.set(x, y, -rad);
	}

	updatePos(time) {
		var delta = this.vel * time;

		// Move *delta* units
		this.translateX(delta);
		// Update ball position
		this.x += delta;
	}

	incVelocity(inc) {
		// Increase ball velocity
		this.vel += inc;
	}
}