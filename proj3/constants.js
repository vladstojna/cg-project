// List of constants

/* Ortographic camera constants constants
 * ORTO_CAM_L - ortographic camera left
 * ORTO_CAM_R - ortographic camera right
 * ORTO_CAM_T - ortographic camera top
 * ORTO_CAM_B - ortographic camera bottom
 * ORTO_CAM_N - ortographic camera near
 * ORTO_CAM_F - ortographic camera far
 * ORTO_CAM_X - ortographic camera x position
 * ORTO_CAM_Y - ortographic camera y position
 * ORTO_CAM_Z - ortographic camera z position
 */
const ORTO_CAM_L = window.innerWidth  / -2;
const ORTO_CAM_R = window.innerWidth  /  2;
const ORTO_CAM_T = window.innerHeight /  2;
const ORTO_CAM_B = window.innerHeight / -2;
const ORTO_CAM_N = 10;
const ORTO_CAM_F = 5000;
const ORTO_CAM_X = 500;
const ORTO_CAM_Y = 600;
const ORTO_CAM_Z = 500;

/* Perspective camera constants constants
 * PERSP_CAM_FOVY - perspective camera vertical fov
 * PERSP_CAM_AR   - perspective camera aspect ratio
 * PERSP_CAM_N    - perspective camera near
 * PERSP_CAM_F    - perspective camera far
 * PERSP_CAM_X    - perspective camera x position
 * PERSP_CAM_Y    - perspective camera y position
 * PERSP_CAM_Z    - perspective camera z position
 */
const PERSP_CAM_FOVY = 90;
const PERSP_CAM_AR   = window.innerWidth / window.innerHeight;
const PERSP_CAM_N    = 1;
const PERSP_CAM_F    = 2000;
const PERSP_CAM_X    = 400;
const PERSP_CAM_Y    = 500;
const PERSP_CAM_Z    = 500;

/* Airplane constants */
const PLANE_WIDTH  = 75;
const PLANE_HEIGHT = 50;
const PLANE_LENGTH = 300;

const PLANE_WING_WIDTH_DIV  = 2;
const PLANE_WING_WIDTH      = PLANE_LENGTH / PLANE_WING_WIDTH_DIV;
const PLANE_WING_HEIGHT_DIV = 10;
const PLANE_WING_HEIGHT     = PLANE_HEIGHT / PLANE_WING_HEIGHT_DIV;
const PLANE_WING_SPAN       = PLANE_LENGTH;

const PLANE_STABILIZER_WIDTH  = PLANE_WIDTH  / 2;
const PLANE_STABILIZER_HEIGHT = PLANE_HEIGHT / 10;
const PLANE_STABILIZER_LENGTH = PLANE_HEIGHT / 2;

const PLANE_COCKPIT_WIDTH  = PLANE_WIDTH;
const PLANE_COCKPIT_HEIGHT = PLANE_HEIGHT;
const PLANE_COCKPIT_LENGTH = PLANE_LENGTH / 4;

const PLANE_AFTERBURNER_WIDTH  = PLANE_WIDTH  / 2;
const PLANE_AFTERBURNER_HEIGHT = PLANE_HEIGHT / 2;
const PLANE_AFTERBURNER_LENGTH = PLANE_LENGTH / 16;

const PLANE_WIDTH_SEGMENTS  = 1;
const PLANE_HEIGHT_SEGMENTS = 1;
const PLANE_DEPTH_SEGMENTS  = 1;

// Airplane materials
const PLANE_MATERIAL_BASIC =
	new THREE.MeshBasicMaterial({color: 0xf5f6f6, wireframe: false});

const PLANE_MATERIAL_LAMBERT =
	new THREE.MeshLambertMaterial({color: 0xf5f6f6, wireframe: false});

const PLANE_MATERIAL_PHONG =
	new THREE.MeshPhongMaterial({color: 0xf5f6f6, 
		specular: 0xe8e9e9, 
		shininess: 50, 
		wireframe: false});

const WING_MATERIAL_BASIC =
	new THREE.MeshBasicMaterial({color: 0xd0d1d1, wireframe: false});

const WING_MATERIAL_LAMBERT =
	new THREE.MeshLambertMaterial({color: 0xd0d1d1, wireframe: false});

const WING_MATERIAL_PHONG =
	new THREE.MeshPhongMaterial({color: 0xc0c1c1,
		specular: 0xb3b4b4,
		shininess: 15,
		wireframe: false});

const COCKPIT_MATERIAL_BASIC =
	new THREE.MeshBasicMaterial({color: 0x737373, wireframe: false});

const COCKPIT_MATERIAL_LAMBERT =
	new THREE.MeshLambertMaterial({color: 0x737373, 
		transparent: true,
		opacity: 0.5,
		wireframe: false});

const COCKPIT_MATERIAL_PHONG =
	new THREE.MeshPhongMaterial({color: 0x737373,
		specular: 0x636363,
		shininess: 10,
		transparent: true,
		opacity: 0.5,
		wireframe: false});

// Spotlight constants
const SPOT_X = PLANE_LENGTH*3/2;
const SPOT_Y = PLANE_LENGTH*3/2;
const SPOT_Z = PLANE_LENGTH*3/2;
const SPOT_NO = 4;
const SPOT_ROT = -Math.PI/4;
const SPOT_SCENE_ROT = Math.PI/(SPOT_NO/2);
const SPOT_SEGS = 16;
const SPOT_HEIGHT = PLANE_HEIGHT + 20;
const SPOT_RAD = PLANE_HEIGHT/2;
const SPOT_SPHERE_RAD = SPOT_RAD*2/3;
const SPOT_SPHERE_SEGS = 16;