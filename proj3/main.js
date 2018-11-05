// Main

var scene;
var camera;
var clock;

var airplane

var rotateLeft;
var rotateRight;
var pitchUp;
var pitchDown;

var direclight;
var spotlights;

var shaderComputeFlag;
var diffuseMaterialFlag;

var wireframeFlag;
var normalHelperFlag;

var width;
var height;

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

	airplane = new Airplane(
		PLANE_WIDTH,
		PLANE_HEIGHT,
		PLANE_LENGTH,
		PLANE_WING_SPAN,
		PLANE_STABILIZER_WIDTH,
		PLANE_COCKPIT_LENGTH,
		PLANE_AFTERBURNER_HEIGHT,
		PLANE_WIDTH_SEGMENTS,
		PLANE_HEIGHT_SEGMENTS,
		PLANE_DEPTH_SEGMENTS);
	
	scene.add(airplane);

	diffuseMaterialFlag = false;
	wireframeFlag       = false;
	normalHelperFlag    = false;

	scene.add(new Ground(
		GROUND_WIDTH,
		GROUND_HEIGHT,
		GROUND_COLOR,
		GROUND_POS_X,
		GROUND_POS_Y,
		GROUND_POS_Z));

	addSpotlights();
}

function addSpotlights() {
	var wrot = 0;
	spotlights = new Array();

	for(let i = 0; i < SPOTLIGHT_NO; i++) {
		var spotLight = new Spotlight(
			SPOTLIGHT_X,
			SPOTLIGHT_Y,
			SPOTLIGHT_Z,
			SPOTLIGHT_CONE_RAD,
			SPOTLIGHT_CONE_HEIGHT,
			SPOTLIGHT_CONE_SEGS,
			SPOTLIGHT_BULB_RAD,
			SPOTLIGHT_BULB_SEGS,
			SPOTLIGHT_SELF_ROT,
			wrot);
		
		spotlights.push(spotLight);
		scene.add(spotLight);
		
		wrot += SPOTLIGHT_WORLD_ROT;
	}
}

function createPerspectiveCamera() {
	width  = window.innerWidth;
	height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

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

function createDirecLight() {
	direclight = new DirecLight(
		DLIGHT_X,
		DLIGHT_Y,
		DLIGHT_Z,
		DLIGHT_VISIB,
		DLIGHT_COLOR,
		DLIGHT_INT);

	scene.add(direclight);
	shaderComputeFlag = true;
}

function scaleScene(oldSize, newSize) {
	var mult = newSize / oldSize;
	scene.scale.set(mult, mult, mult);
}

//------------------------------------------------------------------------------

function rotatePlane(radialSpeed) {
	// Gets frametime
	var time = clock.getDelta()

	if (rotateLeft)
		airplane.rotateY(radialSpeed * time);
	if (rotateRight)
		airplane.rotateY(-radialSpeed * time);
	if (pitchUp)
		airplane.rotateX(-radialSpeed * time);
	if (pitchDown)
		airplane.rotateX(radialSpeed * time);
}

function animate() {

	rotatePlane(PLANE_ROTATION_VELOCITY);
	
	airplane.transmute(shaderComputeFlag, diffuseMaterialFlag);
	airplane.toggleNormals(normalHelperFlag);
	airplane.toggleWireframe(wireframeFlag);
	direclight.switchLight();

	toggleSpotlights();

	render(camera);
	requestAnimationFrame(animate);
}

function toggleSpotlights() {
	spotlights.forEach(spot => {
		spot.switchLight();
	});
}

//------------------------------------------------------------------------------

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createPerspectiveCamera();
	createDirecLight();
	createClock();

	//render(camera);

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup",   onKeyUp);
	window.addEventListener("resize",  onResize);
}

function onKeyDown(e) {
	switch(e.key) {
		case 'ArrowLeft':
			rotateLeft = true;
			break;
		case 'ArrowRight':
			rotateRight = true;
			break;
		case 'ArrowUp':
			pitchUp = true;
			break;
		case 'ArrowDown':
			pitchDown = true;
			break;
		case 'a':
		case 'A':
			wireframeFlag = !wireframeFlag;
			break;
		case 'e':
		case 'E':
			normalHelperFlag = !normalHelperFlag;
			break;
		case 'n':
		case 'N':
			direclight.lit = !direclight.lit;
			break;
		case 'l':
		case 'L':
			shaderComputeFlag = !shaderComputeFlag;
			break;
		case 'g':
		case 'G':
			diffuseMaterialFlag = !diffuseMaterialFlag;
			break;
		case '1':
			spotlights[0].lit = !spotlights[0].lit;
			break;
		case '2':
			spotlights[1].lit = !spotlights[1].lit;
			break;
		case '3':
			spotlights[2].lit = !spotlights[2].lit;
			break;
		case '4':
			spotlights[3].lit = !spotlights[3].lit;
	}

}

function onKeyUp(e) {
	switch(e.key) {
		case 'ArrowLeft':
			rotateLeft = false;
			break;
		case 'ArrowRight':
			rotateRight = false;
			break;
		case 'ArrowUp':
			pitchUp = false;
			break;
		case 'ArrowDown':
			pitchDown = false;
			break;
	}
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerWidth > 0 && window.innerHeight > 0) {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		scaleScene(height*width, window.innerHeight*window.innerWidth);
	}
}
