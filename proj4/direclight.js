/* Custom directional light class */

class DirectionalLight extends THREE.DirectionalLight {

	/* constructor */
	constructor(color, intensity, x=0, y=0, z=0, initialState=true) {
		super(color, intensity);
		this.position.set(x, y, z);
		this.initialState = initialState;
		this.visible      = initialState;
	}

	switchLight(flag) {
		this.visible = flag;
	}

	resetState() {
		this.visible = this.initialState;
	}

}
