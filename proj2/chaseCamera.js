class chaseCamera extends THREE.PerspectiveCamera {

	constructor(fovy, aspect, near, far, field) {
		super(fovy, aspect, near, far);

		this.ball = null;
		this.field = field;
	}

	updateVPN(offsetX=0, offsetY=0, offsetZ=0) {
		this.updatePos(offsetX, offsetY, offsetZ);
		this.updateLookAt(offsetX, offsetY, offsetZ);
	}

	updatePos(offsetX=0, offsetY=0, offsetZ=0) {
		// If camera is not following any ball
		if (this.ball === null) {
			this.ball = field.randomBall();
		}
		
		// Update camera position
		// Ball coordinates (x, y, z) in WCS are given as (x, -z, y)
		// (wallHeight, 3/2 * wallHeight, wallHeight) is used as positional leeway
		this.position.set(this.ball.position.x + this.field.wallHeight() * offsetX, 
		    -this.ball.position.z + 3/2 * this.field.wallHeight() * offsetY,
			this.ball.position.y + this.field.wallHeight() * offsetZ);
	}

	updateLookAt(offsetX=0, offsetY=0, offsetZ=0) {
		// camera.position.set(eyex, eyey, eyez)
		// camera.lookAt(atx, aty, atz)
		// VPN = [atx - eyex, aty - eyey, atz - eyez]

		// Camera view plane normal should usually be parallel to (-1, -1, 0)
		var vec = new THREE.Vector3(this.position.x + (-1) * offsetX, 
			this.position.y + (-1) * offsetY, 
			this.position.z + (-1) * offsetZ);

		this.lookAt(vec);
	}
}