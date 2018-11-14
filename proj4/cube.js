/* Custom cube class */

class Cube extends GameEntity {

	/* constructor */
	constructor(width, height, depth,
			widthSegments, heightSegments, depthSegments,
			x=0, y=0, z=0,
			shadedMaterial, basicMaterial,
			texture=0) {

		super();

		this.position.set(x, y, z);

		this.currentMaterial = shadedMaterial;
		this.otherMaterial   = basicMaterial;

		this.add(new THREE.Mesh(
			new THREE.BoxGeometry(
				width,
				height,
				depth,
				widthSegments,
				heightSegments,
				depthSegments),
			this.currentMaterial)
		);

	}
}
