// Main
//------------------------------------------------------------------------------

var CREATION = {
	createRenderer() {
		var renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.autoClear = false;
		document.body.appendChild(renderer.domElement);
		return renderer;
	},

	createScene() {
		return new THREE.Scene();
	},

	createBall(parent) {
		var ball = new RotatingBall(
			BALL_RADIUS, BALL_WSEGS, BALL_HSEGS,
			BALL_MATERIAL_PHONG,
			BALL_MATERIAL_BASIC,
			BALL_X, BALL_Y, BALL_Z,
			BALL_ROTATION_RADIUS,
			BALL_START_VELOCITY, BALL_ACCELERATION, BALL_MAX_VELOCITY,
			BALL_TEXTURE
		);
		parent.add(ball);
		return ball;
	},

	createBoard(parent) {
		var board = new Board(
			BOARD_WIDTH, BOARD_HEIGHT, BOARD_WSEGS, BOARD_HSEGS,
			BOARD_X, BOARD_Y, BOARD_Z,
			BOARD_MATERIAL_LAMBERT,
			BOARD_MATERIAL_BASIC,
			BOARD_TEXTURE
		);
		parent.add(board);
		return board;
	},

	createCube(parent) {
		var cube = new Cube(
			CUBE_WIDTH, CUBE_HEIGHT, CUBE_DEPTH,
			CUBE_WSEGS, CUBE_HSEGS, CUBE_DSEGS,
			CUBE_X, CUBE_Y, CUBE_Z,
			CUBE_MATERIAL_PHONG,
			CUBE_MATERIAL_BASIC,
			CUBE_TEXTURE,
			CUBE_BUMP_MAP,
		);
		parent.add(cube);
		return cube;
	},

	createPointLight(parent) {
		var plight = new PointLight(
			POINTLIGHT_COLOR,
			POINTLIGHT_INT,
			POINTLIGHT_DIST,
			POINTLIGHT_DECAY,
			POINTLIGHT_X,
			POINTLIGHT_Y,
			POINTLIGHT_Z
		);
		parent.add(plight);
		return plight;
	},
	
	createDirectionalLight(parent) {
		var dlight = new DirectionalLight(
			DLIGHT_COLOR,
			DLIGHT_INT,
			DLIGHT_X,
			DLIGHT_Y,
			DLIGHT_Z
		);
		parent.add(dlight);
		return dlight;
	},
	
	createPauseMessage(parent) {
		var pause = new PauseMessage(
			PAUSE_WIDTH,
			PAUSE_HEIGHT,
			PAUSE_WSEGS,
			PAUSE_HSEGS,
			PAUSE_MATERIAL,
			PAUSE_TEXTURE
		);
		parent.add(pause);
		return pause;
	},
	
	createControls(camera, rotationSpeed, autoRotation) {
		var controls = new THREE.OrbitControls(camera);
		controls.rotateSpeed = rotationSpeed;
		controls.autoRotate  = autoRotation;
		return controls;
	},
	
	createOrtographicCamera(lookAtPosition) {
		var cam = new THREE.OrthographicCamera(
			ORTO_CAM_L,
			ORTO_CAM_R,
			ORTO_CAM_T,
			ORTO_CAM_B,
			ORTO_CAM_N,
			ORTO_CAM_F);
	
		cam.position.set(ORTO_CAM_X, ORTO_CAM_Y, ORTO_CAM_Z);
		cam.lookAt(lookAtPosition);
	
		return cam;
	},
	
	createPerspectiveCamera(lookAtPosition) {
		var cam = new THREE.PerspectiveCamera(
			PERSP_CAM_FOVY,
			PERSP_CAM_AR,
			PERSP_CAM_N,
			PERSP_CAM_F);
	
		cam.position.set(PERSP_CAM_X, PERSP_CAM_Y, PERSP_CAM_Z);
		cam.lookAt(lookAtPosition);
	
		return cam;
	},
	
	createClock() {
		return new THREE.Clock();
	}
};

function scaleScene(scene, oldSize, newSize) {
	var mult = newSize / oldSize;
	scene.scale.set(mult, mult, mult);
}

//------------------------------------------------------------------------------

