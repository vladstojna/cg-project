// Main

// Import other classes and functions
//------------------------------------------------------------------------------
//import Ground from "./ground.js"
//------------------------------------------------------------------------------

var scene
var camera
var clock
var then

// Other options: iterate scene children array?
var field

function render() {
	// Render scene using camera
	renderer.render(scene, camera);
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
	field = new Playfield(300, scene, 0x404040, 0x505050);

	createAxes(25, -300, 100, 0);

	// Ground the playfield
	field.rotation.x = Math.PI/2;
	field.position.set(0, 0, 0);

	/*	Ball possible coordinates:
	- Number of distinct x values: field width - 2 * ball radius + 1 (zero)
	- Starting x value: - (field width / 2 - ball radius)
	- Number of distinct y values:  field height - 2 * ball radius + 1 (zero)
	- Starting y value: - (field height / 2 - ball radius)	*/

	var diameter = field.wallHeight();
	var distX    = field.width - 2 * diameter/2 + 1;
	var distY    = field.height - 2 * diameter/2 + 1;
	var startX   = - (field.width / 2 - diameter/2);
	var startY   = - (field.height / 2 - diameter/2);

	// Add 10 balls to the scene on random starting positions
	for (let i = 0; i < 10; i++) {
		// diameter, x pos, y pos
		field.addBall(diameter, Math.random() * distX + startX, Math.random() * distY + startY)
	}

	scene.add(field)
}

function createCamera() {
	width  = window.innerWidth;
	height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

	camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 10, 5000);

	// Normal
	camera.position.set(500, 200, 500);
	camera.lookAt(scene.position);
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

	render()
	requestAnimationFrame(animate);
}

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();
	createClock();
	initTimer();

	render();
}