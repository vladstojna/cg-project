// Ground

class Playfield extends THREE.Object3D {

	/* Constructor:
	 * height - field height
	 * gcolor - field ground color
	 * wcolor - field wall color
	 */
	constructor(height, gcolor, wcolor) {
		super()

		this.height = height;
		this.width  = 2 * height;

		// Sets diagonal size
		this.diag = Math.sqrt(
			this.height * this.height + this.width * this.width
		)

		// Array with balls
		this.balls = new Array();

		this.createPlane(gcolor)

		// Add walls parallel to z-axis
		/* width = ground height
		 * x-position = +/- ground height = 1/2 * ground width
		 * rotation = 90 deg */
		this.addWall(this.height,  this.height, 0, wcolor, Math.PI/2)
		this.addWall(this.height, -this.height, 0, wcolor, Math.PI/2)

		// Add walls parallel to x-axis
		/* width = ground width
		 * y-position = +/- 1/2 * ground height
		 * rotation = 0 deg */
		this.addWall(this.width, 0, -this.height/2, wcolor)
		this.addWall(this.width, 0,  this.height/2, wcolor)
	}

	/* createPlane: creates field ground
	 * color - ground color
	 */
	createPlane(color) {
		var geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);

		var material = new THREE.MeshBasicMaterial({color: color,
			side: THREE.DoubleSide, wireframe: false});

		var plane = new THREE.Mesh(geometry, material);

		// Add ground to playfield
		this.add(plane)
		plane.add(new THREE.AxesHelper(15))
	}

	/* createPlane: creates field ground
	 * w - wall width
	 * x - wall x position
	 * y - wall y position
	 * color - wall color
	 * rot - to decide if x-wall or z-wall
	 */
	addWall(w, x, y, color, rot=0) {
		// Wall height must be 1/10th of ground's diagonal
		var geometry = new THREE.PlaneGeometry(w, this.diag / 10, 1, 1);

		var material = new THREE.MeshBasicMaterial({color: color,
			side: THREE.DoubleSide, wireframe: false});

		var plane = new THREE.Mesh(geometry, material);

		// Add wall to playfield
		this.add(plane)
		plane.add(new THREE.AxesHelper(15))

		// Set wall position
		plane.position.x = x;
		plane.position.y = y;
		plane.position.z = -this.diag / 20;

		// Raise the walls up
		plane.rotation.x = Math.PI/2;
		// Turn them if necessary
		plane.rotation.y = rot;
	}

	/* Getters */
	width()      { return this.width;     }
	height()     { return this.height;    }
	wallHeight() { return this.diag / 10; }


	/* addBall: adds ball with radius and color */
	addBall(rad, color) {
		/*
		Ball possible coordinates:
		- Number of distinct x values: field width - 2 * ball radius + 1 (zero)
		- Starting x value: - (field width / 2 - ball radius)
		- Number of distinct y values:  field height - 2 * ball radius + 1 (zero)
		- Starting y value: - (field height / 2 - ball radius)
		*/
		var distX  = field.width - 2 * rad + 1;
		var distY  = field.height - 2 * rad + 1;
		var startX = - (field.width / 2 - rad);
		var startY = - (field.height / 2 - rad);

		// Create new ball
		// parent, radius, color, x pos, y pos, initial velocity, initial direction
		var ball = new Ball(this,
			rad,
			color,
			Math.random() * distX + startX,
			Math.random() * distY + startY,
			20,
			Math.random() * 2*Math.PI);

		this.add(ball);
		this.balls.push(ball);
	}

	/* moveBalls: updates ball positions */
	moveBalls(time) {
		// Iterate through array of Ball objects and update their position
		this.balls.forEach(function(ball) {
			ball.updatePos(time);
		});
	}

	/* accelBalls: updates ball velocities */
	accelBalls(inc) {
		// Iterate through array of Ball objects and update their velocity
		this.balls.forEach(function(ball) {
			ball.incVelocity(inc);
		});
	}
}
