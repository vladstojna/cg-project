// Main

// Import other classes and functions
//------------------------------------------------------------------------------
//import Ground from "./ground.js"
//------------------------------------------------------------------------------

var scene;
var ortoCam;
var perspCam;
var chaseCam;
var clock;
var then;

var currentCam;

var field;
var ball = null;

var showAxes = true;

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

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
	directionalLight.position.set(200, 200, 100);

	// Add playfield to scene
	field = new Playfield(
		FIELD_WIDTH,
		FIELD_ASPECT,
		FIELD_GCOLOR,
		FIELD_WCOLOR);

	createAxes(25, -300, 100, 0);

	// Ground the playfield
	field.rotation.x = Math.PI/2;
	field.position.set(0, 0, 0);

	// Add 10 balls to the field
	for (let i = 0; i < BALL_NUM; i++)
		field.addBall(field.wallHeight() / 2, BALL_COLOR);

	scene.add(field);
	scene.add(directionalLight);
}

function createOrtographicCamera() {
	width  = window.innerWidth;
	height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

	ortoCam = new THREE.OrthographicCamera(
		ORTO_CAM_L,
		ORTO_CAM_R,
		ORTO_CAM_T,
		ORTO_CAM_B,
		ORTO_CAM_N,
		ORTO_CAM_F);

	ortoCam.position.set(ORTO_CAM_X, ORTO_CAM_Y, ORTO_CAM_Z);
	ortoCam.lookAt(scene.position);
}

function createPerspectiveCamera() {
	perspCam = new THREE.PerspectiveCamera(
		PERSP_CAM_FOVY,
		PERSP_CAM_AR,
		PERSP_CAM_N,
		PERSP_CAM_F);

	perspCam.position.set(PERSP_CAM_X, PERSP_CAM_Y, PERSP_CAM_Z);
	perspCam.lookAt(scene.position);
}

function createChaseCamera() {
	chaseCam = new chaseCamera(
		CHASE_CAM_FOVY,
		CHASE_CAM_AR,
		CHASE_CAM_N,
		CHASE_CAM_F,
		field);
}

function createClock() {
	clock = new THREE.Clock();
}

//------------------------------------------------------------------------------

function initTimer() {
	then = Date.now();
}

function updateVel() {
	/* Could technically use setInterval
	but there's no point when we can achieve
	the same result with a simple condition check */

	// Get current time
	var now = Date.now();
	// Check if elapsed time is greater than refresh time
	elapsed = now - then;
	// Refresh time is in ms (10 seconds)
	if (elapsed > REFR_TIME) {
		then = now;
		// Increase velocity by 10
		field.accelBalls(REFR_INC);
	}
}

function animate() {

	// Gets frametime
	var time = clock.getDelta();

	// Check if ball velocity needs to be updated
	updateVel();

	// Move balls
	field.moveBalls(time);
	field.toggleAxes(showAxes);

	// Render with appropriate camera
	if (currentCam == chaseCam)
		// updateVPN parameters change camera VPN; y should not be -1
		chaseCam.updateVPN(1, 1, 0);
	render(currentCam);

	requestAnimationFrame(animate);
}

//------------------------------------------------------------------------------

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createOrtographicCamera();
	createPerspectiveCamera();
	createChaseCamera();
	createClock();
	initTimer();

	/* Starting camera is ortographic top down camera */
	currentCam = ortoCam;
	render(currentCam);

	window.addEventListener("keydown", onKeyDown);
}

function onKeyDown(e) {
	switch(e.key) {
		/* Top down camera */
		case '1':
			currentCam = ortoCam;
			chaseCam.ball = null;
			break;
		/* Full view perspective camera */
		case '2':
			currentCam = perspCam;
			chaseCam.ball = null;
			break;
		/* Chase Camera */
		case '3':
			currentCam = chaseCam;
			break;
		case 'e':
		case 'E':
			showAxes = !showAxes;
	}
}
