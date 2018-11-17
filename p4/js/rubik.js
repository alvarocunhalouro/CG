class Rubik extends THREE.Object3D {
	
	constructor(x, y, z, textures) {
		'use strict';
		
		super();
		
		this.materials = [];
		
		var geometry = new THREE.BoxGeometry(6, 6, 6);
		
		this.materials[0] = new THREE.MeshBasicMaterial({map: textures[0]});
		this.materials[1] = new THREE.MeshBasicMaterial({map: textures[1]});
		this.materials[2] = new THREE.MeshBasicMaterial({map: textures[2]});
		this.materials[3] = new THREE.MeshBasicMaterial({map: textures[3]});
		this.materials[4] = new THREE.MeshBasicMaterial({map: textures[4]});
		this.materials[5] = new THREE.MeshBasicMaterial({map: textures[5]});
		
		this.materials[6] = new THREE.MeshPhongMaterial({map: textures[0], bumpMap: textures[5]});
		this.materials[7] = new THREE.MeshPhongMaterial({map: textures[1], bumpMap: textures[5]});
		this.materials[8] = new THREE.MeshPhongMaterial({map: textures[2], bumpMap: textures[5]});
		this.materials[9] = new THREE.MeshPhongMaterial({map: textures[3], bumpMap: textures[5]});
		this.materials[10] = new THREE.MeshPhongMaterial({map: textures[4], bumpMap: textures[5]});
		this.materials[11] = new THREE.MeshPhongMaterial({map: textures[5], bumpMap: textures[5]});
		
		var mesh = new THREE.Mesh(geometry, this.materials.slice(6));
		
		this.add(mesh);
		
		this.position.set(x, y, z);
		
		this.phong = true;
	}
	
	changeMaterial() {
		//FIXME - - - tirar if else
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