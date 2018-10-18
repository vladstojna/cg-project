// Ground

class Playfield extends THREE.Object3D {

	constructor(height, scene, gcolor, wcolor) {
		super()

		// Which scene the ground belongs to
		this.scene  = scene;

		// Sets size properties
		this.height = height;
		this.width  = 2 * height;

		// Sets diagonal size
		this.diag = Math.sqrt(
			this.height * this.height + this.width * this.width
		)

		// Balls
		this.balls = new Array();

		// Create ground
		this.createPlane(gcolor)

		// Add walls parallel to z-axis
		/*	width = ground height
			x-position = +/- ground height = 1/2 * ground width
			rotation = 90 deg	*/
		this.addWall(this.height,  this.height, 0, wcolor, Math.PI/2)
		this.addWall(this.height, -this.height, 0, wcolor, Math.PI/2)

		// Add walls parallel to x-axis
		/*	width = ground width
			y-position = +/- 1/2 * ground height
			rotation = 0 deg	*/
		this.addWall(this.width, 0, -this.height/2, wcolor)
		this.addWall(this.width, 0,  this.height/2, wcolor)
	}


	createPlane(color) {
		var geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);

		var material = new THREE.MeshBasicMaterial({color: color,
			side: THREE.DoubleSide, wireframe: false});

		var plane = new THREE.Mesh(geometry, material);

		// Add ground to playfield
		this.add(plane)
		plane.add(new THREE.AxesHelper(15))
	}

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

	width()  { return this.width;  }
	height() { return this.height; }

	wallHeight() { return this.diag / 10; }

	addBall(dia, x, y) {
		// Get ball radius
		var rad = dia / 2

		// Create new ball
		// parent, radius, color, x pos, y pos, initial velocity, initial direction
		var ball = new Ball(this, rad, 0xFFFF00, x, y, 20, Math.random() * 2*Math.PI);

		this.add(ball)
		this.balls.push(ball)
	}

	moveBalls(time) {
		// Iterate through array of Ball objects and update their position
		this.balls.forEach(function(ball) {
			ball.updatePos(time);
		})
	}

	accelBalls(inc) {
		// Iterate through array of Ball objects and update their velocity
		this.balls.forEach(function(ball) {
			ball.incVelocity(inc);
		})
	}
}