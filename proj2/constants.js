// List of constants

/* Field constants
 * FIELD_WIDTH  - field width
 * FIELD_ASPEC  - field aspect ratio
 * FIELD_GCOLOR - field ground color
 * FIELD_WCOLOR - field wall color
 * FIELD_WREL   - wall height factor
 */
const FIELD_WIDTH  = 300;
const FIELD_ASPECT = 2;
const FIELD_GCOLOR = 0x404040;
const FIELD_WCOLOR = 0x505050;
const FIELD_WREL   = 10;

/* Ball constants
 * BALL_NUM     - number of balls to generate
 * BALL_COLOR   - ball color
 * BALL_AXIS_SZ - axisHelper size
 * BALL_MAXVEL  - maximum initial velocity
 * BALL_MINVEL  - minimum initial velocity
 */
const BALL_NUM     = 10;
const BALL_COLOR   = 0xFFFF00;
const BALL_AXIS_SZ = 50;
const BALL_MAXVEL  = 150;
const BALL_MINVEL  = 50;

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
const ORTO_CAM_X = 0;
const ORTO_CAM_Y = 500;
const ORTO_CAM_Z = 0;

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

/* Chase camera constants
 * CHASE_CAM_FOVY - chase camera vertical fov
 * CHASE_CAM_AR   - chase camera aspect ratio
 * CHASE_CAM_N    - chase camera near
 * CHASE_CAM_F    - chase camera far
 */
const CHASE_CAM_FOVY = 90;
const CHASE_CAM_AR   = window.innerWidth / window.innerHeight;
const CHASE_CAM_N    = 1;
const CHASE_CAM_F    = 1000;

/* Scene refresh constants
 * REFR_TIME - interval of ball velocity refresh
 * REFR_INC  - ball velocity increment per refresh
 */
const REFR_TIME = 10 * 1000; // 10 seconds
const REFR_INC  = 10;
