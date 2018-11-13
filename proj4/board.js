/* Custom board class */

class Board extends THREE.Object3D {

	/* constructor */
	constructor(width, height, widthSegments=1, heightSegments=1,
			x=0, y=0, z=0,
			shadedMaterial, basicMaterial,
			texture=0) {

		super();

		this.position.set(x, y, z);
		this.rotation.x = -Math.PI/2;

		this.currentMaterial = shadedMaterial;
		this.otherMaterial   = basicMaterial;

		this.add(new THREE.Mesh(
			new THREE.PlaneGeometry(
				width,
				height,
				widthSegments,
				heightSegments),
			this.currentMaterial)
		);
	}

	toggleShading(flag) {}
	toggleWireframe(flag) {}
}
