class Chessboard extends THREE.Object3D {
	
	constructor(x, y, z, material) {
		'use strict';
		
		super();
		
		//FIXME temporary
		var geometry = new THREE.BoxGeometry(50, 4, 50);
		
		var mesh = new THREE.Mesh(geometry, material);
		
		this.add(mesh);
		
		this.position.set(x, y, z);
	}
}