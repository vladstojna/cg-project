/* Pause message class */

class PauseMessage extends THREE.Object3D {

	/* constructor */
	constructor(width, height, widthSegments=1, heightSegments=1, material, texture=0) {

		super();

		var tex;

		this.add(new THREE.Mesh(
			new THREE.PlaneGeometry(
				width,
				height,
				widthSegments,
				heightSegments),
			material)
		);

		tex = new THREE.TextureLoader().load(texture);
		tex.anisotropy = ANISO_SAMPLES;

		material.map = tex;
	}
}
