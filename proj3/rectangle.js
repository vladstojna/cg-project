/* Custom rectangle geometry */

class Rectangle {

	constructor(width, height, widthSegments=1, heightSegments=1) {
		this.material = new THREE.MeshStandardMaterial({color: 0xffffff});
		this.geometry = new THREE.Geometry();

		var wPolySize = width / widthSegments;
		var hPolySize = height/ heightSegments;

		/* Push vertices */
		var posX = 0;
		var posY = 0;
		/* Push line */
		for (let h = 0; h <= heightSegments; h++) {
			/* Push column */
			for (let w = 0; w <= widthSegments; w++) {
				this.geometry.vertices.push(
					new THREE.Vector3(posX, posY, 0)
				);
				posX += wPolySize;
			}
			posY += hPolySize;
			posX = 0;
		}

		/* Push faces */
		/* Push line */
		for (let h = 0; h < heightSegments; h++) {
			/* Push column */
			for (let w = 0; w < widthSegments; w++) {
				this.geometry.faces.push(
					new THREE.Face3(
						w   + h*(widthSegments+1),
						w+1 + h*(widthSegments+1),
						w+widthSegments+1 + h*(widthSegments+1)),
					new THREE.Face3(
						w+1 + h*(widthSegments+1),
						w+widthSegments+2 + h*(widthSegments+1),
						w+widthSegments+1 + h*(widthSegments+1)),
				);
			}
		}

		this.geometry.computeFaceNormals();
		this.geometry.computeVertexNormals();
	}

}
