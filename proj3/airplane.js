/* Airplane class */

class Airplane extends THREE.Object3D {
	constructor(width, height, length,
		wingSpan=length, stabilizerSize=height/2,
		cockpitLength=length/4, afterburnerLength=length/16,
		widthSegments=1, heightSegments=1, depthSegments=1) {

		super();

		var material = PLANE_MATERIAL_PHONG;

		// Material array: Basic, Lambert, Phong
		this.basicmaterial   = 0;
		this.gouraudmaterial = 1;
		this.phongmaterial   = 2;
		// Initial material has phong shading
		this.material        = 2;
		// Initial light material has phong shading
		this.ligthmaterial   = 2;

		this.body = new THREE.Mesh(
			new BoxGeometry(width, height, length, widthSegments, heightSegments, depthSegments),
			material);

		this.body.materials = new Array();
		this.compose(this.body.materials, PLANE_MATERIAL_BASIC, PLANE_MATERIAL_LAMBERT, PLANE_MATERIAL_PHONG);

		this.add(this.body);

		var leftStabilizer = new THREE.Mesh(
			new StabilizerGeometry(height/10, stabilizerSize, stabilizerSize,
				widthSegments, heightSegments, depthSegments),
			material);

		var rightStabilizer = new THREE.Mesh(
			new StabilizerGeometry(height/10, stabilizerSize, stabilizerSize,
				widthSegments, heightSegments, depthSegments),
			material);

		leftStabilizer.materials = new Array();
		this.compose(leftStabilizer.materials, PLANE_MATERIAL_BASIC, PLANE_MATERIAL_LAMBERT, PLANE_MATERIAL_PHONG);
		rightStabilizer.materials = new Array();
		this.compose(rightStabilizer.materials, PLANE_MATERIAL_BASIC, PLANE_MATERIAL_LAMBERT, PLANE_MATERIAL_PHONG);

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
			material);

		topStabilizer.materials = new Array();
		this.compose(topStabilizer.materials, PLANE_MATERIAL_BASIC, PLANE_MATERIAL_LAMBERT, PLANE_MATERIAL_PHONG);

		this.body.add(topStabilizer);

		// Set top stabilizer
		topStabilizer.position.z -= length/2 - stabilizerSize/2;
		topStabilizer.position.y += height/2 + stabilizerSize/2;

		var afterburner = new THREE.Mesh(
			new AfterburnerGeometry(width/2, height/2, afterburnerLength,
				widthSegments, heightSegments, depthSegments),
			material);

		var afterburnerLevel1 = new THREE.Mesh(
			new AfterburnerGeometry(width/4, height/4, afterburnerLength/2,
				widthSegments, heightSegments, depthSegments),
			material);

		afterburner.materials = new Array();
		this.compose(afterburner.materials, PLANE_MATERIAL_BASIC, PLANE_MATERIAL_LAMBERT, PLANE_MATERIAL_PHONG);
		afterburnerLevel1.materials = new Array();
		this.compose(afterburnerLevel1.materials, PLANE_MATERIAL_BASIC, PLANE_MATERIAL_LAMBERT, PLANE_MATERIAL_PHONG);

		this.body.add(afterburner);
		this.body.add(afterburnerLevel1);

		afterburner.position.z -= length/2 + afterburnerLength/2;
		afterburnerLevel1.position.z -= length/2 + afterburnerLength + afterburnerLength/4;

		material = WING_MATERIAL_PHONG;

		var leftWing = new THREE.Mesh(
			new WingGeometry(height/10, length/2, wingSpan,
				widthSegments, heightSegments, depthSegments),
			material);

		var rightWing = new THREE.Mesh(
			new WingGeometry(height/10, length/2, wingSpan,
				widthSegments, heightSegments, depthSegments),
			material);

		leftWing.materials = new Array();
		this.compose(leftWing.materials, WING_MATERIAL_BASIC, WING_MATERIAL_LAMBERT, WING_MATERIAL_PHONG);
		rightWing.materials = new Array();
		this.compose(rightWing.materials, WING_MATERIAL_BASIC, WING_MATERIAL_LAMBERT, WING_MATERIAL_PHONG);

		this.body.add(leftWing);
		this.body.add(rightWing);

		// Set wings horizontally
		
		leftWing.rotation.z = -Math.PI/2;
		leftWing.rotation.y = -Math.PI/2;
		leftWing.position.x -= wingSpan/2 + width/2;

		rightWing.rotation.z = Math.PI/2;
		rightWing.rotation.y = Math.PI/2;
		rightWing.position.x += wingSpan/2 + width/2;

		material = COCKPIT_MATERIAL_PHONG;

		var cockpit = new THREE.Mesh(
			new CockpitGeometry(width, height, cockpitLength,
				widthSegments, heightSegments, depthSegments),
			material);

		cockpit.materials = new Array();
		this.compose(cockpit.materials, COCKPIT_MATERIAL_BASIC, COCKPIT_MATERIAL_LAMBERT, COCKPIT_MATERIAL_PHONG);

		this.body.add(cockpit);

		cockpit.position.z += length/2 + cockpitLength/2;
		}

		compose(array, basic, lambert, phong) {
			array.push(basic);
			array.push(lambert);
			array.push(phong);
		}

		transmute(calc, shade) {
			// shade == true: material = phong
			if (shade) {
				this.ligthmaterial = this.phongmaterial;
			}
			// shade == false: material = lambert
			else {
				this.ligthmaterial = this.gouraudmaterial;
			}
				
			// If light calcs are on and material is basic
			if (calc && this.material != this.ligthmaterial) {
				this.material = this.ligthmaterial;
				this.changemat(this.material);
			}
			// If light calcs are off and material has shading
			else if (!calc && this.material != this.basicmaterial) {
				this.material = this.basicmaterial;
				this.changemat(this.material);
			}
		}

		changemat(i) {
			this.body.material = this.body.materials[i];
			this.body.children.forEach(mesh => {
				mesh.material = mesh.materials[i];
			})
		}
}
