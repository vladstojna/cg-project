/* Custom point light class */

class PointLight extends THREE.PointLight {

	/* constructor */
	constructor(color, intensity, distance, decay, x=0, y=0, z=0, initialState=true) {
		super(color, intensity, distance, decay);
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
