/* Custom geometry classes */

/* Generic plane geometry */
class PlaneGeometry extends THREE.Geometry {

	constructor(u, v, w, width, height, depth, udir=1, vdir=1, widthSegments=1, heightSegments=1) {
		super();

		var wPolySize = width  / widthSegments;
		var hPolySize = height / heightSegments;

		// Constant position in w axis
		var posW = depth/2;

		var posU;
		var posV;

		var hOffset;

		var vector;

		/* Push vertices */
		for (let hp = 0; hp <= heightSegments; hp++) {
			// Calculate vertex position on v axis
			posV = hp * hPolySize - height/2;
			for (let wp = 0; wp <= widthSegments; wp++) {
				// Calculate vertex position on u axis
				posU = wp * wPolySize - width/2;
				vector = new THREE.Vector3();
				// Set vertex coordinates appropriately
				vector[u] = posU * udir;
				vector[v] = posV * vdir;
				vector[w] = posW;
				// Push vertex
				this.vertices.push(vector);
			}
		}

		/* Push faces */
		for (let h = 0; h < heightSegments; h++) {
			/* offset to compensate going 1 line up */
			hOffset = h * (widthSegments + 1);
			for (let w = 0; w < widthSegments; w++) {
				/* push two faces to create a square segment */
				this.faces.push(
					new THREE.Face3(
						hOffset + w,
						hOffset + (w + 1),
						hOffset + (w + 1 + widthSegments)),
					new THREE.Face3(
						hOffset + (w + 1),
						hOffset + (w + 2 + widthSegments),
						hOffset + (w + 1 + widthSegments))
				);
			}
		}

		this.computeFaceNormals();
	}
}

/* Generic triangle geometry */
class TriangleGeometry extends THREE.Geometry {
	constructor(u, v, w, width, height, depth, udir=1, vdir=1, widthSegments=1) {
		super();

		var heightSegments = widthSegments;

		var wPolySize = width  / widthSegments;
		var hPolySize = height / heightSegments;

		// Constant position in w axis
		var posW = depth/2;

		var posU;
		var posV;

		var tempWSeg;
		var hOffset = 0;

		var vector;

		/* Push Vertices */
		for (let hp = 0; hp <= heightSegments; hp++) {
			// Calculate vertex position on v axis
			posV     = hp * hPolySize - height/2;
			tempWSeg = widthSegments - hp;
			for (let wp = 0; wp <= tempWSeg; wp++) {
				// Calculate vertex position on u axis
				posU   = wp * wPolySize - width/2;
				vector = new THREE.Vector3();
				// Set vertex coordinates appropriately
				vector[u] = posU * udir;
				vector[v] = posV * vdir;
				vector[w] = posW;
				// Push vertex
				this.vertices.push(vector);
			}
		}

		/* Push faces */
		for (let h = 0; h < heightSegments; h++) {
			/* width segments get reduced when going up in height */
			tempWSeg = widthSegments - h;
			for (let w = 0; w < tempWSeg; w++) {
				/* push lower face */
				this.faces.push(
					new THREE.Face3(
						hOffset + w,
						hOffset + (w + 1),
						hOffset + (w + 1 + tempWSeg))
				);
				/* if face is interior, then push upper face to make a square */
				if (w < tempWSeg-1 && h < heightSegments-1)
					this.faces.push(
						new THREE.Face3(
							hOffset + (w + 1),
							hOffset + (w + 2 + tempWSeg),
							hOffset + (w + 1 + tempWSeg))
					);
			}
			hOffset += tempWSeg + 1;
		}

		this.computeFaceNormals();
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
					'z', 'y', 'x',
					depth, height, -width, 1, 1,
					depthSegments, heightSegments)));

		/* Right side TriangleGeometry */
		this.mergeMesh(
			new THREE.Mesh(
				new TriangleGeometry(
					'y', 'z', 'x',
					depth, height, width, height/depth, depth/height,
					depthSegments, heightSegments)));

		this.mergeVertices();
	}
}
