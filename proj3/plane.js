class Plane extends THREE.Object3D {

	constructor() {
		super()

	
		this.createFuselage();
		this.createStabilizers(0,0,PLANE_FUSELAGE_WIDTH,0);
		this.createStabilizers(Math.PI,0,0,0);
		this.createStabilizers(0,Math.PI/2,0,1);
		this.createWings(0,PLANE_FUSELAGE_WIDTH);
		this.createWings(Math.PI,0);

		this.add(new THREE.AxesHelper(15));

	}

	createStabilizers(Zrot,Yrot,TranslateSide,FlagTopStab){
		var material = new THREE.MeshBasicMaterial( { 
			color : 0x00cc00,
			side: THREE.DoubleSide,
			wireframe:true} );

		//create a triangular geometry
		var geometry = new THREE.Geometry();
		geometry.vertices.push( 
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3(  0, 0, 60 ),
			new THREE.Vector3(  PLANE_FUSELAGE_WIDTH/1.7, 0, 60 ),
			new THREE.Vector3(  PLANE_FUSELAGE_WIDTH/1.7, 0, 0 ),
			new THREE.Vector3( 0, PLANE_FUSELAGE_HEIGHT/7, 0 ),
			new THREE.Vector3( 0, PLANE_FUSELAGE_HEIGHT/7, 60 )
		);
		//add the face to the geometry's faces array
		geometry.faces.push( 
			new THREE.Face3(0,1,2),
			new THREE.Face3(1,2,3),
			new THREE.Face3(1,0,3),
			new THREE.Face3(4,5,2),
			new THREE.Face3(5,2,1),
			new THREE.Face3(3,2,4),
			new THREE.Face3(3,1,4),
			new THREE.Face3(5,0,4),

		);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.translateX(TranslateSide);
		if(FlagTopStab==0){mesh.translateY(PLANE_FUSELAGE_HEIGHT/1.8)}
		else{mesh.translateY(PLANE_FUSELAGE_HEIGHT)}
		if(FlagTopStab==1){
			mesh.translateZ(-PLANE_FUSELAGE_WIDTH/1.8)
			mesh.translateX(PLANE_FUSELAGE_WIDTH/2)
		}
		mesh.translateZ(-PLANE_FUSELAGE_WIDTH*1.2)
		mesh.rotateZ(Zrot)
		mesh.rotateZ(Yrot)
		this.add(mesh);
	}

	createFuselage(){
		var material = new THREE.MeshBasicMaterial( { 
			color : 0xff0000,
			side: THREE.DoubleSide,
			wireframe:true} );
		var geometry = new THREE.Geometry();
		geometry.vertices.push( 
			//back of plane
			new THREE.Vector3(0,0,-PLANE_FUSELAGE_WIDTH*1.8),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH,0,-PLANE_FUSELAGE_WIDTH*1.8),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH, PLANE_FUSELAGE_HEIGHT,-PLANE_FUSELAGE_WIDTH*1.8),
			new THREE.Vector3(0,PLANE_FUSELAGE_HEIGHT,-PLANE_FUSELAGE_WIDTH*1.8),
			//front of plane
			new THREE.Vector3(0,0,PLANE_FUSELAGE_WIDTH*4),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH,0,PLANE_FUSELAGE_WIDTH*4),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH,PLANE_FUSELAGE_HEIGHT,PLANE_FUSELAGE_WIDTH*2.7),
			new THREE.Vector3(0,PLANE_FUSELAGE_HEIGHT,PLANE_FUSELAGE_WIDTH*2.7),

		);
		geometry.faces.push( 

			//BACK FACES
			new THREE.Face3(0,1,2),
			new THREE.Face3(1,2,3),
			new THREE.Face3(1,0,3),
			//FRONT FACES
			new THREE.Face3(4,5,6),
			new THREE.Face3(5,6,7),
			new THREE.Face3(5,4,7),
			//BOTTOM
			new THREE.Face3(0,4,5),
			new THREE.Face3(0,5,1),
			//RIGHT SIDE
			new THREE.Face3(1,5,6),
			new THREE.Face3(1,2,6),
			//LEFT SIDE
			new THREE.Face3(0,3,4),
			new THREE.Face3(4,3,7),
			//TOP SIDE
			new THREE.Face3(2,6,7),
			new THREE.Face3(2,3,7)
		);
		this.add( new THREE.Mesh( geometry, material ) );
	}
	createWings(Zrot,TranslateSide){
		var material = new THREE.MeshBasicMaterial( { 
			color : 0xffff00,
			side: THREE.DoubleSide,
			wireframe:true} );
		var geometry = new THREE.Geometry();
		geometry.vertices.push(
			//FIRST SECTION OF THE WING
			new THREE.Vector3(0,0,PLANE_FUSELAGE_WIDTH*2),
			new THREE.Vector3(0,0,PLANE_FUSELAGE_WIDTH*3),
			new THREE.Vector3(0,PLANE_FUSELAGE_HEIGHT/5,PLANE_FUSELAGE_WIDTH*3),
			
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/1.5,0,PLANE_FUSELAGE_WIDTH*2),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/1.5,0,PLANE_FUSELAGE_WIDTH*3),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/1.5,PLANE_FUSELAGE_HEIGHT/5,PLANE_FUSELAGE_WIDTH*3),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/0.9,PLANE_FUSELAGE_HEIGHT/5,PLANE_FUSELAGE_WIDTH*2.9),//6
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/0.7,PLANE_FUSELAGE_HEIGHT/5,PLANE_FUSELAGE_WIDTH*2.7),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/0.5,PLANE_FUSELAGE_HEIGHT/5,PLANE_FUSELAGE_WIDTH*2.5),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/0.3,PLANE_FUSELAGE_HEIGHT/5,PLANE_FUSELAGE_WIDTH*2.1),

			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/0.9,0,PLANE_FUSELAGE_WIDTH*2.9),//10
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/0.7,0,PLANE_FUSELAGE_WIDTH*2.7),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/0.5,0,PLANE_FUSELAGE_WIDTH*2.5),
			new THREE.Vector3(PLANE_FUSELAGE_WIDTH/0.3,0,PLANE_FUSELAGE_WIDTH*2.1),//13


		);
		geometry.faces.push(
			new THREE.Face3(0,1,2),
			new THREE.Face3(0,1,3),
			new THREE.Face3(1,2,3),
			new THREE.Face3(0,2,5),
			new THREE.Face3(4,1,0),
			new THREE.Face3(3,4,5),
			new THREE.Face3(1,3,5),
			new THREE.Face3(3,5,6),
			new THREE.Face3(3,7,6),
			new THREE.Face3(3,7,8),
			new THREE.Face3(3,9,8),
			new THREE.Face3(5,6,4),
			new THREE.Face3(4,6,10),
			new THREE.Face3(7,6,11),
			new THREE.Face3(11,6,10),
			new THREE.Face3(4,6,10),
			new THREE.Face3(7,8,11),
			new THREE.Face3(12,8,11),
			new THREE.Face3(8,12,13),
			new THREE.Face3(8,9,13),
			new THREE.Face3(3,12,13),
			new THREE.Face3(3,11,12),
			new THREE.Face3(3,10,11)

		)
		var mesh = new THREE.Mesh(geometry, material);
		mesh.translateX(TranslateSide);
		mesh.translateY(PLANE_FUSELAGE_HEIGHT/1.8)
		mesh.translateZ(-PLANE_FUSELAGE_WIDTH*0.6)
		mesh.rotateZ(Zrot)
		this.add(mesh);

	}
}
