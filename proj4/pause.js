/* Pause message class */

class PauseMessage extends THREE.Object3D {

	/* constructor */
	constructor(width, height, widthSegments=1, heightSegments=1, material, texture) {

		super();

		var tex;

		this.position.y = 500;

		this.pausePlane = new THREE.Mesh(
			new THREE.PlaneGeometry(
				width,
				height,
				widthSegments,
				heightSegments),
			material)

		this.add(this.pausePlane);

		tex = new THREE.TextureLoader().load(texture);
		tex.anisotropy = 8;
		tex.format = THREE.RGBFormat;
		this.pausePlane.material.map = tex;
	}
}
