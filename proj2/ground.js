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

		this.createPlane(gcolor)

		this.addWall(this.height,  this.height, 0, wcolor, Math.PI/2)
		this.addWall(this.height, -this.height, 0, wcolor, Math.PI/2)

		this.addWall(this.width, 0, -this.height/2, wcolor)
		this.addWall(this.width, 0,  this.height/2, wcolor)
	}


	createPlane(color) {
		var geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);

		var material = new THREE.MeshBasicMaterial({color: color,
			side: THREE.DoubleSide, wireframe: false});

		var plane = new THREE.Mesh(geometry, material);

		this.add(plane)
		plane.add(new THREE.AxesHelper(15))
	}

	addWall(w, x, y, color, rot=0) {
		var geometry = new THREE.PlaneGeometry(w, this.diag / 10, 1, 1);

		var material = new THREE.MeshBasicMaterial({color: color,
			side: THREE.DoubleSide, wireframe: false});

		var plane = new THREE.Mesh(geometry, material);

		this.add(plane)
		plane.add(new THREE.AxesHelper(15))

		plane.position.x = x;
		plane.position.y = y;
		plane.position.z = -this.diag / 20;

		plane.rotation.x = Math.PI/2;
		plane.rotation.y = rot;
	}

	width()  { return this.width;  }
	height() { return this.height; }

	addBall(rad, x, y) {
		var geometry = new THREE.SphereGeometry(rad, 24, 24);
		var material = new THREE.MeshBasicMaterial({color: 0xffff00,
			wireframe: true});

		var ball = new THREE.Mesh(geometry, material);

		this.add(ball)
		this.balls.push(ball)

		ball.position.set(x, y, -rad)
	}

}