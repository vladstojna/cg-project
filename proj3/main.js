// Main

var scene;
var camera;
var clock;

var airplane

var rotateLeft;
var rotateRight;
var pitchUp;
var pitchDown;
var moveForward;
var moveBackward;

var direclight;
var spotlights;
var dirstatus;
var spot1status;
var spot2status;
var spot3status;
var spot4status;

var lightcalc;
var shading;

var width;
var height;

//------------------------------------------------------------------------------

function render(cam) {
	renderer.render(scene, cam);
}

//------------------------------------------------------------------------------

function createAxes(size, x, y, z) {
	// Debug axes
	var axes = new THREE.AxesHelper(size);
	axes.position.set(x, y, z);
	scene.add(axes);

	return axes;
}

function createScene() {
	scene = new THREE.Scene();

	//var spotlight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/2, 0, 2);
	//spotlight.position.set(200, 250, 200);

	airplane = new Airplane(
		PLANE_WIDTH,
		PLANE_HEIGHT,
		PLANE_LENGTH,
		PLANE_WING_SPAN,
		PLANE_STABILIZER_WIDTH,
		PLANE_COCKPIT_LENGTH,
		PLANE_AFTERBURNER_HEIGHT,
		PLANE_WIDTH_SEGMENTS,
		PLANE_HEIGHT_SEGMENTS,
		PLANE_DEPTH_SEGMENTS);
	
	scene.add(airplane);
	shading = true;
	
	//scene.add(spotlight);
	//scene.add(new THREE.FaceNormalsHelper(airplane.body, 50, 0x00bb00, 2))
	//scene.add(new THREE.VertexNormalsHelper(airplane.body, 50, 0xbbbbbb, 2))
}

function createPerspectiveCamera() {
	camera = new THREE.PerspectiveCamera(
		PERSP_CAM_FOVY,
		PERSP_CAM_AR,
		PERSP_CAM_N,
		PERSP_CAM_F);

	camera.position.set(PERSP_CAM_X, PERSP_CAM_Y, PERSP_CAM_Z);
	camera.lookAt(scene.position);
}

function createOrtographicCamera() {
	width  = window.innerWidth;
	height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

	camera = new THREE.OrthographicCamera(
		ORTO_CAM_L,
		ORTO_CAM_R,
		ORTO_CAM_T,
		ORTO_CAM_B,
		ORTO_CAM_N,
		ORTO_CAM_F);

	camera.position.set(ORTO_CAM_X, ORTO_CAM_Y, ORTO_CAM_Z);
	camera.lookAt(scene.position);
}

function createClock() {
	clock = new THREE.Clock();
}

function createDirecLight() {
	direclight = new DirecLight(200, 250, 200, true);
	scene.add(direclight);
	dirstatus = true;
	lightcalc = true;
}

function scaleScene(h, hNew, w, wNew) {
	var mult;

	if (hNew <= wNew)
		mult = hNew / h
	else
		mult = wNew / w

	scene.scale.set(mult, mult, mult);
}

//------------------------------------------------------------------------------

function animate() {
	// Gets frametime
	var time = clock.getDelta()

	if (rotateLeft)
		airplane.rotateY(Math.PI * time);

	if (rotateRight)
		airplane.rotateY(-Math.PI * time);

	if (pitchUp)
		airplane.rotateX(-Math.PI * time);

	if (pitchDown)
		airplane.rotateX(Math.PI * time);

	if (moveForward)
		airplane.translateZ(300 * time);

	if (moveBackward)
		airplane.translateZ(-300 * time);

	airplane.transmute(lightcalc, shading);
	
	direclight.turn(dirstatus);

	render(camera);
	requestAnimationFrame(animate);
}

//------------------------------------------------------------------------------

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createPerspectiveCamera();
	createDirecLight();
	createClock();

	//render(camera);

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup",   onKeyUp);
	window.addEventListener("resize",  onResize);
}

function onKeyDown(e) {
	switch(e.key) {
		case 'ArrowLeft':
			rotateLeft = true;
			break;
		case 'ArrowRight':
			rotateRight = true;
			break;
		case 'ArrowUp':
			pitchUp = true;
			break;
		case 'ArrowDown':
			pitchDown = true;
			break;
		case 'w':
		case 'W':
			moveForward = true;
			break;
		case 's':
		case 'S':
			moveBackward = true;
			break;
		case 'n':
		case 'N':
			dirstatus = !dirstatus;
			break;
		case 'l':
		case 'L':
			lightcalc = !lightcalc;
			break;
		case 'g':
		case 'G':
			shading = !shading;
			break;
	}

}

function onKeyUp(e) {
	switch(e.key) {
		case 'ArrowLeft':
			rotateLeft = false;
			break;
		case 'ArrowRight':
			rotateRight = false;
			break;
		case 'ArrowUp':
			pitchUp = false;
			break;
		case 'ArrowDown':
			pitchDown = false;
			break;
		case 'w':
		case 'W':
			moveForward = false;
			break;
		case 's':
		case 'S':
			moveBackward = false;
	}
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerWidth > 0 && window.innerHeight > 0) {

		camera.left   = renderer.getSize().width  / -2;
		camera.right  = renderer.getSize().width  /  2;
		camera.top    = renderer.getSize().height /  2;
		camera.bottom = renderer.getSize().height / -2;

		scaleScene(height, window.innerHeight, width, window.innerWidth);

		camera.updateProjectionMatrix();
	}
}
