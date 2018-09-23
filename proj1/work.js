var camera, scene, renderer;

function render() {
	renderer.render(scene, camera);
}

function createAxes() {
	var axes = new THREE.AxesHelper(100);

	// z = blue
	// y = green
	// x = red
	axes.position.x = -300;

	scene.add(axes);
}

function createScene() {
	var table;
	var lamp;

	scene = new THREE.Scene();

	createAxes();
	createGround();
	table = createTable(-20, 80, -50);
	lamp  = createLamp(-100, 4, -100);

	table.rotation.set(0, Math.PI/4, 0);
	lamp.scale.set(0.5, 0.5, 0.5);
}

function createTable(x, y, z) {

	var table = new THREE.Object3D();
	var material = new THREE.MeshBasicMaterial({color: 'green', wireframe: true});
	var geometry;
	var mesh;

	offsetX = 130;
	offsetY = 40;
	offsetZ = 30; 

	addTableTop();
	addTableLeg(-offsetX,  -offsetY, -offsetZ);
	addTableLeg(-offsetX,  -offsetY,  offsetZ);
	addTableLeg( offsetX,  -offsetY,  offsetZ);
	addTableLeg( offsetX,  -offsetY, -offsetZ);

	scene.add(table);
	table.position.set(x, y, z);

	function addTableTop() {
		geometry = new THREE.BoxGeometry(300, 10, 100);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 0);
	
		table.add(mesh);
	}
	
	function addTableLeg(offx, offy, offz) {
		geometry = new THREE.CylinderGeometry(8, 8, 80, 16);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(offx, offy, offz);
	
		table.add(mesh);
	}

	return table;
}

function createLamp(x, y, z) {
	var lamp = new THREE.Object3D();
	var material = new THREE.MeshBasicMaterial({color: 'cyan', wireframe: true});

	lampAddBase(lamp, 0, 0, 0, material);
	createAbajour(lamp, 287, 150, 0, Math.PI/6, material);
	createLampArm(lamp, 0, 128, 0, Math.PI/12, material);

	scene.add(lamp);

	lamp.position.set(x, y, z);

	return lamp;
}

function lampAddBase(obj, x, y, z, mat) {
	var geometry = new THREE.CylinderGeometry(32, 32, 16, 16);
	var mesh = new THREE.Mesh(geometry, mat);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function createAbajour(obj, x, y, z, rot, material) {
	var abajour  = new THREE.Object3D();
	var geometry;
	var mesh;

	abajourAddCover();
	//abajourAddLightbulb();
	abajourAddTop();
	abajourAddConnection();

	obj.add(abajour);
	abajour.rotation.set(0, 0, rot);

	function abajourAddCover() {
		geometry = new THREE.SphereGeometry(40, 16, 16, 0, Math.PI*2, 0, Math.PI/2);
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y, z);
		abajour.add(mesh);
	}

	function abajourAddLightbulb() {
		geometry = new THREE.SphereGeometry(20, 16, 16, 0, Math.PI*2, 0, Math.PI/2);
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y, z);
		mesh.rotation.set(0, 0, Math.PI);
		abajour.add(mesh);
	}

	function abajourAddTop() {
		geometry = new THREE.CylinderGeometry(10, 16, 20, 16);
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y + 45, z);
		abajour.add(mesh);
	}

	function abajourAddConnection() {
		geometry = new THREE.CylinderGeometry(3, 3, 20, 16);
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(x - 20, y + 45, z);
		mesh.rotation.set(0, 0, Math.PI/2);
		abajour.add(mesh);
	}
}

function createLampArm(obj, x, y, z, rot, material) {
	var arm      = new THREE.Object3D();
	var geometry;
	var mesh;

	armStraight(256, 0, 0, 0, 0);
	armStraight(200, Math.PI/2, 100, 128, 0);
	armHinge();

	obj.add(arm);

	function armStraight(len, rot, x1, y1, z1) {
		geometry = new THREE.CylinderGeometry(8, 8, len, 16);
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(x + x1, y + y1, z + z1);
		mesh.rotation.set(0, 0, rot);
		arm.add(mesh);
	}

	function armHinge() {
		geometry = new THREE.SphereGeometry(12, 16, 16);
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y + 128, z);
		arm.add(mesh);
	}

	arm.rotation.set(0, 0, rot);
}

function createCamera() {
	var width = window.innerWidth;
	var height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

	camera = new THREE.OrthographicCamera(width / -4, width / 4, height / 4, height / -4, 1, 1000);

	// Normal
	camera.position.set(500, 200, 500);
	camera.lookAt(scene.position);
}

function createGround() {
	var geometry = new THREE.PlaneGeometry(400, 400, 1, 1);
	var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide, wireframe: true});
	var plane = new THREE.Mesh(geometry, material);

	plane.rotation.x = Math.PI/2;
	plane.position.set(0, 0, 0);

	scene.add(plane);
}

function init() {
	renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();

	window.addEventListener("keydown", onKeyDown);
}

function onKeyDown(e) {
	switch(e.key) {
		case '1':
			// Normal
			camera.position.set(500, 200, 500);
			camera.lookAt(scene.position);
			break;
		case '2':
			// Towards xz
			camera.position.set(0, 200, 0);
			camera.lookAt(scene.position);
			break;
		case '3':
			// Towards zy
			camera.position.set(500, 0, 0);
			camera.lookAt(scene.position);
			break;
		case '4':
			// Towards xy
			camera.position.set(0, 0, 500);
			camera.lookAt(scene.position);
			break;
		case 'a':
		case 'A':
			scene.traverse(function(node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
	}

	render();
}