function animate(renderer, clock, GAME, flags) {
	// Update
	var delta = clock.getDelta();

	if (!flags.Paused) {
		GAME.ball.rotate(delta, flags.BallDirection);

		GAME.ball.toggleWireframe(flags.Wireframe);
		GAME.cube.toggleWireframe(flags.Wireframe);
		GAME.board.toggleWireframe(flags.Wireframe);

		GAME.ball.toggleShading(flags.ShaderCompute);
		GAME.cube.toggleShading(flags.ShaderCompute);
		GAME.board.toggleShading(flags.ShaderCompute);

		GAME.dlight.switchLight(flags.DirecLight);
		GAME.plight.switchLight(flags.PointLight);

		GAME.orbitControls.update();
	}

	if (flags.Refresh) {
		GAME.orbitControls.reset();
		GAME.ball.resetState();
		
		if (flags.BallDirection != -1)
			flags.BallDirection *= -1;
		
		flags.Refresh = !flags.Paused;
	}

	// Display
	if (flags.Paused) {
		renderer.setViewport(
			window.innerWidth/2 - PAUSE_WIDTH/2,
			PAUSE_HEIGHT/2,
			PAUSE_WIDTH,
			PAUSE_HEIGHT);
		renderer.render(GAME.pauseScene, GAME.camOrthographic);
	}
	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	renderer.render(GAME.gameScene, GAME.camPerspective);

	// Prepares next frame
	requestAnimationFrame(function() {
		animate(renderer, clock, GAME, flags)
	});
}

//------------------------------------------------------------------------------

function init() {

	// Register initial width and height

	var width  = window.innerWidth;
	var height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

	// Create game entities

	var renderer   = CREATION.createRenderer();
	var clock      = CREATION.createClock();
	var gameScene  = CREATION.createScene();
	var pauseScene = CREATION.createScene();

	var camPerspective  = CREATION.createPerspectiveCamera(gameScene.position);
	var camOrthographic = CREATION.createOrtographicCamera(pauseScene.position);
	var orbitControls   = CREATION.createControls(camPerspective, 0.25, true);

	var ball   = CREATION.createBall(gameScene);
	var board  = CREATION.createBoard(gameScene);
	var cube   = CREATION.createCube(gameScene);

	var plight = CREATION.createPointLight(gameScene);
	var dlight = CREATION.createDirectionalLight(gameScene);

	var pause  = CREATION.createPauseMessage(pauseScene);

	// Create Wrappers

	var GAME = {
		gameScene,
		pauseScene,
		camPerspective,
		camOrthographic,
		ball,
		board,
		cube,
		plight,
		dlight,
		orbitControls,
		pause
	};

	var flags = {
		Wireframe     : false,
		ShaderCompute : true,
		BallDirection : -1,
		Paused        : false,
		Refresh       : false,
		DirecLight    : true,
		PointLight    : true
	};

	// Start game

	renderer.render(gameScene, camPerspective);
	animate(renderer, clock, GAME, flags);

	// Event listeners

	window.addEventListener("keydown", function(e) {
		onKeyDown(e, flags);
	});

	window.addEventListener("resize", function() {
		onResize(renderer, camPerspective, window.innerWidth, window.innerHeight);
		scaleScene(gameScene, width, window.innerWidth);
	});
}

function onKeyDown(e, flags) {
	switch(e.key) {
		// Toggle directional light
		case 'd':
		case 'D':
			flags.DirecLight = !flags.DirecLight;
			break;
		// Toggle point light
		case 'p':
		case 'P':
			flags.PointLight = !flags.PointLight;
			break;
		// Toggle wireframe
		case 'w':
		case 'W':
			flags.Wireframe = !flags.Wireframe;
			break;
		// Toggle shading
		case 'l':
		case 'L':
			flags.ShaderCompute = !flags.ShaderCompute;
			break;
		// Control ball movement
		case 'b':
		case 'B':
			flags.BallDirection *= -1;
			break;
		// Pause
		case 's':
		case 'S':
			flags.Paused = !flags.Paused;
			break;
		// Refresh
		case 'r':
		case 'R':
			flags.Refresh = flags.Paused;
			break;
	}
}

function onResize(renderer, camera, newW, newH) {
	renderer.setSize(newW, newH);

	if (newW > 0 && newH > 0) {
		camera.aspect = newW / newH;
		camera.updateProjectionMatrix();
	}
}
