// Main

var scene;

var camPerspective;
var camOrthographic;
var controls;

var clock;

var width;
var height;

var ball;
var board;
var cube;
var plight;
var dlight;
var pause;

var flagBallDirection;
var flagWireframe;
var flagShaderCompute;
var flagVisibility;
var flagPaused;
var flagRefresh;

//------------------------------------------------------------------------------

function render(camera) {
	renderer.render(scene, camera);
}

//------------------------------------------------------------------------------

function createRenderer() {
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
	//renderer.setClearColor(0x0, 1);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.autoClear = false;
	document.body.appendChild(renderer.domElement);
}

function createScene() {
	scene = new THREE.Scene();

	ball = new RotatingBall(
		BALL_RADIUS, BALL_WSEGS, BALL_HSEGS,
		BALL_MATERIAL_PHONG,
		BALL_MATERIAL_BASIC,
		BALL_X, BALL_Y, BALL_Z,
		BALL_ROTATION_RADIUS,
		BALL_START_VELOCITY, BALL_ACCELERATION, BALL_MAX_VELOCITY,
		BALL_TEXTURE
	);

	board = new Board(
		BOARD_WIDTH, BOARD_HEIGHT, BOARD_WSEGS, BOARD_HSEGS,
		BOARD_X, BOARD_Y, BOARD_Z,
		BOARD_MATERIAL_LAMBERT,
		BOARD_MATERIAL_BASIC,
		BOARD_TEXTURE
	);

	cube = new Cube(
		CUBE_WIDTH, CUBE_HEIGHT, CUBE_DEPTH, CUBE_WSEGS, CUBE_HSEGS, CUBE_DSEGS,
		CUBE_X, CUBE_Y, CUBE_Z,
		CUBE_MATERIAL_PHONG,
		CUBE_MATERIAL_BASIC,
		CUBE_TEXTURE,
		CUBE_BUMP_MAP,
	);

	plight = new PointLight(
		POINTLIGHT_COLOR,
		POINTLIGHT_INT,
		POINTLIGHT_DIST,
		POINTLIGHT_DECAY,
		POINTLIGHT_X,
		POINTLIGHT_Y,
		POINTLIGHT_Z
	);

	dlight = new DirectionalLight(
		DLIGHT_COLOR,
		DLIGHT_INT,
		DLIGHT_X,
		DLIGHT_Y,
		DLIGHT_Z
	);
	
	pause = new PauseMessage(
		PAUSE_WIDTH,
		PAUSE_HEIGHT,
		PAUSE_WSEGS,
		PAUSE_HSEGS,
		PAUSE_MATERIAL,
		PAUSE_TEXTURE
	);

	//dlight.add(new THREE.DirectionalLightHelper(dlight, 5));
	//ball.add(new THREE.AxesHelper(100));
	//ball.sphereMesh.add(new THREE.AxesHelper(100));

	scene.add(ball);
	scene.add(board);
	scene.add(cube);
	scene.add(plight);
	scene.add(dlight);
	scene.add(pause);
}

function createControls() {
	controls = new THREE.OrbitControls(camPerspective);
	controls.rotateSpeed = 0.5;
	controls.autoRotate = true;
}

function createOrtographicCamera() {
	width  = window.innerWidth;
	height = window.innerHeight;

	camOrthographic = new THREE.OrthographicCamera(
		ORTO_CAM_L,
		ORTO_CAM_R,
		ORTO_CAM_T,
		ORTO_CAM_B,
		ORTO_CAM_N,
		ORTO_CAM_F);

	camOrthographic.position.set(ORTO_CAM_X, ORTO_CAM_Y, ORTO_CAM_Z);
	camOrthographic.lookAt(pause.position);
}

function createPerspectiveCamera() {
	width  = window.innerWidth;
	height = window.innerHeight;

	camPerspective = new THREE.PerspectiveCamera(
		PERSP_CAM_FOVY,
		PERSP_CAM_AR,
		PERSP_CAM_N,
		PERSP_CAM_F);

	camPerspective.position.set(PERSP_CAM_X, PERSP_CAM_Y, PERSP_CAM_Z);
	camPerspective.lookAt(scene.position);
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

		controls.update();
	}

	if (flagPaused && flagRefresh) {
		controls.reset();
		ball.resetState();
		
		if (flagBallDirection != -1)
			flagBallDirection *= -1;
		
		flagRefresh = !flagRefresh;
	}
	
	pause.toggleVisibility(flagVisibility);

	// Display
	if (flagPaused)
		render(camOrthographic);
	else
		render(camPerspective);

	requestAnimationFrame(animate);
}

//------------------------------------------------------------------------------

function init() {

	console.log("Width:", window.innerWidth);
	console.log("Height:", window.innerHeight);

	createRenderer();
	createScene();
	createOrtographicCamera();
	createPerspectiveCamera();
	createControls();
	createClock();

	flagWireframe     = false;
	flagShaderCompute = true;
	flagBallDirection = -1;
	flagVisibility    = false;
	flagPaused        = false;
	flagRefresh       = false;

	render(camPerspective);

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
			flagPaused     = !flagPaused;
			flagVisibility = !flagVisibility;
			break;
		// Refresh
		case 'r':
		case 'R':
			if (flagPaused) flagRefresh = !flagRefresh;
			break;
	}
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerWidth > 0 && window.innerHeight > 0) {

		camPerspective.aspect = window.innerWidth / window.innerHeight;
		camPerspective.updateProjectionMatrix();

		scaleScene(width, window.innerWidth);
	}
}
