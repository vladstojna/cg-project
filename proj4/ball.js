/* Custom ball class */

class RotatingBall extends THREE.Object3D {

	/* constructor */
	constructor(sphereRadius, widthSegments=16, heightSegments=16,
			shadedMaterial, basicMaterial,
			rotationX=0, rotationY=0, rotationZ=0,
			rotationRadius=0, rotationVelocity=0, rotationAccel=0,
			maxRotationVelocity=Math.PI,
			texture=0) {

		super();

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

	/* rotates sphere around rotation center */
	rotate(time) {
		this.rotateY(this.rotationVelocity * time);
		this.sphereMesh.rotateZ(-this.rotationVelocity * time)
		if (this.rotationVelocity < this.maxRotationVelocity)
			this.rotationVelocity += this.rotationAccel;
	}

	toggleShading(flag) {}
	toggleWireframe(flag) {}
}
