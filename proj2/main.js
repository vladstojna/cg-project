// Main

// Import other classes and functions
//------------------------------------------------------------------------------
//import Ground from "./ground.js"
//------------------------------------------------------------------------------

var scene;
var ortoCamera;
var perspCamera;
var followCamera;
var clock;
var then;

var cam1;
var cam2;
var cam3;

var field;
var ball = null;

var showAxes = true;

function render() {
	// Render scene using camera
	if (cam1) {
		renderer.render(scene, ortoCamera);
	}
	else if (cam2) {
		renderer.render(scene, perspCamera);
	}
	else if (cam3) {
		// updateVPN parameters change camera VPN; y should not be -1
		followCamera.updateVPN(1, 1, 0);
		
		renderer.render(scene, followCamera);
	}
}

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
	for (let i = 0; i < 2; i++)
		field.addBall(field.wallHeight() / 2, 0xFFFF00);

	scene.add(field)
}

function createOrtographicCamera() {
	width  = window.innerWidth;
	height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

	ortoCamera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 10, 5000);

	// Normal
	//ortoCamera.position.set(500, 200, 500);
	ortoCamera.position.set(0, 500, 0);
	ortoCamera.lookAt(scene.position);
	cam1 = true;
}

function createPerspectiveCamera() {
	perspCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);

	perspCamera.position.set(400, 500, 0);
	perspCamera.lookAt(scene.position);
	cam2 = false;
}

function createChaseCamera() {
	followCamera = new chaseCamera(90, window.innerWidth / window.innerHeight, 1, 1000, field);
	
	cam3 = false;
}

function createClock() {
	clock = new THREE.Clock();
}

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

	render();

	requestAnimationFrame(animate);
}

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

	render();

	window.addEventListener("keydown", onKeyDown);
}

function onKeyDown(e) {
	switch(e.key) {
		case '1':
			// Normal
			cam1 = true;
			cam2 = false;
			cam3 = false;
			followCamera.ball = null;
			break;
		case '2':
			cam1 = false;
			cam2 = true;
			cam3 = false;
			followCamera.ball = null;
			break;
		case '3':
			cam1 = false;
			cam2 = false;
			cam3 = true;
			break;
		case 'e':
		case 'E':
			showAxes = !showAxes;
	}
}
