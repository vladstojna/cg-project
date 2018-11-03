class Spotlight extends THREE.Object3D {
	constructor(x, y, z, rad, h, segs, srad, ssegs, srot, wrot) {
		super();

		var material = new THREE.MeshPhongMaterial({color: 0x737373, wireframe: false});
		var cone = new THREE.Mesh(new THREE.ConeGeometry(rad, h, segs, 1, true), material);
		material = new THREE.MeshPhongMaterial({color: 0xfff1e0, transparent: true, opacity: 0.7, wireframe: false});
		this.sphere = new THREE.Mesh(new THREE.SphereGeometry(srad, ssegs, ssegs), material);

		this.light = new THREE.SpotLight(0xfff1e0, 0.5, 0, Math.PI*2/3, 0, 2)

		this.sphere.add(this.light);

		this.add(cone);
		this.add(this.sphere);
		this.sphere.position.y -= h/2 - srad;

		// Set self rotation based on world rotation
		this.rotateZ(srot*Math.cos(wrot));
		this.rotateX(-srot*Math.sin(wrot));

		// Set position based on world rotation
		this.position.set(x*Math.cos(wrot), y, z*Math.sin(wrot))
	}

	turn(visibility) {
		this.light.visible = visibility;
		if (visibility)
			this.sphere.material.color.setHex(0xfff1e0);
		else
			this.sphere.material.color.setHex(0x535353);
	}
}