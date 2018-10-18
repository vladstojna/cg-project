// Main

// Import other classes and functions
//------------------------------------------------------------------------------
//import Ground from "./ground.js"
//------------------------------------------------------------------------------

var scene
var camera


function render() {
	renderer.render(scene, camera);
}

function createAxes(size, x, y, z) {
	var axes = new THREE.AxesHelper(size);
	axes.position.set(x, y, z);
	scene.add(axes);

	return axes;
}


function createScene() {
	scene = new THREE.Scene();

	var field = new Playfield(300, scene, 0x404040, 0x505050);

	createAxes(25, -300, 100, 0);

	field.rotation.x = Math.PI/2;
	field.position.set(0, 0, 0);

	for (let i = 0; i < 10; i++) {
		field.addBall(15, Math.random() * 285, Math.random() * 135)
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

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();
}