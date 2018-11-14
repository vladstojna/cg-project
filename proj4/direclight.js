/* Custom directional light class */

class DirectionalLight extends THREE.DirectionalLight {

	/* constructor */
	constructor(color, intensity, x=0, y=0, z=0) {
		super(color, intensity);
		this.position.set(x, y, z);
	}
}
