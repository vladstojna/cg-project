// List of constants

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

/* Ground constants */
const GROUND_WIDTH  = 4000;
const GROUND_HEIGHT = 4000;
const GROUND_COLOR  = 0x0e2d11 // dark green
const GROUND_POS_X  = 0;
const GROUND_POS_Y  = -200;
const GROUND_POS_Z  = 0;

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

const PLANE_ROTATION_VELOCITY = Math.PI/2;

// Airplane materials
const PLANE_MATERIAL_BODY_BASIC =
	new THREE.MeshBasicMaterial({color: 0xf5f6f6, wireframe: false});

const PLANE_MATERIAL_BODY_LAMBERT =
	new THREE.MeshLambertMaterial({color: 0xf5f6f6, wireframe: false});

const PLANE_MATERIAL_BODY_PHONG =
	new THREE.MeshPhongMaterial({color: 0xf5f6f6, 
		specular: 0xe8e9e9,
		shininess: 30,
		wireframe: false});

const PLANE_MATERIAL_WING_BASIC =
	new THREE.MeshBasicMaterial({color: 0xc0c1c1, wireframe: false});

const PLANE_MATERIAL_WING_LAMBERT =
	new THREE.MeshLambertMaterial({color: 0xc0c1c1, wireframe: false});

const PLANE_MATERIAL_WING_PHONG =
	new THREE.MeshPhongMaterial({color: 0xc0c1c1,
		specular: 0xb3b4b4,
		shininess: 15,
		wireframe: false});

const PLANE_MATERIAL_COCKPIT_BASIC =
	new THREE.MeshBasicMaterial({color: 0x737373, wireframe: false});

const PLANE_MATERIAL_COCKPIT_LAMBERT =
	new THREE.MeshLambertMaterial({color: 0x737373, 
		transparent: true,
		opacity: 0.5,
		wireframe: false});

const PLANE_MATERIAL_COCKPIT_PHONG =
	new THREE.MeshPhongMaterial({color: 0x737373,
		specular: 0x636363,
		shininess: 10,
		transparent: true,
		opacity: 0.5,
		wireframe: false});

const PLANE_MATERIAL_AFTERBURNER_BASIC =
	new THREE.MeshBasicMaterial({color: 0x737373, wireframe: false});

const PLANE_MATERIAL_AFTERBURNER_LAMBERT =
	new THREE.MeshLambertMaterial({color: 0x737373, wireframe: false});

const PLANE_MATERIAL_AFTERBURNER_PHONG =
	new THREE.MeshPhongMaterial({color: 0x000000,
		specular: 0xa5a5a5,
		shininess: 3,
		wireframe: false});

const PLANE_MATERIAL_AB_TIP_BASIC =
	new THREE.MeshBasicMaterial({color: 0xfbcf9a, wireframe: false});

const PLANE_MATERIAL_AB_TIP_LAMBERT =
	new THREE.MeshLambertMaterial({color: 0xfbcf9a, wireframe: false});

const PLANE_MATERIAL_AB_TIP_PHONG =
	new THREE.MeshPhongMaterial({color: 0xf8b83c,
		specular: 0xb86f3c,
		shininess: 1,
		wireframe: false});

// Spotlight constants
const SPOTLIGHT_X = PLANE_LENGTH*3/2;
const SPOTLIGHT_Y = PLANE_LENGTH*3/2;
const SPOTLIGHT_Z = PLANE_LENGTH*3/2;

const SPOTLIGHT_NO          = 4;
const SPOTLIGHT_SELF_ROT    = Math.PI/4;
const SPOTLIGHT_WORLD_ROT   = Math.PI/(SPOTLIGHT_NO/2);

const SPOTLIGHT_CONE_SEGS   = 16;
const SPOTLIGHT_CONE_HEIGHT = PLANE_HEIGHT + 20;
const SPOTLIGHT_CONE_RAD    = PLANE_HEIGHT/2;
const SPOTLIGHT_CONE_COLOR  = 0x737373;

const SPOTLIGHT_BULB_RAD     = SPOTLIGHT_CONE_RAD*2/3;
const SPOTLIGHT_BULB_SEGS    = 16;
const SPOTLIGHT_BULB_COLOR_E = 0xfff1e0;
const SPOTLIGHT_BULB_COLOR_D = 0x535353;
const SPOTLIGHT_BULB_OPAC    = 0.7;

const SPOTLIGHT_LIGHT_INT   = 0.5;
const SPOTLIGHT_LIGHT_DIST  = 0; // no distance limit
const SPOTLIGHT_LIGHT_ANGLE = Math.PI/10;
const SPOTLIGHT_LIGHT_PENBR = 0.5;
const SPOTLIGHT_LIGHT_DECAY = 2;

const SPOTLIGHT_START_STATE = true;

// Directional light constants
const DLIGHT_X = 200;
const DLIGHT_Y = 250;
const DLIGHT_Z = 200;

const DLIGHT_VISIB = true;
const DLIGHT_COLOR = 0xffffff;
const DLIGHT_INT   = 0.5;
