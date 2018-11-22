class Chessboard extends THREE.Object3D {
	
	constructor(x, y, z, materials) {
		'use strict';
		
		super();
		
		this.materials = materials;
		
		var geometry = new THREE.PlaneGeometry(80, 80, 8, 8);
		
		var mesh = new THREE.Mesh(geometry, this.materials[1]);
		mesh.rotateX(-Math.PI/2);
		
		this.add(mesh);
		
		this.position.set(x, y, z);
	}
	
	changeMaterial() {
		if(this.children[0].material == this.materials[0]) {
			this.children[0].material = this.materials[1];
		}
		else {
			this.children[0].material = this.materials[0];
		}
	}
}