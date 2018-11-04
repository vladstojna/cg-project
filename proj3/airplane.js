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
		this.body =
			this.createBox(this,
				width, height, length,
				0, 0, 0,
				0, 0, 0,
				widthSegments, heightSegments, depthSegments,
				PLANE_MATERIAL_BODY_BASIC,
				PLANE_MATERIAL_BODY_LAMBERT,
				PLANE_MATERIAL_BODY_PHONG);

		/* Stabilizers */
		/* ------------------------------------------------------------- */
		this.leftStabilizer =
			this.createPrism(this.body,
				height/10, stabilizerSize, stabilizerSize,
				-stabilizerSize/2 - width/2, 0, -length/2 + stabilizerSize/2,
				0, -Math.PI/2, -Math.PI/2,
				widthSegments, heightSegments, depthSegments,
				PLANE_MATERIAL_WING_BASIC,
				PLANE_MATERIAL_WING_LAMBERT,
				PLANE_MATERIAL_WING_PHONG);

		this.rightStabilizer =
			this.createPrism(this.body,
				height/10, stabilizerSize, stabilizerSize,
				stabilizerSize/2 + width/2, 0, -length/2 + stabilizerSize/2,
				0, Math.PI/2, Math.PI/2,
				widthSegments, heightSegments, depthSegments,
				PLANE_MATERIAL_WING_BASIC,
				PLANE_MATERIAL_WING_LAMBERT,
				PLANE_MATERIAL_WING_PHONG);

		this.topStabilizer =
			this.createPrism(this.body,
				height/10, stabilizerSize, stabilizerSize,
				0, height/2 + stabilizerSize/2, -length/2 + stabilizerSize/2,
				0, 0, 0,
				widthSegments, heightSegments, depthSegments,
				PLANE_MATERIAL_WING_BASIC,
				PLANE_MATERIAL_WING_LAMBERT,
				PLANE_MATERIAL_WING_PHONG);

		/* Afterburner */
		/* ------------------------------------------------------------- */
		this.afterburner =
			this.createBox(this.body,
				width/2, height/2, afterburnerLength,
				0, 0, -length/2 - afterburnerLength/2,
				0, 0, 0,
				widthSegments, heightSegments, depthSegments,
				PLANE_MATERIAL_AFTERBURNER_BASIC,
				PLANE_MATERIAL_AFTERBURNER_LAMBERT,
				PLANE_MATERIAL_AFTERBURNER_PHONG);

		this.exhaust =
			this.createBox(this.afterburner,
				width/4, height/4, afterburnerLength/4,
				0, 0, -afterburnerLength/2,
				0, 0, 0,
				widthSegments, heightSegments, depthSegments,
				PLANE_MATERIAL_AB_TIP_BASIC,
				PLANE_MATERIAL_AB_TIP_LAMBERT,
				PLANE_MATERIAL_AB_TIP_PHONG);

		/* Wings */
		/* ------------------------------------------------------------- */
		this.leftWing =
			this.createPrism(this.body,
				height/10, length/2, wingSpan,
				-wingSpan/2 - width/2, 0, 0,
				0, -Math.PI/2, -Math.PI/2,
				widthSegments, heightSegments, depthSegments,
				PLANE_MATERIAL_WING_BASIC,
				PLANE_MATERIAL_WING_LAMBERT,
				PLANE_MATERIAL_WING_PHONG);

		this.rightWing =
			this.createPrism(this.body, height/10, length/2, wingSpan,
				wingSpan/2 + width/2, 0, 0,
				0, Math.PI/2, Math.PI/2,
				widthSegments, heightSegments, depthSegments,
				PLANE_MATERIAL_WING_BASIC,
				PLANE_MATERIAL_WING_LAMBERT,
				PLANE_MATERIAL_WING_PHONG);

		/* Cockpit */
		/* ------------------------------------------------------------- */
		this.cockpit =
			this.createPrism(this.body,
				width, height, cockpitLength,
				0, 0, length/2 + cockpitLength/2,
				0, 0, 0,
				widthSegments, heightSegments, depthSegments,
				PLANE_MATERIAL_COCKPIT_BASIC,
				PLANE_MATERIAL_COCKPIT_LAMBERT,
				PLANE_MATERIAL_COCKPIT_PHONG);

		/* Side exhausts */
		/* ------------------------------------------------------------- */
		this.createPrism(this.body,
			height, height/2, cockpitLength,
			-width/2 - height/4, 0, length/2 - cockpitLength/2,
			0, 0, Math.PI/2,
			widthSegments, heightSegments, depthSegments,
			PLANE_MATERIAL_AFTERBURNER_BASIC,
			PLANE_MATERIAL_AFTERBURNER_LAMBERT,
			PLANE_MATERIAL_AFTERBURNER_PHONG);

		this.createPrism(this.body,
			height, height/2, cockpitLength,
			width/2 + height/4, 0, length/2 - cockpitLength/2,
			0, 0, -Math.PI/2,
			widthSegments, heightSegments, depthSegments,
			PLANE_MATERIAL_AFTERBURNER_BASIC,
			PLANE_MATERIAL_AFTERBURNER_LAMBERT,
			PLANE_MATERIAL_AFTERBURNER_PHONG);
	}

	createBox(parent, w, h, l, xPos, yPos, zPos, xRot, yRot, zRot, wSeg, hSeg, dSeg, mB, mL, mP) {
		var box = new THREE.Mesh(new BoxGeometry(w, h, l, wSeg, hSeg, dSeg), mP);
		parent.add(box);
		box.rotation.set(xRot, yRot, zRot);
		box.position.set(xPos, yPos, zPos);
		this.compose(box, mB, mL, mP);
		return box;
	}

	createPrism(parent, w, h, l, xPos, yPos, zPos, xRot, yRot, zRot, wSeg, hSeg, dSeg, mB, mL, mP) {
		var prism = new THREE.Mesh(new RightTriangularPrismGeometry(w, h, l, wSeg, hSeg, dSeg), mP);
		parent.add(prism);
		prism.rotation.set(xRot, yRot, zRot);
		prism.position.set(xPos, yPos, zPos);
		this.compose(prism, mB, mL, mP);
		return prism;
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
