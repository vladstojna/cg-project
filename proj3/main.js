// Main

var scene;
var camera;
var clock;

var airplane

var rotateLeft;
var rotateRight;
var pitchUp;
var pitchDown;

var direclight;
var spotlights;
var dirstatus;

var lightcalc;
var smooth;

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
	smooth = false;

	scene.add(new Ground(
		GROUND_WIDTH,
		GROUND_HEIGHT,
		GROUND_COLOR,
		GROUND_POS_X,
		GROUND_POS_Y,
		GROUND_POS_Z));

	addSpotlights();

	//scene.add(new THREE.FaceNormalsHelper(airplane.body, 50, 0x00bb00, 2))
	//scene.add(new THREE.VertexNormalsHelper(airplane.body, 50, 0xbbbbbb, 2))
}

function addSpotlights() {
	var wrot = 0;
	spotlights = new Array();

	for(let i = 0; i < SPOT_NO; i++) {
		var obj = new Spotlight(SPOT_X,
			SPOT_Y,
			SPOT_Z,
			SPOT_RAD,
			SPOT_HEIGHT,
			SPOT_SEGS,
			SPOT_SPHERE_RAD,
			SPOT_SPHERE_SEGS,
			SPOT_ROT,
			wrot);

		var spot = {object: obj, visibility: true};
		
		spotlights.push(spot);
		scene.add(spot.object);
		
		wrot += SPOT_SCENE_ROT;
	}
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

function rotatePlane(radialSpeed) {
	// Gets frametime
	var time = clock.getDelta()

	if (rotateLeft)
		airplane.rotateY(radialSpeed * time);
	if (rotateRight)
		airplane.rotateY(-radialSpeed * time);
	if (pitchUp)
		airplane.rotateX(-radialSpeed * time);
	if (pitchDown)
		airplane.rotateX(radialSpeed * time);
}

function animate() {

	rotatePlane(PLANE_ROTATION_VELOCITY);
	
	airplane.transmute(lightcalc, smooth);
	direclight.turn(dirstatus);

	turnSpotlights();

	render(camera);
	requestAnimationFrame(animate);
}

function turnSpotlights() {
	spotlights.forEach(spot => {
		spot.object.turn(spot.visibility);
	})
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
			smooth = !smooth;
			break;
		case '1':
			spotlights[0].visibility = !spotlights[0].visibility;
			break;
		case '2':
			spotlights[1].visibility = !spotlights[1].visibility;
			break;
		case '3':
			spotlights[2].visibility = !spotlights[2].visibility;
			break;
		case '4':
			spotlights[3].visibility = !spotlights[3].visibility;
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
