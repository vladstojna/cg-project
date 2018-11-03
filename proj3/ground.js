/* Ground class */

class Ground extends THREE.Object3D {
	constructor(width, height, color, x=0, y=0, z=0, widthSegments=1, heightSegments=1) {
		super();
		this.add(new THREE.Mesh(
			new THREE.PlaneGeometry(
				width, height,
				widthSegments,
				heightSegments),
			new THREE.MeshPhongMaterial({
				color:     color,
				side:      THREE.DoubleSide,
				wireframe: false})
		));
		this.position.set(x, y, z);
		this.rotation.x = Math.PI/2;
	}
}
