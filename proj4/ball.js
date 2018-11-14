/* Custom ball class */

class RotatingBall extends GameEntity {

	/* constructor */
	constructor(sphereRadius, widthSegments=16, heightSegments=16,
			shadedMaterial, basicMaterial,
			rotationX=0, rotationY=0, rotationZ=0,
			rotationRadius=0, rotationVelocity=0, rotationAccel=0,
			maxRotationVelocity=Math.PI,
			texture=0) {

		super();

		/* auto reset flag */
		this.autoReset = false;

		/* Save initial values for resetting purposes */
		this.startingRotation = new THREE.Vector3(0, 0, 0);
		this.startingVelocity = rotationVelocity;
		
		this.rotationRadius = rotationRadius;

		this.position.set(rotationX, rotationY, rotationZ);
		this.rotationVelocity    = rotationVelocity;
		this.rotationAccel       = rotationAccel;
		this.maxRotationVelocity = maxRotationVelocity;

		this.currentMaterial = shadedMaterial;
		this.otherMaterial   = basicMaterial;

		this.sphereMesh = new THREE.Mesh(
			new THREE.SphereGeometry(sphereRadius, widthSegments, heightSegments),
			this.currentMaterial
		);

		this.sphereMesh.position.z = rotationRadius;

		this.add(this.sphereMesh);

	}

	rotateSphereMesh(distance) {
		this.sphereMesh.rotateZ(distance / this.sphereMesh.geometry.parameters.radius);
	}

	/* rotates sphere around rotation center */
	rotate(time, direction) {
		this.rotateY(this.rotationVelocity * time);
		this.rotateSphereMesh(-this.rotationVelocity * time * this.rotationRadius);

		if (direction < 0 && this.rotationVelocity <= 0)
			this.rotationVelocity = 0;
		else if (this.rotationVelocity + direction * this.rotationAccel < this.maxRotationVelocity)
			this.rotationVelocity += direction * this.rotationAccel;
	}

	/* resets ball to initial state */
	resetState(flag) {
		if (this.autoReset != flag)
			this.rotation.set(
				this.startingRotation.x,
				this.startingRotation.y,
				this.startingRotation.z);
			this.sphereMesh.rotation.set(
				this.startingRotation.x,
				this.startingRotation.y,
				this.startingRotation.z);
			this.rotationVelocity = this.startingVelocity;
			this.autoReset = flag;
	}
}
