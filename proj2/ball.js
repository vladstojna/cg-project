// Ball

class Ball extends THREE.Object3D {

	/* Constructor:
	 * field - playfield where the ball resides
	 * rad   - ball radius
	 * color - ball color
	 * x   - initial x position
	 * y   - initial y position
	 * vel - initial velocity
	 * rot - initial direction of movement
	 */
	constructor(field, rad, color, x, y, vel, rot) {
		super();

		this.field = field;
		this.rad   = rad;
		this.color = color;

		this.ix = x;
		this.iy = y;

		this.vel = vel;
		this.rot = rot;

		this.createBall();
	}

	/* createBall: creates a ball
	 * rad - ball radius
	 * color - ball color
	 * x - initial x positon
	 * y - initial y position
	 * rot - initial direction of movement
	 */
	createBall() {
		var geometry = new THREE.SphereGeometry(this.rad, 24, 24);
		
		var material = new THREE.MeshBasicMaterial({
			color: this.color,
			wireframe: true
			});

		var sphere = new THREE.Mesh(geometry, material);

		this.add(sphere);
		this.add(new THREE.AxesHelper(50))
		this.field.add(this);
		
		// Update ball direction
		this.rotation.z = this.rot;
		// Set initial position
		this.position.set(this.ix, this.iy, -this.rad);
	}

	/* updatePos: updates ball position */
	updatePos(time) {
		this.translateX(this.vel * time);
		this.collisionCheck();
	}

	collisionCheck() {
		if (this.position.y >=  this.field.height/2 ||
			this.position.y <= -this.field.height/2)
		{
			this.rotation.z = -this.rot;
			this.rot = -this.rot;
		}
		else if (this.position.x >=  this.field.width/2 ||
			     this.position.x <= -this.field.width/2)
		{
			this.rotation.z = Math.PI - this.rot;
			this.rot = Math.PI - this.rot;
		}
	}

	/* incVelocity: increase ball velocity */
	incVelocity(inc) {
		this.vel += inc;
	}
}
