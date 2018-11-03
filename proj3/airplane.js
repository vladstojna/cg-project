/* Airplane class */

class Airplane extends THREE.Object3D {
	constructor(width, height, length,
		wingSpan=length, stabilizerSize=height/2,
		cockpitLength=length/4, afterburnerLength=length/16,
		widthSegments=1, heightSegments=1, depthSegments=1) {

		super();

		var material = PLANE_MATERIAL_PHONG;

		this.body = new THREE.Mesh(
			new BoxGeometry(width, height, length, widthSegments, heightSegments, depthSegments),
			material);

		this.add(this.body);

		var leftWing = new THREE.Mesh(
			new WingGeometry(height/10, length/2, wingSpan,
				widthSegments, heightSegments, depthSegments),
			material);

		var rightWing = new THREE.Mesh(
			new WingGeometry(height/10, length/2, wingSpan,
				widthSegments, heightSegments, depthSegments),
			material);

		this.body.add(leftWing);
		this.body.add(rightWing);

		// Set wings horizontally
		
		leftWing.rotation.z = -Math.PI/2;
		leftWing.rotation.y = -Math.PI/2;
		leftWing.position.x -= wingSpan/2 + width/2;

		rightWing.rotation.z = Math.PI/2;
		rightWing.rotation.y = Math.PI/2;
		rightWing.position.x += wingSpan/2 + width/2;

		var leftStabilizer = new THREE.Mesh(
			new StabilizerGeometry(height/10, stabilizerSize, stabilizerSize,
				widthSegments, heightSegments, depthSegments),
			material);

		var rightStabilizer = new THREE.Mesh(
			new StabilizerGeometry(height/10, stabilizerSize, stabilizerSize,
				widthSegments, heightSegments, depthSegments),
			material);

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

		this.body.add(topStabilizer);

		// Set top stabilizer
		topStabilizer.position.z -= length/2 - stabilizerSize/2;
		topStabilizer.position.y += height/2 + stabilizerSize/2;

		var cockpit = new THREE.Mesh(
			new CockpitGeometry(width, height, cockpitLength,
				widthSegments, heightSegments, depthSegments),
			material);

		this.body.add(cockpit);

		cockpit.position.z += length/2 + cockpitLength/2;

		var afterburner = new THREE.Mesh(
			new AfterburnerGeometry(width/2, height/2, afterburnerLength,
				widthSegments, heightSegments, depthSegments),
			material);

		var afterburnerLevel1 = new THREE.Mesh(
			new AfterburnerGeometry(width/4, height/4, afterburnerLength/2,
				widthSegments, heightSegments, depthSegments),
			material);

		this.body.add(afterburner);
		afterburner.add(afterburnerLevel1);

		afterburner.position.z -= length/2 + afterburnerLength/2;
		afterburnerLevel1.position.z -= afterburnerLength/2 + afterburnerLength/4;
		}
}
