var camera;
var scene;
var renderer;
var chair;
var chairWheels = new Array();
var clock = new THREE.Clock();
var axes;

//-----------------------------------------------------------------------------------------------------------

function render() {
	renderer.render(scene, camera);
}

//-----------------------------------------------------------------------------------------------------------

function createAxes() {
	axes = new THREE.AxesHelper(25);
	// z = blue, y = green, x = red
	axes.position.set(-300, 100, 0);
	scene.add(axes);
}

function createGround() {
	var geometry = new THREE.PlaneGeometry(400, 400, 1, 1);
	var material = new THREE.MeshBasicMaterial({color: 0x404040, side: THREE.DoubleSide, wireframe: true});
	var plane    = new THREE.Mesh(geometry, material);

	plane.rotation.x = Math.PI/2;
	plane.position.set(0, 0, 0);

	scene.add(plane);
}

//-----------------------------------------------------------------------------------------------------------

function createScene() {
	var table;
	var lamp;

	scene = new THREE.Scene();

	createAxes();
	createGround();
	table = createTable(-20, 80, -50);
	lamp  = createLamp(-100, 4, -100, Math.PI/12, -Math.PI/3, Math.PI/2);
	createChair(100, 0, -50, -Math.PI/12, 6);

	table.rotation.set(0, Math.PI/4, 0);
	lamp.scale.set(0.5, 0.5, 0.5);

	console.log(scene.children);
}

function createCamera() {
	var width = window.innerWidth;
	var height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

	camera = new THREE.OrthographicCamera(width / -4, width / 4, height / 4, height / -4, 1, 10000);

	// Normal
	camera.position.set(500, 200, 500);
	camera.lookAt(scene.position);
}

//-----------------------------------------------------------------------------------------------------------

function createTable(x, y, z) {

	var table = new THREE.Object3D();
	var material;
	var geometry;
	var mesh;

	offsetX = 130;
	offsetY = 40;
	offsetZ = 30; 

	var top = addTableTop();
	addTableLeg(top, -offsetX,  -offsetY, -offsetZ);
	addTableLeg(top, -offsetX,  -offsetY,  offsetZ);
	addTableLeg(top,  offsetX,  -offsetY,  offsetZ);
	addTableLeg(top,  offsetX,  -offsetY, -offsetZ);

	scene.add(table);
	table.position.set(x, y, z);

	function addTableTop() {
		geometry = new THREE.BoxGeometry(300, 10, 100);
		material = new THREE.MeshBasicMaterial({color: 0x994c00, wireframe: true});
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 0);

		table.add(mesh);
		return mesh;
	}
	
	function addTableLeg(obj, offx, offy, offz) {
		geometry = new THREE.CylinderGeometry(8, 8, 80, 16);
		material = new THREE.MeshBasicMaterial({color: 0x202020, wireframe: true});
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(offx, offy, offz);
	
		obj.add(mesh);
	}

	return table;
}

//-----------------------------------------------------------------------------------------------------------
function createLamp(x, y, z, rotGlobal, rotTop, rotHat) {
	var lamp     = new THREE.Object3D();
	var arm;
	var base;

	base = lampCreateBase(lamp, 0, 0, 0);
	arm  = lampCreateArm(base, 0, 0, 0, rotGlobal, rotTop);
	lampCreateAbajour(arm, 0, arm.geometry.parameters.height / 2, 0, rotHat);

	scene.add(lamp);
	lamp.position.set(x, y, z);

	return lamp;
}

function lampCreateBase(obj, x, y, z) {
	var geometry = new THREE.CylinderGeometry(32, 32, 16, 16);
	var material = new THREE.MeshBasicMaterial({color: 0x606060, wireframe: true});
	var mesh = new THREE.Mesh(geometry, material)
	mesh.position.set(x, y, z);

	obj.add(mesh);

	return mesh;
}

