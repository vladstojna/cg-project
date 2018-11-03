class Spotlight extends THREE.Object3D {
	constructor(x, y, z,
			coneRadius, coneHeight, coneSegments,
			bulbRadius, bulbSegments,
			localRotation, worldRotation) {
		super();

		// Create and add spotlight cone mesh
		var cone = new THREE.Mesh(
			new THREE.ConeGeometry(coneRadius, coneHeight, coneSegments, 1, true),
			new THREE.MeshPhongMaterial({
				color: SPOTLIGHT_CONE_COLOR,
				wireframe: false}));
		this.add(cone);

		// Create and add spotlight lightbulb
		this.sphere = new THREE.Mesh(
			new THREE.SphereGeometry(bulbRadius, bulbSegments, bulbSegments),
			new THREE.MeshPhongMaterial({
				color: SPOTLIGHT_BULB_COLOR_E,
				transparent: true,
				opacity: SPOTLIGHT_BULB_OPAC,
				wireframe: false}));
		this.add(this.sphere);
		// Position lightbulb
		this.sphere.position.y -= coneHeight/2 - bulbRadius;

		// Create and add spotlight light
		this.light = new THREE.SpotLight(
			SPOTLIGHT_BULB_COLOR_E,
			SPOTLIGHT_LIGHT_INT,
			SPOTLIGHT_LIGHT_DIST,
			SPOTLIGHT_LIGHT_ANGLE,
			SPOTLIGHT_LIGHT_PENBR,
			SPOTLIGHT_LIGHT_DECAY);
		this.sphere.add(this.light);

		// Set self rotation based on world rotation
		this.rotateZ(-localRotation*Math.cos(worldRotation));
		this.rotateX(localRotation*Math.sin(worldRotation));
		// Set position based on world rotation
		this.position.set(x*Math.cos(worldRotation), y, z*Math.sin(worldRotation))

		// Light visibility flags: always starts visible
		this.lit = SPOTLIGHT_START_STATE;
	}

	/* switchLight: toggles spotlight light */
	switchLight() {
		this.light.visible = this.lit;
		if (this.lit)
			this.sphere.material.color.setHex(SPOTLIGHT_BULB_COLOR_E);
		else
			this.sphere.material.color.setHex(SPOTLIGHT_BULB_COLOR_D);
	}
}
