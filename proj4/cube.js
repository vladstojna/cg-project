/* Custom cube class */

class Cube extends GameEntity {

	/* constructor */
	constructor(width, height, depth,
			widthSegments, heightSegments, depthSegments,
			x=0, y=0, z=0,
			shadedMaterial, basicMaterial,
			texture, bumpmap) {

		super(shadedMaterial, basicMaterial);

		var tex;
		var bmp;

		this.position.set(x, y, z);

		this.cubeMesh = new THREE.Mesh(
			new THREE.BoxGeometry(
				width,
				height,
				depth,
				widthSegments,
				heightSegments,
				depthSegments),
			this.currentMaterial);

		tex = new THREE.TextureLoader().load(texture);
		this.currentMaterial.map = tex;
		this.otherMaterial.map   = tex;

		bmp = new THREE.TextureLoader().load(bumpmap);
		this.currentMaterial.bumpMap = bmp;

		this.updateUVs(width);

		this.add(this.cubeMesh);

	}
	
	updateUVs(side) {
		var geometry = this.cubeMesh.geometry;

		// Clears any previous UV mapping
		geometry.faceVertexUvs[0] = [];

		// Need to define a UV map for every face
		geometry.faces.forEach(function(face) {
			var uvs = [];
	
			var ids = ['a', 'b', 'c'],
			faceN = face.normal.x+'.'+face.normal.y+'.'+face.normal.z;
			
			for (let i = 0; i < ids.length; i++) {

				// Get current vertex position
				var vertexIndex = face[ids[i]];
				var vertex = geometry.vertices[vertexIndex];

				var uvX, uvY;
				var dx, dy;

				// Face order in the image:
				//			East
				//	North	Down	South	Up
				//			West
				switch(faceN) {
					// West
					case '1.0.0':
						uvX = vertex.z;
						uvY = vertex.y;
						dx  = 1;
						dy  = 0;
						break;

					// East
					case '-1.0.0':
						uvX = vertex.z;
						uvY = vertex.y;
						dx  = 1;
						dy  = 2;
						break;

					// Up
					case '0.1.0':
						uvX = vertex.x;
						uvY = vertex.z;
						dx  = 3;
						dy  = 1;
						break;
					
					// Down
					case '0.-1.0':
						uvX = vertex.x;
						uvY = vertex.z;
						dx  = 1;
						dy  = 1;
						break;

					// South
					case '0.0.1':
						uvX = vertex.x;
						uvY = vertex.y;
						dx  = 2;
						dy  = 1;
						break;
					
					// North
					case '0.0.-1':
						uvX = vertex.x;
						uvY = vertex.y;
						dx  = 0;
						dy  = 1;
				}

				// Coordinates range should be [0, 1]
				uvX += side/2;
				uvX = uvX/side

				uvY += side/2;
				uvY = uvY/side;

				// uvX and uvY need to be adjusted to the part of the picture that contains wanted tile
				uvX = (uvX + dx)/4;
				uvY = (uvY + dy)/3;

				uvs.push(new THREE.Vector2(uvX, uvY));
			}

			geometry.faceVertexUvs[0].push(uvs);

		});

		geometry.uvsNeedUpdate = true;
	}
}
