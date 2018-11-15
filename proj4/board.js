/* Custom board class */

class Board extends GameEntity {

	/* constructor */
	constructor(width, height, widthSegments=1, heightSegments=1,
			x=0, y=0, z=0,
			shadedMaterial, basicMaterial,
			texture) {

		super(shadedMaterial, basicMaterial);

		var tex;

		this.position.set(x, y, z);
		this.rotation.x = -Math.PI/2;

		this.add(new THREE.Mesh(
			new THREE.PlaneGeometry(
				width,
				height,
				widthSegments,
				heightSegments),
			this.currentMaterial)
		);

		tex = new THREE.TextureLoader().load(texture);
		tex.wrapS = THREE.RepeatWrapping;
		tex.wrapT = THREE.RepeatWrapping;
		tex.repeat.set(4, 4);
		tex.anisotropy = 8;

		this.currentMaterial.map = tex;
		this.otherMaterial.map   = tex;
	}
}
