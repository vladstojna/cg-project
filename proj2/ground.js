// Ground

class Playfield extends THREE.Object3D {

	/* Constructor:
	 * height - field height
	 * gcolor - field ground color
	 * wcolor - field wall color
	 * aspect - field aspect ratio
	 */
	constructor(height, gcolor, wcolor, aspect) {
		super()

		this.height = height;
		this.width  = aspect * height;

		// Sets diagonal size
		this.diag = Math.sqrt(
			this.height * this.height + this.width * this.width
		)

		/* Array will ball objects */
		this.balls = new Array();

		/* Array with position already populated */
		this.takenPositions = new Array();

		this.createPlane(gcolor)

		// Add walls parallel to z-axis
		/* width = ground height
		 * x-position = +/- ground height = 1/2 * ground width
		 * rotation = 90 deg */
		this.addWall(this.height,  this.width/2, 0, wcolor, Math.PI/2)
		this.addWall(this.height, -this.width/2, 0, wcolor, Math.PI/2)

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

	randomBall() {
		var length = this.balls.length;
		return this.balls[Math.round(Math.random()*(length - 1))];
	}

	/* isFreePosition: checks if position is free
	 * p - recently generated position
	 * r - ball radius, to calculate distance
	 */
	isFreePosition(p, r) {
		var free = true;
		this.takenPositions.forEach(t => {
			if (t.distanceTo(p) <= 2 * r) {
				free = false;
				return;
			}
		});
		return free;
	}

	/* getFreePosition: guarantees generation
	 *    of a position not yet taken by another entity
	 */
	getFreePosition(rad) {
		/* Ball possible coordinates:
		 * xMin: minimum value for x + 1 padding
		 * xMax: maximum value for x + 1 padding
		 * yMin: minimum value for y + 1 padding
		 * yMax: maximum value for y + 1 padding
		 */
		var xMin = -field.width  / 2 + (rad + 1);
		var xMax =  field.width  / 2 - (rad + 1);
		var yMin = -field.height / 2 + (rad + 1);
		var yMax =  field.height / 2 - (rad + 1);

		var x = Math.floor(Math.random() * (xMax - xMin + 1) + xMin);
		var y = Math.floor(Math.random() * (yMax - yMin + 1) + yMin);
		var vector = new THREE.Vector3(x, y, 0);

		while (!this.isFreePosition(vector, rad)) {
			console.log("not free");
			x = Math.floor(Math.random() * (xMax - xMin + 1) + xMin);
			y = Math.floor(Math.random() * (yMax - yMin + 1) + yMin);
			vector.set(x, y, 0);
		}

		this.takenPositions.push(vector);

		return vector;
	}

	/* addBall: adds ball with radius and color */
	addBall(rad, color) {
		var position = this.getFreePosition(rad);
		var ball = new Ball(this,
			rad,
			color,
			position.x,
			position.y,
			Math.floor(Math.random() * (120 - 20 + 1) + 100),
			Math.random() * 2*Math.PI);

		this.add(ball);
		this.balls.push(ball);
	}

	/* moveBalls: updates ball positions */
	moveBalls(time) {
		this.balls.forEach(function(ball) {
			ball.updatePos(time);
		});
	}

	/* accelBalls: updates ball velocities */
	accelBalls(inc) {
		this.balls.forEach(function(ball) {
			ball.incVelocity(inc);
		});
	}

	/* toggleAxes: toggles ball axisHelper */
	toggleAxes(state) {
		this.balls.forEach(function(ball) {
			ball.toggleAxisHelper(state);
		});
	}
}
