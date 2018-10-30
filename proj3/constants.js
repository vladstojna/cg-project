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
const PERSP_CAM_F    = 1000;
const PERSP_CAM_X    = 400;
const PERSP_CAM_Y    = 500;
const PERSP_CAM_Z    = 0;

/* Plane size constant*/
const PLANE_FUSELAGE_HEIGHT = 90;
const PLANE_FUSELAGE_WIDTH = 90;

const Framewire=true;
