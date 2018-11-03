/* Airplane class */

class Airplane extends THREE.Object3D {
	constructor(width, height, length,
		wingSpan=length, stabilizerSize=height/2,
		cockpitLength=length/4, afterburnerLength=length/16,
		widthSegments=1, heightSegments=1, depthSegments=1) {

		super();

		// Material array: Basic, Lambert, Phong
		this.indexBasicMaterial   = 0;
		this.indexLambertMaterial = 1;
		this.indexPhongMaterial   = 2;
		// Initial material has phong shading
		// Initial shaded material has phong shading
		this.indexMaterial       = this.indexPhongMaterial;
		this.indexShadedMaterial = this.indexPhongMaterial;

		/* Body */
		/* ------------------------------------------------------------- */

		this.body = new THREE.Mesh(
			new BoxGeometry(width, height, length,
				widthSegments, heightSegments, depthSegments),
			PLANE_MATERIAL_BODY_PHONG);

		this.compose(this.body,
			PLANE_MATERIAL_BODY_BASIC,
			PLANE_MATERIAL_BODY_LAMBERT,
			PLANE_MATERIAL_BODY_PHONG);

		this.add(this.body);

		/* Stabilizers */
		/* ------------------------------------------------------------- */

		var leftStabilizer = new THREE.Mesh(
			new StabilizerGeometry(height/10, stabilizerSize, stabilizerSize,
				widthSegments, heightSegments, depthSegments),
			PLANE_MATERIAL_WING_PHONG);

		var rightStabilizer = new THREE.Mesh(
			new StabilizerGeometry(height/10, stabilizerSize, stabilizerSize,
				widthSegments, heightSegments, depthSegments),
			PLANE_MATERIAL_WING_PHONG);

		this.compose(leftStabilizer,
			PLANE_MATERIAL_WING_BASIC,
			PLANE_MATERIAL_WING_LAMBERT,
			PLANE_MATERIAL_WING_PHONG);

		this.compose(rightStabilizer,
			PLANE_MATERIAL_WING_BASIC,
			PLANE_MATERIAL_WING_LAMBERT,
			PLANE_MATERIAL_WING_PHONG);

		this.body.add(leftStabilizer);
		this.body.add(rightStabilizer);

		// Set stabilizers horizontally
		leftStabilizer.rotation.z = -Math.PI/2;
		leftStabilizer.rotation.y = -Math.PI/2;
		leftStabilizer.position.x -= stabilizerSize/2 + width/2;
		leftStabilizer.position.z -= length/2 - stabilizerSize/2

		rightStabilizer.rotation.z = Math.PI/2;
		rightStabilizer.rotation.y = Math.PI/2;
		rightStabilizer.position.x += stabilizerSize/2 + width/2;
		rightStabilizer.position.z -= length/2 - stabilizerSize/2

		var topStabilizer = new THREE.Mesh(
			new StabilizerGeometry(height/10, stabilizerSize, stabilizerSize,
				widthSegments, heightSegments, depthSegments),
			PLANE_MATERIAL_WING_PHONG);

		this.compose(topStabilizer,
			PLANE_MATERIAL_WING_BASIC,
			PLANE_MATERIAL_WING_LAMBERT,
			PLANE_MATERIAL_WING_PHONG);

		this.body.add(topStabilizer);

		// Set top stabilizer
		topStabilizer.position.z -= length/2 - stabilizerSize/2;
		topStabilizer.position.y += height/2 + stabilizerSize/2;

		/* Afterburner */
		/* ------------------------------------------------------------- */

		var afterburner = new THREE.Mesh(
			new AfterburnerGeometry(width/2, height/2, afterburnerLength,
				widthSegments, heightSegments, depthSegments),
			PLANE_MATERIAL_AFTERBURNER_PHONG);

		var afterburnerLevel1 = new THREE.Mesh(
			new AfterburnerGeometry(width/4, height/4, afterburnerLength/2,
				widthSegments, heightSegments, depthSegments),
			PLANE_MATERIAL_AB_TIP_PHONG);

		this.compose(afterburner,
			PLANE_MATERIAL_AFTERBURNER_BASIC,
			PLANE_MATERIAL_AFTERBURNER_LAMBERT,
			PLANE_MATERIAL_AFTERBURNER_PHONG);
		this.compose(afterburnerLevel1,
			PLANE_MATERIAL_AB_TIP_BASIC,
			PLANE_MATERIAL_AB_TIP_LAMBERT,
			PLANE_MATERIAL_AB_TIP_PHONG);

		this.body.add(afterburner);
		this.body.add(afterburnerLevel1);

		afterburner.position.z -= length/2 + afterburnerLength/2;
		afterburnerLevel1.position.z -= length/2 + afterburnerLength + afterburnerLength/4;

		/* Wings */
		/* ------------------------------------------------------------- */

		var leftWing = new THREE.Mesh(
			new WingGeometry(height/10, length/2, wingSpan,
				widthSegments, heightSegments, depthSegments),
			PLANE_MATERIAL_WING_PHONG);

		var rightWing = new THREE.Mesh(
			new WingGeometry(height/10, length/2, wingSpan,
				widthSegments, heightSegments, depthSegments),
			PLANE_MATERIAL_WING_PHONG);

		this.compose(leftWing,
			PLANE_MATERIAL_WING_BASIC,
			PLANE_MATERIAL_WING_LAMBERT,
			PLANE_MATERIAL_WING_PHONG);
		this.compose(rightWing,
			PLANE_MATERIAL_WING_BASIC,
			PLANE_MATERIAL_WING_LAMBERT,
			PLANE_MATERIAL_WING_PHONG);

		this.body.add(leftWing);
		this.body.add(rightWing);

		// Set wings horizontally
		
		leftWing.rotation.z = -Math.PI/2;
		leftWing.rotation.y = -Math.PI/2;
		leftWing.position.x -= wingSpan/2 + width/2;

		rightWing.rotation.z = Math.PI/2;
		rightWing.rotation.y = Math.PI/2;
		rightWing.position.x += wingSpan/2 + width/2;

		/* Cockpit */
		/* ------------------------------------------------------------- */

		var cockpit = new THREE.Mesh(
			new CockpitGeometry(width, height, cockpitLength,
				widthSegments, heightSegments, depthSegments),
			PLANE_MATERIAL_COCKPIT_PHONG);

		this.compose(cockpit,
			PLANE_MATERIAL_COCKPIT_BASIC,
			PLANE_MATERIAL_COCKPIT_LAMBERT,
			PLANE_MATERIAL_COCKPIT_PHONG);

		this.body.add(cockpit);

		cockpit.position.z += length/2 + cockpitLength/2;
	}

	/* compose: generate array of materials of a mesh */
	compose(mesh, basic, lambert, phong) {
		mesh.materialArray = new Array();
		mesh.materialArray.push(basic, lambert, phong);
	}

	/* transmute: compute new airplane material */
	transmute(calc, diffuse) {
		// diffuse == true: material = lambert
		if (diffuse)
			this.indexShadedMaterial = this.indexLambertMaterial;
		// diffuse == false: material = phong
		else
			this.indexShadedMaterial = this.indexPhongMaterial;

		// If shading is computed and material is basic
		if (calc && this.indexMaterial != this.indexShadedMaterial) {
			this.indexMaterial = this.indexShadedMaterial;
			this.changemat(this.indexMaterial);
		}
		// If shading is not computed and material is basic
		else if (!calc && this.indexMaterial != this.indexBasicMaterial) {
			this.indexMaterial = this.indexBasicMaterial;
			this.changemat(this.indexMaterial);
		}
	}

	/* changemat: change material of all meshes */
	changemat(i) {
		this.body.material = this.body.materialArray[i];
		this.body.children.forEach(mesh => {
			mesh.material = mesh.materialArray[i];
		});
	}
}
