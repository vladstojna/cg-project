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

		console.log("Ball velocity:", this.vel);
	}

	/* createBall: creates a ball
	 * rad - ball radius
	 * color - ball color
	 * x - initial x positon
	 * y - initial y position
	 * rot - initial direction of movement
	 */
	createBall() {
		var geometry = new THREE.SphereGeometry(this.rad, 16, 16);
		
		var material = new THREE.MeshBasicMaterial({
			color: this.color,
			wireframe: true
			});

		this.sphere = new THREE.Mesh(geometry, material);

		this.add(this.sphere);
		this.add(new THREE.AxesHelper(50))
		//this.field.add(this);
		// Update ball direction
		this.rotation.z = this.rot;
		// Set initial position
		this.position.set(this.ix, this.iy, -this.rad);
	}

	/* updatePos: updates ball position */
	updatePos(time) {
		var delta = this.vel * time;
		this.translateX(delta);
		this.rotateBall(delta);
		this.collisionCheck(0, delta);
	}

	/* rotateBall: rotates sphere according to movement */
	rotateBall(d) {
		this.sphere.rotation.y -= d / this.rad;
	}

	/* atLimitH: tests if ball reached height limit
	 * pad - additional bounding sphere size
	 */
	atLimitH(pad=0) {
		return this.position.y >= this.field.height/2 - (this.rad + pad) ||
			this.position.y <= -this.field.height/2 + (this.rad + pad);
	}

	/* atLimitw: tests if ball reached width limit
	 * pad - additional bounding sphere size
	 */
	atLimitW(pad=0) {
		return this.position.x >= this.field.width/2 - (this.rad + pad) ||
			this.position.x <= -this.field.width/2 + (this.rad + pad);
	}

	/* outOfBounds: tests if ball reached any limit
	 * pad - additional bounding sphere size
	 */
	outOfBounds(pad=0) {
		return this.position.x >= this.field.width/2 - (this.rad + pad) ||
			this.position.x <= -this.field.width/2 + (this.rad + pad) ||
			this.position.y >= this.field.height/2 - (this.rad + pad) ||
			this.position.y <= -this.field.height/2 + (this.rad + pad);
	}

	collisionCheckHeight(pad=0) {
		if (this.atLimitH(pad)) {
			this.rot = -this.rot;
			this.rotation.z = this.rot;
			this.sphere.rotation.z = -this.rot;
		}
	}

	collisionCheckWidth(pad=0) {
		if (this.atLimitW(pad)) {
			this.rot = Math.PI - this.rot;
			this.rotation.z = this.rot;
			this.sphere.rotation.z = -this.rot;
		}
	}

	collisionCheckOtherBalls(pad=0, transd=0) {
		this.field.balls.forEach(ball => {
			if (ball.position != this.position) {
				if (ball.position.distanceTo(this.position) <= 2 * (this.rad + pad)) {
					console.log("ball collision");

					let temprot = ball.rot;
					let tempvel = ball.vel;

					/* Swap ball current angles */
					ball.rot = this.rot;
					this.rot = temprot;

					/* Swap ball velocities */
					ball.vel = this.vel;
					this.vel = tempvel;

					/* Rotate balls */
					ball.rotation.z = ball.rot;
					this.rotation.z = this.rot;

					/* After collision treatment, translate same amount in opposite direction */
					this.translateX(transd);
					ball.translateX(transd);

					return;
				}
			}
		});
	}

	/* collisionChek: tests existence of collision and updates direction
	 * pad - additional bounding sphere size
	 * transd - translation distance to prevent ball from getting OOB
	 */
	collisionCheck(pad=0, transd=0) {
		this.collisionCheckHeight(pad);
		this.collisionCheckWidth(pad);
		/* After collision treatment, translate same amount in opposite direction */
		this.translateX(transd);
		this.collisionCheckOtherBalls(pad, transd);
	}

	/* incVelocity: increase ball velocity */
	incVelocity(inc) {
		this.vel += inc;
	}
}
