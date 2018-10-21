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

	// Add playfield to scene
	field = new Playfield(300, 0x404040, 0x505050, 2);

	createAxes(25, -300, 100, 0);

	// Ground the playfield
	field.rotation.x = Math.PI/2;
	field.position.set(0, 0, 0);

	// Add 10 balls to the field
	for (let i = 0; i < 20; i++)
		field.addBall(field.wallHeight() / 2, 0xFFFF00);

	scene.add(field)
}

function createOrtographicCamera() {
	width  = window.innerWidth;
	height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

	ortoCam = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 10, 5000);

	// Normal
	//ortoCam.position.set(500, 200, 500);
	ortoCam.position.set(0, 500, 0);
	ortoCam.lookAt(scene.position);
	cam1 = true;
}

function createPerspectiveCamera() {
	perspCam = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);

	perspCam.position.set(400, 500, 0);
	perspCam.lookAt(scene.position);
	cam2 = false;
}

function createChaseCamera() {
	chaseCam = new chaseCamera(90, window.innerWidth / window.innerHeight, 1, 1000, field);
	
	cam3 = false;
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
	if (elapsed > 10*1000) {
		then = now;
		// Increase velocity by 10
		field.accelBalls(10);
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
