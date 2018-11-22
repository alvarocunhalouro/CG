class Rubik extends THREE.Object3D {
	
	constructor(x, y, z, materials) {
		'use strict';
		
		super();
		
		this.materials = materials;
		
		var geometry = new THREE.BoxGeometry(6, 6, 6);
		
		var mesh = new THREE.Mesh(geometry, this.materials.slice(6));
		
		this.add(mesh);
		
		this.position.set(x, y, z);
		
		this.phong = true;
	}
	
	changeMaterial() {
		if(this.phong) {
			this.children[0].material = this.materials.slice(0,6);
			this.phong = false;
		}
		else {
			this.children[0].material = this.materials.slice(6);
			this.phong = true;
		}
	}
}