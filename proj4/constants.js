// List of constants

/* Pause screen constants */
/* --------------------------------------------------------------- */

const PAUSE_WIDTH  = 512;
const PAUSE_HEIGHT = 128;
const PAUSE_WSEGS  = 1;
const PAUSE_HSEGS  = 1;

const PAUSE_MATERIAL = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	wireframe: false});

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
const ORTO_CAM_L = PAUSE_WIDTH  / -2;
const ORTO_CAM_R = PAUSE_WIDTH  /  2;
const ORTO_CAM_T = PAUSE_HEIGHT /  2;
const ORTO_CAM_B = PAUSE_HEIGHT / -2;
const ORTO_CAM_N = 1;
const ORTO_CAM_F = 10;
const ORTO_CAM_X = 0;
const ORTO_CAM_Y = 0;
const ORTO_CAM_Z = 1;

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
const PERSP_CAM_F    = 5000;
const PERSP_CAM_X    = 500;
const PERSP_CAM_Y    = 500;
const PERSP_CAM_Z    = 500;

/* Game entity constants */
/* --------------------------------------------------------------- */

const BALL_RADIUS = 50;
const BALL_WSEGS  = 24;
const BALL_HSEGS  = 24;

const BALL_X = 0;
const BALL_Y = BALL_RADIUS;
const BALL_Z = 0;

const BALL_ROTATION_RADIUS = 300;
const BALL_START_VELOCITY  = 0;
const BALL_ACCELERATION    = Math.PI/180;
const BALL_MAX_VELOCITY    = Math.PI;

const BALL_MATERIAL_PHONG = new THREE.MeshPhongMaterial({
	specular: 0xf7f3d7, // light yellow
	shininess: 75,
	wireframe: false});

const BALL_MATERIAL_BASIC = new THREE.MeshBasicMaterial({
	wireframe: false});

/* --------------------------------------------------------------- */

const BOARD_WIDTH  = 1000;
const BOARD_HEIGHT = BOARD_WIDTH;
const BOARD_WSEGS  = 16;
const BOARD_HSEGS  = 16;

const BOARD_X = 0;
const BOARD_Y = 0;
const BOARD_Z = 0;

const BOARD_MATERIAL_LAMBERT = new THREE.MeshLambertMaterial({
	wireframe: false});

const BOARD_MATERIAL_BASIC = new THREE.MeshBasicMaterial({
	wireframe: false});

/* --------------------------------------------------------------- */

const CUBE_WIDTH  = 100;
const CUBE_HEIGHT = CUBE_WIDTH;
const CUBE_DEPTH  = CUBE_WIDTH;
const CUBE_WSEGS  = 8;
const CUBE_HSEGS  = 8;
const CUBE_DSEGS  = 8;

const CUBE_X = 0;
const CUBE_Y = CUBE_HEIGHT / 2;
const CUBE_Z = 0;

const CUBE_MATERIAL_PHONG = new THREE.MeshPhongMaterial({
	specular: 0xf2f2f2, // light grey
	shininess: 5,
	wireframe: false});

const CUBE_MATERIAL_BASIC = new THREE.MeshBasicMaterial({
	wireframe: false});

/* Light source constants */
/* --------------------------------------------------------------- */

const POINTLIGHT_COLOR = 0xffffff;
const POINTLIGHT_INT   = 1;
const POINTLIGHT_DIST  = 600;
const POINTLIGHT_DECAY = 1;

const POINTLIGHT_X = 0;
const POINTLIGHT_Y = 200;
const POINTLIGHT_Z = 0;

/* --------------------------------------------------------------- */

const DLIGHT_COLOR = 0xffffff;
const DLIGHT_INT   = 0.5;

const DLIGHT_X = 500;
const DLIGHT_Y = 200;
const DLIGHT_Z = 500;

/* Texture paths */
/* --------------------------------------------------------------- */

const BALL_TEXTURE  = "textures/billiard_ball_texture.jpg";
const BOARD_TEXTURE = "textures/chessboard_texture_wood.png";
const CUBE_TEXTURE  = "textures/rubiks_cube_texture.png";
const CUBE_BUMP_MAP = "textures/rubiks_cube_bump_map.png";
const PAUSE_TEXTURE = "textures/pause_text.png"
