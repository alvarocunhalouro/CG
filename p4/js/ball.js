class Ball extends THREE.Object3D {
	
	constructor(x, y, z, materials) {
		'use strict';
		
		super();
		
		this.materials = materials;
		
		var geometry = new THREE.SphereGeometry(2.5, 20, 20);
		
		var mesh = new THREE.Mesh(geometry, this.materials[1]);
		
		this.add(mesh);
		
		this.position.set(x, y, z);
		
		this.maxSpeed = 3;
		this.speed = this.maxSpeed;
		this.acceleration = 0.1;
		
		this.moving = true;
		
		this.step = 0;
		
		this.orbit_center_x = -5;
		this.orbit_center_z = 5;
	}
	
	update(delta) {
		
		if(this.moving && this.speed < this.maxSpeed) {
			this.speed += this.acceleration;
		}
		
		if(!this.moving && this.speed > 0) {
			this.speed -= this.acceleration;
		}
		
		this.step += this.speed*delta;
		
		this.position.x = this.orbit_center_x + 10*Math.sin(this.step);
		this.position.z = this.orbit_center_z + 10*Math.cos(this.step);
		
		this.rotateY(this.speed*delta);
		this.children[0].rotateZ(-this.speed*delta);
	}
	
	changeMaterial() {
		//FIXME - - - tirar if else
		if(this.children[0].material == this.materials[0]) {
			this.children[0].material = this.materials[1];
		}
		else {
			this.children[0].material = this.materials[0];
		}
	}
}