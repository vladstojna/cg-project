/* Custom geometry classes */

/* Generic plane geometry */
class PlaneGeometry extends THREE.Geometry {

	constructor(u, v, w, width, height, depth, udir=1, vdir=1, widthSegments=1, heightSegments=1) {
		super();

		var wPolySize = width / widthSegments;
		var hPolySize = height/ heightSegments;

		// Constant position in w axis
		var posW = depth/2;

		// Push line
		for (let hp = 0; hp <= heightSegments; hp++) {
			// Calculate vertex position on v axis
			var posV = hp * hPolySize - height/2;
			// Push column
			for (let wp = 0; wp <= widthSegments; wp++) {
				// Calculate vertex position on u axis
				var posU = wp * wPolySize - width/2;
				var vector = new THREE.Vector3();
				// Set vertex coordinates appropriately
				vector[u] = posU * udir;
				vector[v] = posV * vdir;
				vector[w] = posW;
				// Push vertex
				this.vertices.push(vector);
			}
		}

		/* Push faces */
		/* Push line */
		for (let h = 0; h < heightSegments; h++) {
			/* Push column */
			for (let w = 0; w < widthSegments; w++) {
				this.faces.push(
					new THREE.Face3(
						w   + h*(widthSegments+1),
						w+1 + h*(widthSegments+1),
						w+widthSegments+1 + h*(widthSegments+1)),
					new THREE.Face3(
						w+1 + h*(widthSegments+1),
						w+widthSegments+2 + h*(widthSegments+1),
						w+widthSegments+1 + h*(widthSegments+1))
				);
			}
		}
		this.computeFaceNormals();
		this.computeVertexNormals();
	}
}

/* Generic triangle geometry */
class TriangleGeometry extends THREE.Geometry {
	constructor(a, b, c) {
		super();

		/* Push three vertices */
		this.vertices.push(a, b, c);
		/* Push single triangular face */
		this.faces.push(new THREE.Face3(0, 1, 2));
		/* Compute normals */
		this.computeFaceNormals();
		this.computeVertexNormals();
	}
}

/* Generic box geometry */
class BoxGeometry extends THREE.Geometry {

	constructor(width, height, depth, widthSegments=1, heightSegments=1, depthSegments=1) {
		super();

		/* Front face */
		this.mergeMesh(
			new THREE.Mesh(
				new PlaneGeometry('x', 'y', 'z', width, height, depth, 1, 1, widthSegments, heightSegments)));
		/* Back face */
		this.mergeMesh(
			new THREE.Mesh(
				new PlaneGeometry('x', 'y', 'z', width, height, -depth, 1, -1, widthSegments, heightSegments))
		);
		/* Top face */
		this.mergeMesh(
			new THREE.Mesh(
				new PlaneGeometry('x', 'z', 'y', width, depth, height, -1, 1, widthSegments, depthSegments))
		);
		/* Bottom face */
		this.mergeMesh(
			new THREE.Mesh(
				new PlaneGeometry('x', 'z', 'y', width, depth, -height, 1, 1, widthSegments, depthSegments))
		);
		/* Left face */
		this.mergeMesh(
			new THREE.Mesh(
				new PlaneGeometry('z', 'y', 'x', depth, height, -width, 1, 1, depthSegments, heightSegments))
		);
		/* Right face */
		this.mergeMesh(
			new THREE.Mesh(
				new PlaneGeometry('z', 'y', 'x', depth, height, width, -1, 1, depthSegments, heightSegments))
		);

		this.mergeVertices();
	}
}

/* Generic right triangular prism geometry */
class RightTriangularPrismGeometry extends THREE.Geometry {
	constructor(width, height, depth, widthSegments=1, heightSegments=1, depthSegments=1) {
		super();

		/* Back face */
		this.mergeMesh(
			new THREE.Mesh(
				new PlaneGeometry('x', 'y', 'z', width, height, -depth, 1, -1, widthSegments, heightSegments)));

		/* Bottom face */
		this.mergeMesh(
			new THREE.Mesh(
				new PlaneGeometry('x', 'z', 'y', width, depth, -height, 1, 1, widthSegments, depthSegments))
		);
		/* Windshield */
		var wshieldLength = Math.sqrt(depth * depth + height * height)
		var wshield =
			new PlaneGeometry('x', 'z', 'y', width, wshieldLength, 0, -1, 1, widthSegments, depthSegments);
		wshield.rotateX(Math.asin(height / wshieldLength));
		this.mergeMesh(
			new THREE.Mesh(wshield));

		/* Left side TriangleGeometry */
		this.mergeMesh(
			new THREE.Mesh(
				new TriangleGeometry(
					new THREE.Vector3(-width/2, -height/2, -depth/2),
					new THREE.Vector3(-width/2, -height/2,  depth/2),
					new THREE.Vector3(-width/2,  height/2, -depth/2))));

		/* Right side TriangleGeometry */
		this.mergeMesh(
			new THREE.Mesh(
				new TriangleGeometry(
					new THREE.Vector3(width/2, -height/2, -depth/2),
					new THREE.Vector3(width/2,  height/2, -depth/2),
					new THREE.Vector3(width/2, -height/2,  depth/2))));

		this.mergeVertices();
	}
}
