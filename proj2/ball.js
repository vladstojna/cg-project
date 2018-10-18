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

		this.rotation.z = rot;
		this.position.set(x, y, -rad);
	}
}