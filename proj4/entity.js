/* Generic game entity class */

class GameEntity extends THREE.Object3D {
	/* constructor */
	constructor(shadedMaterial, basicMaterial) {
		super();

		this.currentMaterial = shadedMaterial;
		this.otherMaterial   = basicMaterial;
		this.initialMaterial = shadedMaterial;

		this.wireframeFlag     = false;
		this.shaderComputeFlag = true;
	}

	/* toggle wireframe */
	toggleWireframe(wFlag) {
		if (this.wireframeFlag != wFlag) {
			this.traverse(node => {
				if (node instanceof THREE.Mesh)
					node.material.wireframe = wFlag;
			});
			this.wireframeFlag = wFlag;
		}
	}

	/* toggles shader computing */
	toggleShading(shaderFlag) {
		if (this.shaderComputeFlag != shaderFlag) {
			var tempMaterial;
			this.traverse(node => {
				if (node instanceof THREE.Mesh) {
					node.material = this.otherMaterial;
					node.material.wireframe = this.wireframeFlag;
					/* swaps current with other material */
					tempMaterial         = this.currentMaterial;
					this.currentMaterial = this.otherMaterial;
					this.otherMaterial   = tempMaterial;
				}
			});
			this.shaderComputeFlag = shaderFlag;
		}
	}

	/* resets entity wireframe rendering & shading compute */
	resetEntity() {
		this.toggleWireframe(false);
		this.toggleShading(true);
	}
}
