class Rubik extends THREE.Object3D {
	
	constructor(x, y, z, materials) {
		'use strict';
		
		super();
		
		//FIXME temporary
		
		var geometry = new THREE.BoxGeometry(6, 6, 6);
		var mesh = new THREE.Mesh(geometry, materials);
		
		this.add(mesh);
		
		this.position.set(x, y, z);
	}
}