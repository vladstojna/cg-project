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

		this.sphere     = new THREE.Mesh(geometry, material);
		this.axisHelper = new THREE.AxesHelper(BALL_AXIS_SZ);

		this.add(this.sphere);
		this.add(this.axisHelper);
		// Update ball direction
		this.rotation.z = this.rot;
		// Set initial position
		this.position.set(this.ix, this.iy, -this.rad);
	}

	/* updatePos: updates ball position */
	updatePos(time) {
		this.temppos = new THREE.Vector3(this.position.x, this.position.y, this.position.z);

		var delta = this.vel * time;

		var velx = Math.cos(this.rot) * delta;
		var vely = Math.sin(this.rot) * delta;

		this.temppos.x += velx;
		this.temppos.y += vely;
		//console.log(delta, velx, vely);
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
		if (this.temppos.y >= this.field.height/2 - (this.rad + pad)) {
			this.position.y = this.field.height/2 - this.rad;
			this.position.x = this.temppos.x;
			return true;
		}
		if (this.temppos.y <= -this.field.height/2 + (this.rad + pad)) {
			this.position.y = -this.field.height/2 + this.rad;
			this.position.x = this.temppos.x;
			return true;
		}
	}

	/* atLimitw: tests if ball reached width limit
	 * pad - additional bounding sphere size
	 */
	atLimitW(pad=0) {
		if (this.temppos.x >= this.field.width/2 - (this.rad + pad)) {
			this.position.x = this.field.width/2 - this.rad;
			this.position.y = this.temppos.y;
			return true;
		}

		if (this.temppos.x <= -this.field.width/2 + (this.rad + pad)) {
			this.position.x = -this.field.width/2 + this.rad;
			this.position.y = this.temppos.y;
			return true;
		}
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
			return true;
		}
		return false;
	}

	collisionCheckWidth(pad=0) {
		if (this.atLimitW(pad)) {
			this.rot = Math.PI - this.rot;
			this.rotation.z = this.rot;
			this.sphere.rotation.z = -this.rot;
			return true;
		}
		return false;
	}

	collisionCheckOtherBalls(pad=0, transd=0) {
		var col = false;
		this.field.balls.forEach(ball => {
			if (ball.position != this.position) {
				if (ball.position.distanceTo(this.temppos) <= 2 * (this.rad + pad)) {
					//console.log("ball collision");
					
					// m1 == m2
					// v1f = (v1i * (m1 - m2) + 2 * v2i * m2)/(m1 + m2) <=> v1f = v2i
					// v2f = (v2i * (m2 - m1) + 2 * v1i * m2)/(m1 + m2) <=> v2f = v1i

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

					ball.sphere.rotation.z = -ball.rot;
					this.sphere.rotation.z = -this.rot;

					col = true;

					/* After collision treatment, translate same amount in opposite direction */
					this.translateX(transd);
					//ball.translateX(transd);

					return;
				}
			}
		});
		return col;
	}

	/* collisionChek: tests existence of collision and updates direction
	 * pad - additional bounding sphere size
	 * transd - translation distance to prevent ball from getting OOB
	 */
	collisionCheck(pad=0, transd=0) {
		//if (this.outOfBounds(pad))
		//	console.log("out of bounds");

		if (!this.collisionCheckHeight(pad) && 
			!this.collisionCheckWidth(pad) &&
			!this.collisionCheckOtherBalls(pad, transd))

			this.translateX(transd);
	}

	/* incVelocity: increase ball velocity */
	incVelocity(inc) {
		this.vel += inc;
	}

	/* toggleAxisHelper */
	toggleAxisHelper(state) {
		this.axisHelper.visible = state;
	}
}