function lampCreateAbajour(obj, x, y, z, rot) {
	var abajour = new THREE.Object3D();
	var material;
	var geometry;
	var mesh;

	abajourAddCover(30, -45, 0);
	abajourAddLightbulb(30, -45, 0);
	abajourAddTop(30, 0, 0);
	abajourAddConnection(8, 0, 0);

	obj.add(abajour);
	abajour.position.set(x, y, z);
	abajour.rotation.set(0, 0, rot);

	function abajourAddCover(offX, offY, offZ) {
		geometry = new THREE.SphereGeometry(40, 16, 16, 0, Math.PI*2, 0, Math.PI/2);
		material = new THREE.MeshBasicMaterial({color: 0x808080, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY, offZ);
		abajour.add(mesh);
	}

	function abajourAddLightbulb(offX, offY, offZ) {
		geometry = new THREE.SphereGeometry(20, 16, 16, 0, Math.PI*2, 0, Math.PI/2);
		material = new THREE.MeshBasicMaterial({color: 0xfff1e0, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY, offZ);
		mesh.rotation.set(0, 0, Math.PI);
		abajour.add(mesh);
	}

	function abajourAddTop(offX, offY, offZ) {
		geometry = new THREE.CylinderGeometry(10, 16, 20, 16);
		material = new THREE.MeshBasicMaterial({color: 0x808080, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY, offZ);
		abajour.add(mesh);
	}

	function abajourAddConnection(offX, offY, offZ) {
		geometry = new THREE.CylinderGeometry(3, 3, 20, 16);
		material = new THREE.MeshBasicMaterial({color: 0x808080, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY, offZ);
		mesh.rotation.set(0, 0, Math.PI/2);
		abajour.add(mesh);
	}
}

function lampCreateArm(obj, x, y, z, rotGlobal, rotHinge) {
	var arm = new THREE.Object3D();

	var geometry;
	var material;
	var mesh;
	var tube;
	var hinge;

	tube  = armStraight(arm, 256, 0, 128, 0);
	hinge = armHinge(tube, 0, 0, 0);
	tube  = armStraight(hinge, 200, 0, 100, 0);

	obj.add(arm);

	hinge.position.set(0, 128, 0);
	hinge.rotation.set(0, 0, rotHinge);
	arm.rotation.set(0, 0, rotGlobal);
	arm.position.set(x, y, z);

	return tube;

	function armStraight(obj, len, offX, offY, offZ) {
		geometry = new THREE.CylinderGeometry(8, 8, len, 16);
		material = new THREE.MeshBasicMaterial({color: 0x808080, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY, offZ);
		obj.add(mesh);

		return mesh;
	}

	function armHinge(obj, offX, offY, offZ) {
		geometry = new THREE.SphereGeometry(12, 16, 16);
		material = new THREE.MeshBasicMaterial({color: 0x808080, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY, offZ);
		obj.add(mesh);

		return mesh;
	}
}

//-----------------------------------------------------------------------------------------------------------

function createChair(x, y, z, angle, axisNo) {
	chair = new THREE.Object3D();

	axes = new THREE.AxesHelper(10);
	
	chair.userData = {movingXDown: false, movingXUp: false, velocity: 0, accel: 5, factor: 100, rotatingLeft: false, rotatingRight: false, rotAngle: Math.PI/60};

	var frame = chairCreateFrame(chair, 0, 0, 0, axisNo);
	chairCreateSeat(frame, 0, 0, 0, angle);

	scene.add(chair);
	chair.position.set(x, y, z);

	chair.add(axes);
}

function chairCreateSeat(obj, x, y, z, rotBack) {
	var seat  = new THREE.Object3D();
	var hinge = new THREE.Object3D();
	var back;
	var base;

	var material;
	var geometry;
	var mesh;

	base = seatAddBase(seat, 60, 6, 60, 0, 0, 0, 0x0E6DAC);
	seatAddArmRest(base, 24, 4, 12, 0, 3, 28, 0x0A60A9);
	seatAddArmRest(base, 24, 4, 12, 0, 3, -28, 0x0A60A9);
	seatAddBase(hinge, 6, 100, 64, 0, 47, 0, 0x0A60A9);

	base.add(hinge);
	obj.add(seat);

	hinge.position.set(27, 0, 0);
	hinge.rotation.set(0, 0, rotBack);
	seat.position.set(x, y, z);

	return seat;

	function seatAddBase(obj, w, h, d, offX, offY, offZ, color) {
		geometry = new THREE.BoxGeometry(w, h, d);
		material = new THREE.MeshBasicMaterial({color: color, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY, offZ);
		obj.add(mesh);

		return mesh;
	}

	function seatAddArmRest(obj, w, h, d, offX, offY, offZ, color) {
		geometry = new THREE.BoxGeometry(w / 10, h * 4, w / 10);
		material = new THREE.MeshBasicMaterial({color: color, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY + (h * 4) / 2, offZ);
		obj.add(mesh);

		geometry = new THREE.BoxGeometry(w, h, d);
		material = new THREE.MeshBasicMaterial({color: color, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY + h * 4, offZ);
		obj.add(mesh);
	}
}

function chairCreateFrame(obj, x, y, z, axesNo) {
	if (axesNo % 2 !== 0) {
		console.log("Only allowed even numbers during frame creation!", axesNo);
		return;
	}

	var frame = new THREE.Object3D();
	var axis;

	var material;
	var geometry;
	var mesh;

	frameAddAxis(4, 50, 4, 0, 0, -25, 0);
	for (let angle = 0; angle < Math.PI; angle = angle + 2*Math.PI/axesNo) {
		axis = frameAddAxis(50, 4, 4, angle, 0, -50, 0);
		chairWheels.push(frameAddWheel(axis, 5, 2, 8, 16, -angle, 24, 0, 0));
		chairWheels.push(frameAddWheel(axis, 5, 2, 8, 16, -angle, -24, 0, 0));
	}

	obj.add(frame);
	frame.position.set(x, y + 50 + 5 + 2, z);

	return frame;

	function frameAddAxis(w, h, d, angle, offX, offY, offZ) {
		geometry = new THREE.BoxGeometry(w, h, d);
		material = new THREE.MeshBasicMaterial({color: 0x1764BC, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY, offZ);
		mesh.rotation.set(0, angle, 0);
		frame.add(mesh);

		return mesh;
	}

	function frameAddWheel(axis, radius, tube, radialSegments, tubularSegments, angle, offX, offY, offZ) {
		geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
		material = new THREE.MeshBasicMaterial({color: 0x3381DA, wireframe: true});
		mesh     = new THREE.Mesh(geometry, material);

		mesh.position.set(offX, offY, offZ);
		mesh.rotation.set(0, angle, 0);
		axis.add(mesh);
		return mesh;
	}

}

function rotateWheels(distance) {
	chairWheels.forEach(function(wheel) {
		wheel.rotateZ(distance / (wheel.geometry.parameters.radius + wheel.geometry.parameters.tube));
	});
}

function moveChair() {

	var multiplier = 60 * clock.getDelta(); // base framerate is 60
	var distance = chair.userData.velocity / chair.userData.factor * multiplier;

	if (chair.userData.rotatingLeft)
		chair.rotateY(chair.userData.rotAngle * multiplier);

	if (chair.userData.rotatingRight)
		chair.rotateY(-chair.userData.rotAngle * multiplier);

	if (chair.userData.movingXDown && !chair.userData.movingXUp || !chair.userData.movingXUp && chair.userData.velocity < 0 || chair.userData.movingXDown && chair.userData.movingXUp && chair.userData.velocity < 0) {
		chair.userData.velocity += chair.userData.accel;
		chair.translateX(distance);
		rotateWheels(-distance);
	}

	if (chair.userData.movingXUp && !chair.userData.movingXDown || !chair.userData.movingXDown && chair.userData.velocity > 0 || chair.userData.movingXDown && chair.userData.movingXUp && chair.userData.velocity > 0) {
		chair.userData.velocity -= chair.userData.accel;
		chair.translateX(distance);
		rotateWheels(-distance);
	}

	render();
	requestAnimationFrame(moveChair);
}

//-----------------------------------------------------------------------------------------------------------

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup",   onKeyUp);
	window.addEventListener("resize",  onResize);
}

function onKeyDown(e) {
	switch(e.key) {
		case '1':
			// Normal
			camera.position.set(500, 200, 500);
			camera.lookAt(scene.position);
			break;
		case '2':
			// Towards xy
			camera.position.set(0, 0, 500);
			camera.lookAt(scene.position);
			break;
		case '3':
			// Towards zy
			camera.position.set(500, 0, 0);
			camera.lookAt(scene.position);
			break;
		case 'a':
		case 'A':
			scene.traverse(function(node) {
				if (node instanceof THREE.Mesh)
					node.material.wireframe = !node.material.wireframe;
			});
			break;
		case 'ArrowLeft':
			chair.userData.rotatingLeft = true;
			break;
		case 'ArrowRight':
			chair.userData.rotatingRight = true;
			break;
		case 'ArrowUp':
			chair.userData.movingXUp = true;
			break;
		case 'ArrowDown':
			chair.userData.movingXDown = true;
	}

	//render();
}

function onKeyUp(e) {
	switch(e.key) {
		case 'ArrowLeft':
			chair.userData.rotatingLeft = false;
			break;
		case 'ArrowRight':
			chair.userData.rotatingRight = false;
			break;
		case 'ArrowUp':
			chair.userData.movingXUp = false;
			break;
		case 'ArrowDown':
			chair.userData.movingXDown = false;
	}
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerWidth > 0 && window.innerHeight > 0) {
		camera.left   = renderer.getSize().width  / -4;
		camera.right  = renderer.getSize().width  /  4;
		camera.top    = renderer.getSize().height /  4;
		camera.bottom = renderer.getSize().height / -4;
		camera.updateProjectionMatrix();
	}

	//render();
}