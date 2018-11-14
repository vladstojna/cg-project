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

var flagBallDirection;
var flagWireframe;
var flagShaderCompute;
var flagPaused;
var flagRefresh;

//------------------------------------------------------------------------------

function render() {
	renderer.render(scene, camera);
}

//------------------------------------------------------------------------------

function createScene() {
	scene = new THREE.Scene();

	ball = new RotatingBall(50, 24, 24,
		new THREE.MeshPhongMaterial({color: 0xff0000, wireframe: false}),
		new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false}),
		0, 50, 0,
		300, 0, Math.PI/180, Math.PI
	);

	board = new Board(1000, 1000, 16, 16,
		0, 0, 0,
		new THREE.MeshPhongMaterial({color: 0xffff00, wireframe: false}),
		new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: false})
	);

	cube = new Cube(100, 100, 100,
		8, 8, 8,
		0, 50, 0,
		new THREE.MeshPhongMaterial({color: 0xff00ff, wireframe: false}),
		new THREE.MeshBasicMaterial({color: 0xff00ff, wireframe: false})
	);

	plight = new PointLight(0xffffff, 1, 600, 1, 0, 200, 0);

	dlight = new DirectionalLight(0xffffff, 0.5, 500, 200, 500);

	//dlight.add(new THREE.DirectionalLightHelper(dlight, 5));
	ball.add(new THREE.AxesHelper(100));
	ball.sphereMesh.add(new THREE.AxesHelper(100));

	scene.add(ball);
	scene.add(board);
	scene.add(cube);
	scene.add(plight);
	scene.add(dlight);
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
	// Update

	var delta = clock.getDelta();

	if (!flagPaused) {
		ball.rotate(delta, flagBallDirection);

		ball.toggleWireframe(flagWireframe);
		cube.toggleWireframe(flagWireframe);
		board.toggleWireframe(flagWireframe);

		ball.toggleShading(flagShaderCompute);
		cube.toggleShading(flagShaderCompute);
		board.toggleShading(flagShaderCompute);
	}

	if (flagPaused && flagRefresh) {
		controls.reset();
		ball.resetState(flagRefresh);
	}

	controls.update();

	// Display

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

	flagWireframe     = false;
	flagShaderCompute = true;
	flagBallDirection = -1;
	flagPaused        = false;
	flagRefresh       = false;

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
			flagWireframe = !flagWireframe;
			break;
		// Toggle shading
		case 'l':
		case 'L':
			flagShaderCompute = !flagShaderCompute;
			break;
		// Control ball movement
		case 'b':
		case 'B':
			flagBallDirection *= -1;
			break;
		// Pause
		case 's':
		case 'S':
			flagPaused = !flagPaused;
			break;
		// Refresh
		case 'r':
		case 'R':
			flagRefresh = !flagRefresh;
			break;
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
