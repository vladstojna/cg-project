class DirecLight extends THREE.DirectionalLight {
	constructor(x=0, y=1, z=0, visibility=true, color=0xffffff, intensity=1) {

		super(color, intensity);

		this.position.set(x, y, z);

		this.turn(visibility);
	}

	turn(visibility) {
		this.visible = visibility;
	}
}