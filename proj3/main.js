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
var plane;
var currentCam;

var field;
var ball = null;

var showAxes = true;

var rotateLeft = false, rotateRight = false, rotateDown=false, rotateUp=false;
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

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(0, 500, 0);

	// Add playfield to scene
	plane = new Plane();

	//createAxes(200, 0, 100, 0);

	// Ground the playfield
	plane.position.set(0, 200, 0);

	scene.add(plane);
	scene.add(spotLight);
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

function createClock() {
	clock = new THREE.Clock();
}
function updatePlanePos(Xrot,Yrot,Zrot){
	var time = clock.getDelta()
	if(rotateLeft==true){
		plane.rotateY(Math.PI*time);
		rotateLeft=false;
	}
	if(rotateRight==true){
		plane.rotateY(-Math.PI*time);
		rotateRight=false;
	}
	if(rotateUp==true){
		plane.rotateZ(Math.PI*time);
		rotateUp=false;
	}
	if(rotateDown==true){
		plane.rotateZ(-Math.PI*time);
		rotateDown=false;
	}
}

//------------------------------------------------------------------------------


function animate() {
	render(currentCam);
	updatePlanePos()

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
	createClock();
	
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
			break;
		/* Chase Camera */
		case 'e':
		case 'E':
			showAxes = !showAxes;
			break;
		case 'ArrowLeft':
			rotateLeft=true;
			break;
		case 'ArrowRight':
			rotateRight=true;
		break;
		case 'ArrowUp':
			rotateUp=true;
		break;
		case 'ArrowDown':
			rotateDown=true;
		break;

	}
}
