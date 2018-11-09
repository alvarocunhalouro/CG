class Ball extends THREE.Object3D {
	
	constructor(x, y, z) {
		'use strict';
		
		super();
		
		//FIXME temporary
		var geometry = new THREE.SphereGeometry(2.5, 25, 25);
		var material = new THREE.MeshPhongMaterial({color: 0x1122aa});
		var mesh = new THREE.Mesh(geometry, material);
		
		this.add(mesh);
		
		this.position.set(x, y, z);
		
		this.moving = true;
		this.step = 0;
		this.x = -5;
		this.z = 5;
	}
	
	update(delta) {
		this.step += 3*delta;
		
		this.position.x = this.x + 10*Math.sin(this.step);
		this.position.z = this.z + 10*Math.cos(this.step);
	}
}