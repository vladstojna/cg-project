// Main

var scene;
var camera;
var controls;

var clock;

var width;
var height;

var ball;
var board;
var cube;
var plight;
var dlight;

var flagWireframe;
var flagShaderCompute;

//------------------------------------------------------------------------------

function render() {
	renderer.render(scene, camera);
}

//------------------------------------------------------------------------------

function createScene() {
	scene = new THREE.Scene();

	ball = new RotatingBall(50, 24, 24,
		new THREE.MeshPhongMaterial({color: 0xff0000, wireframe: false}),
		new THREE.MeshPhongMaterial({color: 0x00ff00, wireframe: false}),
		0, 50, 0,
		300, 0, Math.PI/1080
	);

	board = new Board(1000, 1000, 1, 1,
		0, 0, 0,
		new THREE.MeshPhongMaterial({color: 0xffff00, wireframe: false}),
		new THREE.MeshPhongMaterial({color: 0x00ff00, wireframe: false})
	);

	cube = new Cube(100, 100, 100,
		8, 8, 8,
		0, 50, 0,
		new THREE.MeshPhongMaterial({color: 0xff00ff, wireframe: false}),
		new THREE.MeshPhongMaterial({color: 0x00ff00, wireframe: false})
	);

	plight = new PointLight(0xffffff, 1, 600, 1, 0, 200, 0);

	dlight = new DirectionalLight(0xffffff, 0.5, 500, 200, 500);

	//dlight.add(new THREE.DirectionalLightHelper(dlight, 5));
	//ball.add(new THREE.AxesHelper(100));
	//ball.sphereMesh.add(new THREE.AxesHelper(100));

	scene.add(ball);
	scene.add(board);
	scene.add(cube);
	scene.add(plight);
	scene.add(dlight);

	flagWireframe     = false;
	flagShaderCompute = true;
}

function createControls() {
	controls = new THREE.OrbitControls(camera);
	controls.rotateSpeed = 0.5;
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

function createPerspectiveCamera() {
	width  = window.innerWidth;
	height = window.innerHeight;

	camera = new THREE.PerspectiveCamera(
		PERSP_CAM_FOVY,
		PERSP_CAM_AR,
		PERSP_CAM_N,
		PERSP_CAM_F);

	camera.position.set(PERSP_CAM_X, PERSP_CAM_Y, PERSP_CAM_Z);
	camera.lookAt(scene.position);
}

function createClock() {
	clock = new THREE.Clock();
}

function scaleScene(oldSize, newSize) {
	var mult = newSize / oldSize;
	scene.scale.set(mult, mult, mult);
}

//------------------------------------------------------------------------------

function animate() {
	// Rotates ball according to frametime
	ball.rotate(clock.getDelta());

	controls.update();

	render();

	requestAnimationFrame(animate);
}

//------------------------------------------------------------------------------

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	//createOrtographicCamera();
	createPerspectiveCamera();
	createControls();
	createClock();

	/* Starting camera is orthographic camera */
	render();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize",  onResize);
}

function onKeyDown(e) {
	switch(e.key) {
		// Toggle directional light
		case 'd':
		case 'D':
			dlight.visible = !dlight.visible;
			break;
		// Toggle point light
		case 'p':
		case 'P':
			plight.visible = !plight.visible;
			break;
		// Toggle wireframe
		case 'w':
		case 'W':
		// Toggle shading
		case 'l':
		case 'L':
		// Control ball movement
		case 'b':
		case 'B':
		// Pause
		case 'p':
		case 'P':
		// Refresh
		case 'r':
		case 'R':
	}
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerWidth > 0 && window.innerHeight > 0) {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		scaleScene(width, window.innerWidth);
	}
}
