class Rubik extends THREE.Object3D {
	
	constructor(x, y, z) {
		'use strict';
		
		super();
		
		//FIXME temporary
		var geometry = new THREE.BoxGeometry(6, 6, 6);
		var material = new THREE.MeshPhongMaterial({color: 0x61212a, shininess: 30});
		var mesh = new THREE.Mesh(geometry, material);
		
		this.add(mesh);
		
		this.position.set(x, y, z);
	}
}